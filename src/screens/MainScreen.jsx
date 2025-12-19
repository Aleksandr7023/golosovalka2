import { useState, useEffect } from 'react';
import PollCard from '../components/PollCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { fetchPolls } from '../utils/api.js';
import '../styles/mainScreen.css';

export default function MainScreen() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls().then(data => {
      setPolls(data.polls || []);
      setLoading(false);
    });
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