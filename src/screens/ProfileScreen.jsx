// src/screens/ProfileScreen.jsx
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://the8th.ru/api';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_user.php`);
      if (!res.ok) throw new Error();
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
      await fetch(`${API_BASE}/update_user.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      alert('Профиль сохранён');
    } catch (e) {
      alert('Ошибка сохранения');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', color: '#0969da' }}>Мой профиль</h1>

      <label style={{ display: 'block', margin: '20px 0' }}>
        Ник:<br/>
        <input 
          type="text"
          value={user?.display_name || ''}
          onChange={e => setUser({...user, display_name: e.target.value})}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d0d7de' }}
        />
      </label>

      <label style={{ display: 'block', margin: '20px 0' }}>
        ФИО:<br/>
        <input 
          type="text"
          value={user?.full_name || ''}
          onChange={e => setUser({...user, full_name: e.target.value})}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d0d7de' }}
        />
      </label>

      <button 
        onClick={handleSave}
        style={{ padding: '15px 30px', background: '#2ea44f', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Сохранить
      </button>

      <button 
        onClick={() => navigate(-1)}
        style={{ marginLeft: '10px', padding: '15px 30px', background: '#666', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Назад
      </button>
    </div>
  );
}