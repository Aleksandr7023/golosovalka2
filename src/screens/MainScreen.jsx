// MainScreen.jsx
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
  const [telegramId, setTelegramId] = useState(null);
  const [idMessage, setIdMessage] = useState('');
  const sentinel = useRef(null);

  // Определение Telegram ID при запуске
  useEffect(() => {
    let id = null;
    let source = '';

    // 1. Смартфон — Mini App
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      id = window.Telegram.WebApp.initDataUnsafe.user.id;
      source = 'Telegram Mini App (смартфон)';
    } else {
      // 2. ПК — Telegram Web (localStorage)
      const stored = localStorage.getItem('user_auth') || localStorage.getItem('tg_user_auth');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          id = userData.id;
          source = 'Telegram Web (ПК)';
        } catch (e) {
          // Ошибка парсинга — игнорируем
        }
      }
    }

    // 3. Тестовый режим (локальный запуск без Telegram)
    if (!id && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      id = 9999;
      source = 'Тестовый режим (локальный запуск)';
    }

    if (id) {
      setIdMessage(`Ваш Telegram ID: ${id} (${source})`);
    } else {
      setIdMessage('Telegram ID не определён (режим просмотра)');
    }

    setTelegramId(id);
  }, []);

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
  }, [loading, hasMore, sentinel.current]);

  const handleNewPoll = async () => {
    const title = prompt('Тема опроса');
    if (!title) return;
    const question = prompt('Вопрос');
    if (!question) return;
    const options = prompt('Варианты (по одному на строку)', 'Да\nНет\nНе знаю');
    if (!options) return;

    try {
      await createPoll({ title, question, options, telegramId });
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

      {idMessage && (
        <div style={{
          background: '#e3f2fd',
          padding: '12px',
          borderRadius: '8px',
          margin: '10px 0',
          fontSize: '14px',
          color: '#1976d2'
        }}>
          {idMessage}
        </div>
      )}

      <section className="poll-list">
        {polls.map(poll => <PollCard key={poll.id} poll={poll} />)}
        {hasMore && <div ref={sentinel} style={{ height: 100 }} />}
        {loading && polls.length > 0 && <p>Загрузка...</p>}
      </section>
    </div>
  );
}