// PollCard.jsx
import { useNavigate } from 'react-router-dom';

export default function PollCard({ poll }) {
  const navigate = useNavigate();
  const totalVotes = poll.votes ? poll.votes.reduce((sum, v) => sum + v, 0) : 0;

  const handleClick = () => {
    navigate(`/poll/${poll.id}`);
  };

  return (
    <div 
      className="poll-card"
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 12px rgba(0,0,0,.1)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.1)';
      }}
    >
      <h3>{poll.title}</h3>
      <p>{poll.question}</p>
      <div className="stats">
        <span>{poll.views_count} просмотров</span>
        <span>{totalVotes} голосов</span>
      </div>
    </div>
  );
}