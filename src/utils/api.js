const API_BASE = 'https://the8th.ru/api';

export const fetchPolls = async () => {
  const res = await fetch(`${API_BASE}/get_polls.php`);
  return await res.json();
};