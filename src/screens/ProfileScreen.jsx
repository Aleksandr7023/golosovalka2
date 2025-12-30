// ProfileScreen.jsx
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { UserContext } from '../App.jsx';

const API_BASE = 'https://the8th.ru/api';

export default function ProfileScreen() {
  const { telegramId } = useContext(UserContext);
  const [user, setUser] = useState({
    display_name: '',
    full_name: '',
    location_id: null
  });
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    if (!telegramId) {
      alert('Telegram ID не определён');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/get_user.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_id: telegramId })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser({
        display_name: data.display_name || '',
        full_name: data.full_name || '',
        location_id: data.location_id || null
      });
    } catch (e) {
      // Если не найден — оставляем пустые поля (сервер создаст при первом запросе)
      setUser({
        display_name: '',
        full_name: '',
        location_id: null
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [telegramId]);

  const handleSave = async () => {
    if (!telegramId) {
      alert('Telegram ID не определён');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/update_user.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: telegramId,
          display_name: user.display_name,
          full_name: user.full_name
        })
      });

      if (res.ok) {
        alert('Профиль сохранён');
      } else {
        alert('Ошибка сохранения');
      }
    } catch (e) {
      alert('Ошибка сети');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', color: '#0969da' }}>Мой профиль</h1>

      <p style={{ fontSize: '16px', margin: '20px 0' }}>
        Ваш Telegram ID: <strong>{telegramId || 'не определён'}</strong>
      </p>

      <label style={{ display: 'block', margin: '20px 0' }}>
        Ник:<br />
        <input
          type="text"
          value={user.display_name}
          onChange={(e) => setUser({ ...user, display_name: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d0d7de' }}
        />
      </label>

      <label style={{ display: 'block', margin: '20px 0' }}>
        ФИО:<br />
        <input
          type="text"
          value={user.full_name}
          onChange={(e) => setUser({ ...user, full_name: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d0d7de' }}
        />
      </label>

      <button
        onClick={handleSave}
        style={{
          padding: '15px 30px',
          background: '#2ea44f',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Сохранить
      </button>

      <a
        href="/"
        style={{ display: 'block', marginTop: '40px', color: '#0969da', fontSize: '18px' }}
      >
        ← Назад
      </a>
    </div>
  );
}