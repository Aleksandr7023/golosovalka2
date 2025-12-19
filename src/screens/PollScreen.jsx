import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const API_BASE = 'https://the8th.ru/api';

export default function PollScreen() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const res = await fetch(`${API_BASE}/get_poll.php?id=${id}`);
        if (!res.ok) throw new Error('Ошибка');
        const data = await res.json();
        setTitle(data.title || 'Без названия');
      } catch (e) {
        setError('Не удалось загрузить');
      } finally {
        setLoading(false);
      }
    };
    fetchTitle();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <div style={{padding: '40px', textAlign: 'center'}}>
      <h1 style={{fontSize: '28px', color: '#0969da'}}>{title}</h1>
      <a href="/" style={{display: 'block', marginTop: '40px', color: '#0969da'}}>← Назад</a>
    </div>
  );
}