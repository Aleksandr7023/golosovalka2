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
      const res = await fetch(`https://the8th.ru/api/get_polls.php?page=${pageNum}`);
      console.log('Status:', res.status);
      if (!res.ok) {
        const text = await res.text();
        console.log('Error body:', text);
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      console.log('Данные:', data);
      if (append) {
        setPolls(prev => [...prev, ...data]);
      } else {
        setPolls(data);
      }
      setHasMore(data.length === 20);
    } catch (e) {
      console.error('Ошибка:', e);
      setError('Не удалось загрузить опросы: ' + e.message);
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
    if (!sentinel.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel.current);

    return () => observer.disconnect();
  }, [loading, hasMore, sentinel.current]); // ← исправлено

  const handleNewPoll = async () => {
    const title = prompt('Тема опроса');
    if (!title) return;
    const question = prompt('Вопрос');
    if (!question) return;
    const options = prompt('Варианты (по одному на строку)', 'Да\nНет\nНе знаю');
    if (!options) return;

    try {
      await createPoll({ title, question, options });
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
        <h1>Опросы</h1>
        <button className="new-poll-btn" onClick={handleNewPoll}>
          + Новый
        </button>
      </header>

      <section className="poll-list">
        {polls.map(poll => <PollCard key={poll.id} poll={poll} />)}
        {hasMore && <div ref={sentinel} style={{ height: 100 }} />}
        {loading && polls.length > 0 && <p>Загрузка...</p>}
      </section>
    </div>
  );
}