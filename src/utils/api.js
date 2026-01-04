// utils/api.js
const API_BASE = 'https://the8th.ru/api';

export const fetchPolls = async (page = 1) => {
  const res = await fetch(`${API_BASE}/get_polls.php?page=${page}`);
  if (!res.ok) throw new Error('Сервер не отвечает');
  const data = await res.json();
  return Array.isArray(data) ? data : data.polls || [];
};

export const createPoll = async ({ title, question, options, telegramId }) => {
  const res = await fetch(`${API_BASE}/create_poll.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      question,
      options,
      telegram_id: telegramId // ← добавили
    })
  });
  return await res.json();
};