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
    if (!hasMore && append) return;
    setLoading(true);
    try {
      const data = await fetchPolls(pageNum); // ← теперь передаём page
      if (append) {
        setPolls(prev => [...prev, ...data]);
      } else {
        setPolls(data);
      }
      setHasMore(data.length === 20); // если вернулось меньше 20 — конец
      setError('');
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
    if (!sentinel.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) loadPolls(page, true);
  }, [page]);

  const handleNewPoll = async () => {
    // твой код создания опроса
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
        {hasMore && <div ref={sentinel} style={{ height: 20 }} />}
        {loading && polls.length > 0 && <p>Загрузка...</p>}
      </section>
    </div>
  );
}