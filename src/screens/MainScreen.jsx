import { useState, useEffect } from 'react';
import PollCard from '../components/PollCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { fetchPolls, createPoll } from '../utils/api.js';
import '../styles/mainScreen.css';

export default function MainScreen() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      const data = await fetchPolls(); // data — массив опросов
      setPolls(data || []);
      setError('');
    } catch (e) {
      setError('Не удалось загрузить опросы');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPoll = async () => {
    const title = prompt('Тема опроса');
    if (!title) return;
    const question = prompt('Вопрос');
    if (!question) return;
    const options = prompt('Варианты (по одному на строку)', 'Да\nНет\nНе знаю');
    if (!options) return;

    try {
      await createPoll({ title, question, options });
      loadPolls();
    } catch (e) {
      alert('Ошибка создания опроса');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <div className="main-screen">
      <header>
        <h1>Голосовалка</h1>
        <button className="new-poll-btn" onClick={handleNewPoll}>
          + Новый опрос
        </button>
      </header>

      <section className="poll-list">
        {polls.length === 0 ? (
          <p>Опросов пока нет</p>
        ) : (
          polls.map(poll => <PollCard key={poll.id} poll={poll} />)
        )}
      </section>
    </div>
  );
}