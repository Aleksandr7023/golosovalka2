export default function PollCard({ poll }) {
  return (
    <div className="poll-card">
      <h3>{poll.title}</h3>
      <p>{poll.question}</p>
      <div className="stats">
        <span>{poll.views_count} просмотров</span>
        <span>{poll.votes_count || 0} голосов</span>
      </div>
      <a href={`/poll/${poll.id}`}>Открыть →</a>
    </div>
  );
}