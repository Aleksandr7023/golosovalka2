// PollScreen.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const API_BASE = 'https://the8th.ru/api';

export default function PollScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (poll) {
      fetch(`https://the8th.ru/api/view_poll.php?id=${id}`);
    }
  }, [poll, id]);

  const handleVote = (index) => {
    navigate(`/comment/${id}`, { state: { selectedOption: index } });
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
                boxShadow: '0 2px 8px rgba(0,0,0,.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
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

      <h2 style={{marginTop: '40px'}}>Комментарии</h2>
      <div style={{marginBottom: '40px'}}>
        {poll.comments && poll.comments.length > 0 ? (
          poll.comments.map((c, i) => (
            <div key={i} style={{padding: '15px', background: '#f6f8fa', borderRadius: '8px', marginBottom: '10px'}}>
              <strong>{c.display_name || 'Аноним'}</strong>: {c.text}
              <small style={{display: 'block', color: '#666', marginTop: '5px'}}>
                {new Date(c.created_at).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p>Комментариев пока нет</p>
        )}
      </div>

    </div>
  );
}