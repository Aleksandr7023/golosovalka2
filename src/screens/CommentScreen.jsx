// CommentScreen.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useContext } from 'react';
import { UserContext } from '../App.jsx';

const API_BASE = 'https://the8th.ru/api';

export default function CommentScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { telegramId } = useContext(UserContext);

  const [poll, setPoll] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const selectedOption = location.state?.selectedOption ?? null;

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await fetch(`${API_BASE}/get_poll.php?id=${id}`);
        if (!res.ok) throw new Error('Ошибка загрузки опроса');
        const data = await res.json();
        setPoll(data);
      } catch (e) {
        setError(e.message || 'Не удалось загрузить опрос');
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const handleSend = async () => {
    if (selectedOption === null) return alert('Выберите вариант');

    try {
      await fetch(`${API_BASE}/vote.php?poll_id=${id}&option=${selectedOption}&telegram_id=${telegramId}`);
      if (comment.trim()) {
        await fetch(`${API_BASE}/add_comment.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ poll_id: id, text: comment, telegram_id: telegramId })
        });
      }
    } catch (e) {
      alert('Ошибка отправки');
    }

    navigate(`/poll/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</p>;
  if (!poll) return <p style={{ textAlign: 'center', padding: '20px' }}>Опрос не найден</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{poll.title}</h1>
      <p>{poll.question}</p>

      <h2>Выбранный вариант:</h2>
      {selectedOption !== null && (
        <div style={{ padding: '15px', background: '#e0f7fa', borderRadius: '8px', margin: '10px 0' }}>
          {poll.options[selectedOption]}
        </div>
      )}

      <h2 style={{ marginTop: '40px' }}>Комментарий</h2>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Напишите ваш комментарий..."
        style={{ width: '100%', height: '200px', padding: '15px', borderRadius: '8px', border: '1px solid #d0d7de' }}
      />

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSend} style={{ padding: '15px 30px', background: '#2ea44f', color: 'white', border: 'none', borderRadius: '8px' }}>
          Отправить голос и комментарий
        </button>
        <button onClick={() => navigate(-1)} style={{ marginLeft: '10px', padding: '15px 30px', background: '#666', color: 'white', border: 'none', borderRadius: '8px' }}>
          Отмена
        </button>
      </div>
    </div>
  );
}