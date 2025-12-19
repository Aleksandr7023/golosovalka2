import { useState, useEffect, useRef } from 'react';
import PollCard from '../components/PollCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { fetchPolls } from '../utils/api.js';
import '../styles/mainScreen.css';

export default function MainScreen() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinel = useRef(null);

  const loadPolls = async (pageNum = 1, append = false) => {
    setLoading(true);
    try {
      const data = await fetchPolls(pageNum);
      if (append) {
        setPolls(prev => [...prev, ...data]);
      } else {
        setPolls(data);
      }
      setHasMore(data.length === 20);
    } catch (e) {
      setError('Не удалось загрузить опросы');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPolls(1, false);
  }, []);

  useEffect(() => {
    if (page > 1) loadPolls(page, true);
  }, [page]);

  useEffect(() => {
    const currentSentinel = sentinel.current;
    if (!currentSentinel || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [sentinel.current, loading, hasMore]); // ← добавил sentinel.current

  const handleNewPoll = async () => {
    const title = prompt('Тема опроса');
    if (!title) return;
    const question = prompt('Вопрос');
    if (!question) return;
    const options = prompt('Варианты (по одному на строку)', 'Да\nНет\nНе знаю');
    if (!options) return;

    const data = {
      title,
      question,
      options: options.split('\n').map(s => s.trim()).filter(s => s)
    };

    try {
      await fetch('https://the8th.ru/api/create_poll.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      loadPolls(1, false);
    } catch (e) {
      alert('Ошибка создания опроса');
    }
  };

  if (loading && polls.length === 0) return <LoadingSpinner />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

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
        {hasMore && <div ref={sentinel} style={{ height: 20, background: 'transparent' }} />}
        {loading && polls.length > 0 && <p>Загрузка...</p>}
      </section>
    </div>
  );
}