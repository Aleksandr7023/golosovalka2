// ProfileScreen.jsx
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useContext } from 'react';
import { UserContext } from '../App.jsx'; // ← импортируем контекст

const API_BASE = 'https://the8th.ru/api';

export default function ProfileScreen() {
  const { telegramId } = useContext(UserContext); // ← берём telegramId из контекста
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_user.php`);
      const data = await res.json();
      setUser(data);
    } catch (e) {
      alert('Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_BASE}/update_user.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: telegramId, // ← передаём ID
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
    <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Мой профиль</h1>
      <label>
        Ник:<br/>
        <input 
          value={user?.display_name || ''} 
          onChange={e => setUser({...user, display_name: e.target.value})} 
        />
      </label><br/><br/>
      <label>
        ФИО:<br/>
        <input 
          value={user?.full_name || ''} 
          onChange={e => setUser({...user, full_name: e.target.value})} 
        />
      </label><br/><br/>
      <button onClick={handleSave}>Сохранить</button>
      <a href="/" style={{display: 'block', marginTop: '40px'}}>← Назад</a>
    </div>
  );
}