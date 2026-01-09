// MainScreen.jsx
import { useState, useEffect, useRef } from 'react';
import PollCard from '../components/PollCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { fetchPolls, createPoll } from '../utils/api.js';
import { useContext } from 'react';
import { UserContext } from '../App.jsx';
import NewPollModal from '../components/NewPollModal.jsx'; // ← новый модальный компонент
import '../styles/mainScreen.css';

export default function MainScreen() {
  const { telegramId } = useContext(UserContext);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showNewPollModal, setShowNewPollModal] = useState(false);
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

  const handleOpenNewPoll = () => {
    setShowNewPollModal(true);
  };

  const handleSaveNewPoll = async ({ title, question, options }) => {
    try {
      await createPoll({ title, question, options, telegramId });
      alert('Опрос успешно создан как черновик!\nОжидайте одобрения и публикации.');
      loadPolls(1, false);
    } catch (e) {
      alert('Ошибка создания опроса');
    }
    setShowNewPollModal(false);
  };

  if (loading && polls.length === 0) return <LoadingSpinner />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="main-screen">
      <header>
        <h1>Опросы</h1>
        <button className="new-poll-btn" onClick={handleOpenNewPoll}>
          + Новый
        </button>
      </header>

      {showNewPollModal && (
        <NewPollModal 
          onClose={() => setShowNewPollModal(false)}
          onSave={handleSaveNewPoll}
        />
      )}

      <section className="poll-list">
        {polls.map(poll => <PollCard key={poll.id} poll={poll} />)}
        {hasMore && <div ref={sentinel} style={{ height: 100 }} />}
        {loading && polls.length > 0 && <p>Загрузка...</p>}
      </section>
    </div>
  );
}