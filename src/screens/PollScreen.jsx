import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const API_BASE = 'https://the8th.ru/api';

export default function PollScreen() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');

  const loadPoll = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_poll.php?id=${id}`);
      if (!res.ok) throw new Error('Ошибка сервера');
      const data = await res.json();
      setPoll(data);
    } catch (e) {
      setError('Не удалось загрузить опрос');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPoll();
  }, [id]);

  const handleVote = async (index) => {
    await fetch(`${API_BASE}/vote.php?poll_id=${id}&option=${index}`);
    loadPoll();
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    await fetch(`${API_BASE}/add_comment.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poll_id: id, text: commentText })
    });
    setCommentText('');
    loadPoll();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{color:'red'}}>{error}</p>;
  if (!poll) return <p>Опрос не найден</p>;

  const votesArray = poll.votes || Array(poll.options.length).fill(0);
  const totalVotes = votesArray.reduce((sum, v) => sum + v, 0);

  return (
    <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{fontSize: '28px', color: '#0969da'}}>{poll.title}</h1>
      <p style={{fontSize: '20px', margin: '30px 0'}}>{poll.question}</p>

      <h2 style={{margin: '30px 0 20px'}}>Варианты ответа:</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        {poll.options.map((opt, index) => {
          const votes = votesArray[index] || 0;
          const percent = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
          return (
            <div 
              key={index} 
              onClick={() => handleVote(index)}
              style={{
                padding: '20px',
                background: '#f6f8fa',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,.1)'
              }}
            >
              <span style={{fontSize: '18px', display: 'block', marginBottom: '10px'}}>{opt}</span>
              <div style={{height: '20px', background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden'}}>
                <div style={{height: '100%', width: `${percent}%`, background: '#2ea44f', transition: 'width 0.5s'}}></div>
              </div>
              <span style={{fontSize: '14px', color: '#666', marginTop: '8px', display: 'block'}}>
                {votes} голосов ({percent}%)
              </span>
            </div>
          );
        })}
      </div>

      <p style={{marginTop: '30px', fontWeight: 'bold'}}>Всего голосов: {totalVotes}</p>

      <div style={{margin: '40px 0'}}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Ваш комментарий"
          style={{width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: '1px solid #d0d7de'}}
        />
        <button 
          onClick={handleComment}
          style={{
            marginTop: '10px',
            padding: '12px 24px',
            background: '#57606a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Отправить комментарий
        </button>
      </div>

      <a href="/" style={{display: 'block', marginTop: '40px', color: '#0969da', fontSize: '18px'}}>← Назад</a>
    </div>
  );
}