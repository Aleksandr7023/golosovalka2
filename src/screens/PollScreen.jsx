import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const API_BASE = 'https://the8th.ru/api';

export default function PollScreen() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    await fetch(`https://the8th.ru/api/vote.php?poll_id=${id}&option=${index}`);
    loadPoll();
  };

  const handleComment = async () => {
    const text = prompt('Ваш комментарий');
    if (!text) return;
    await fetch('https://the8th.ru/api/add_comment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poll_id: id, text })
    });
    loadPoll();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{color:'red'}}>{error}</p>;
  if (!poll) return <p>Опрос не найден</p>;

  const votesArray = poll.votes || Array(poll.options.length).fill(0);
  const totalVotes = votesArray.reduce((sum, v) => sum + v, 0);

  return (
    <div style={{padding: '40px', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{fontSize: '28px', color: '#0969da'}}>{poll.title}</h1>
      <p style={{fontSize: '20px', margin: '30px 0'}}>{poll.question}</p>

      <h2 style={{margin: '30px 0 20px'}}>Варианты ответа:</h2>
      <div className="options">
        {poll.options.map((opt, index) => {
          const votes = votesArray[index] || 0;
          const percent = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
          return (
            <div key={index} className="option" onClick={() => handleVote(index)} style={{cursor: 'pointer'}}>
              <span>{opt}</span>
              <div className="bar-container">
                <div className="bar" style={{width: `${percent}%`}}></div>
              </div>
              <span className="percent">{votes} голосов ({percent}%)</span>
            </div>
          );
        })}
      </div>

      <p className="total">Всего голосов: {totalVotes}</p>

      <button onClick={handleComment} style={{margin: '20px 0', padding: '12px 24px', background: '#57606a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
        Комментировать
      </button>

      <a href="/" style={{display: 'block', marginTop: '40px', color: '#0969da', fontSize: '18px'}}>← Назад</a>
    </div>
  );
}