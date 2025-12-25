// App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainScreen from './screens/MainScreen.jsx';
import PollScreen from './screens/PollScreen.jsx';
import CommentScreen from './screens/CommentScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import { APP_VERSION, APP_NAME } from './utils/constants.js';

export const UserContext = React.createContext();

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [telegramId, setTelegramId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let id = null;

    // Смартфон — реальный Telegram ID
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      id = window.Telegram.WebApp.initDataUnsafe.user.id;
    }

    // ПК — localhost = ты (тестовый пользователь)
    if (!id && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      id = 9999;
    }

    setTelegramId(id);
  }, []);

  return (
    <UserContext.Provider value={{ telegramId, setTelegramId }}>
      <div className="app">
        <header style={{ padding: '20px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#0969da' }}>{APP_NAME}</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', padding: '0 10px' }}
          >
            ⋯
          </button>
        </header>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '80px',
            background: 'white',
            border: '1px solid #d0d7de',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,.1)',
            zIndex: 10,
            minWidth: '160px'
          }}>
            <button onClick={() => navigate('/profile')} style={{ width: '100%', padding: '10px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              Мой профиль
            </button>
            <button onClick={() => alert(`Версия: ${APP_VERSION}`)} style={{ width: '100%', padding: '10px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              О программе
            </button>
          </div>
        )}

        <main>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/poll/:id" element={<PollScreen />} />
            <Route path="/comment/:id" element={<CommentScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  );
}