import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import '../styles/pollScreen.css';

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
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        const data = await res.json();
        setPoll(data);
      } catch (e) {
        setError(`Ошибка загрузки опроса: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  if (!poll) return <p>Опрос не найден</p>;

  const totalVotes = poll.votes.reduce((sum, v) => sum + v, 0);

  return (
    <div className="poll-screen">
      <div className="poll-card">
        <h1>{poll.title}</h1>
        <p className="question">{poll.question}</p>

        <div className="options">
          {poll.options.map((opt, index) => {
            const votes = poll.votes[index] || 0;
            const percent = totalVotes ? (votes / totalVotes * 100).toFixed(1) : 0;
            return (
              <button key={index} className="option-btn">
                <span className="opt-text">{opt}</span>
                <div className="progress">
                  <div className="bar" style={{ width: `${percent}%` }}></div>
                </div>
                <span className="votes">{votes} ({percent}%)</span>
              </button>
            );
          })}
        </div>

        <button className="vote-btn">Голосовать</button>

        <div className="stats">
          <span>{poll.views_count} просмотров</span>
          <span>{totalVotes} голосов</span>
          <span>Создан: {new Date(poll.created_at).toLocaleDateString()}</span>
        </div>

        <button className="evolve-btn">Эволюционировать</button>

        <h2>Комментарии</h2>
        <div className="comments">
          <p>Пока нет комментариев</p>
        </div>

        <button className="comment-btn">Комментировать</button>
      </div>
    </div>
  );
}