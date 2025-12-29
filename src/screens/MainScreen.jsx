// MainScreen.jsx
import { useState, useEffect, useRef } from 'react';
import PollCard from '../components/PollCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { fetchPolls, createPoll } from '../utils/api.js';
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

  useEffect(() => {
    let id = null;
    let source = 'не определён';

    // 1. Mini App (смартфон)
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      id = window.Telegram.WebApp.initDataUnsafe.user.id;
      source = 'Mini App (смартфон)';
    }

    // 2. Telegram Web — из хэша URL (#tgWebAppData=...)
    if (!id && window.location.hash) {
      const hash = window.location.hash.substring(1); // убираем #
      const params = new URLSearchParams(hash);
      const webAppData = params.get('tgWebAppData');
      if (webAppData) {
        try {
          const decoded = decodeURIComponent(webAppData);
          const parsed = JSON.parse(decoded);
          id = parsed.user?.id || null;
          source = 'Telegram Web (хэш URL)';
        } catch (e) {
          console.error('Ошибка парсинга tgWebAppData', e);
        }
      }
    }

    // 3. Резерв — localStorage
    if (!id) {
      const stored = localStorage.getItem('user_auth') || localStorage.getItem('tg_user_auth');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          id = userData.id || null;
          source = 'Telegram Web (localStorage)';
        } catch (e) {
          console.error('Ошибка парсинга localStorage', e);
        }
      }
    }

    // 4. Локальный тест
    if (!id && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      id = 9999;
      source = 'Тестовый режим (локально)';
    }

    setTelegramId(id);
    setIdMessage(id ? `Ваш Telegram ID: ${id} (${source})` : 'Telegram ID не определён (режим просмотра)');
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