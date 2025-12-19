const API_BASE = 'https://the8th.ru/api';

export const fetchPolls = async () => {
  const res = await fetch(`${API_BASE}/get_polls.php`);
  if (!res.ok) throw new Error('Ошибка сервера');
  const data = await res.json();
  return data.polls || [];
};

export const createPoll = async ({ title, question, options }) => {
  const res = await fetch(`${API_BASE}/create_poll.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      question,
      options: options.split('\n').map(s => s.trim()).filter(Boolean)
    })
  });
  return await res.json();
};