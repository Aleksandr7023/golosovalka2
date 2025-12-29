// src/screens/CommentScreen.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const API_BASE = 'https://the8th.ru/api';

export default function CommentScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await fetch(`${API_BASE}/get_poll.php?id=${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPoll(data);
      } catch (e) {
        alert('Ошибка загрузки опроса');
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const handleSend = async () => {
    if (!comment.trim()) return alert('Комментарий пуст');
    if (selectedOption === null) return alert('Выберите вариант');

    await fetch(`${API_BASE}/vote.php?poll_id=${id}&option=${selectedOption}`);
    if (comment.trim()) {
      await fetch(`${API_BASE}/add_comment.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poll_id: id, text: comment })
      });
    }
    navigate(`/poll/${id}`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{poll.title}</h1>
      <p>{poll.question}</p>

      <h2>Выберите ваш голос:</h2>
      {poll.options.map((opt, index) => (
        <div
          key={index}
          onClick={() => setSelectedOption(index)}
          style={{
            padding: '15px',
            background: selectedOption === index ? '#e0f7fa' : '#f6f8fa',
            border: selectedOption === index ? '2px solid #006064' : '1px solid #d0d7de',
            borderRadius: '8px',
            margin: '10px 0',
            cursor: 'pointer'
          }}
        >
          {opt}
        </div>
      ))}

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