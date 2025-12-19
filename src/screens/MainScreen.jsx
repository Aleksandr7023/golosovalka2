import { useState, useEffect } from 'react';
import PollCard from '../components/PollCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import '../styles/mainScreen.css';

export default function MainScreen() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPolls([
      { id: 1, title: 'Тестовый опрос', question: 'Как дела?', views_count: 42, votes_count: 10 },
      { id: 2, title: 'Ещё один', question: 'Что думаете?', views_count: 15, votes_count: 5 }
    ]);
    setLoading(false);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="main-screen">
      <header>
        <h1>Голосовалка</h1>
        <button className="new-poll-btn">+ Новый опрос</button>
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