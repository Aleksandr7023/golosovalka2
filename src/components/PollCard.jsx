export default function PollCard({ poll }) {
  const totalVotes = poll.votes ? poll.votes.reduce((sum, v) => sum + v, 0) : 0;

  return (
    <div className="poll-card">
      <h3>{poll.title}</h3>
      <p>{poll.question}</p>
      <div className="stats">
        <span>{poll.views_count} просмотров</span>
        <span>{totalVotes} голосов</span>
      </div>
      <a href={`/poll/${poll.id}`}>Открыть →</a>
    </div>
  );
}