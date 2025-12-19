import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const API_BASE = 'https://the8th.ru/api';

export default function PollScreen() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPoll = async () => {
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
    fetchPoll();
  }, [id]);

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
            <div key={index} className="option">
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

      <a href="/" style={{display: 'block', marginTop: '40px', color: '#0969da', fontSize: '18px'}}>← Назад</a>
    </div>
  );
}