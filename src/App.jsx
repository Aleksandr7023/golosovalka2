// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // ← добавлен useLocation
import MainScreen from './screens/MainScreen.jsx';
import PollScreen from './screens/PollScreen.jsx';
import CommentScreen from './screens/CommentScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import { APP_VERSION, APP_NAME } from './utils/constants.js';

// Контекст для передачи telegramId
export const UserContext = React.createContext(null);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [telegramId, setTelegramId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // ← отслеживаем изменения URL

  // Определение Telegram ID — срабатывает при изменении URL (чтобы не терялся при переходах)
  useEffect(() => {
    let id = null;

    // 1. Mini App (смартфон)
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      id = window.Telegram.WebApp.initDataUnsafe.user.id;
    }

    // 2. Telegram Web — из tgWebAppData в URL hash
    if (!id && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const webAppData = params.get('tgWebAppData');
      if (webAppData) {
        try {
          const webParams = new URLSearchParams(webAppData);
          const userEncoded = webParams.get('user');
          if (userEncoded) {
            const userJson = decodeURIComponent(userEncoded);
            const user = JSON.parse(userJson);
            id = user.id;
          }
        } catch (e) {
          console.error('Ошибка парсинга tgWebAppData', e);
        }
      }
    }

    // 3. Резерв — localStorage.user_auth
    if (!id) {
      const stored = localStorage.getItem('user_auth');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          id = userData.id;
        } catch (e) {
          console.error('Ошибка парсинга localStorage', e);
        }
      }
    }

    // 4. Локальный тест
    if (!id && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      id = 9999;
    }

    setTelegramId(id);
  }, [location.pathname, location.hash]); // ← срабатывает при любом изменении URL

  return (
    <UserContext.Provider value={{ telegramId }}>
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
            minWidth: '180px'
          }}>
            <button 
              onClick={() => {
                setMenuOpen(false); // ← закрываем меню
                navigate('/profile');
              }}
              style={{ width: '100%', padding: '12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px' }}
            >
              Мой профиль
            </button>
            <button 
              onClick={() => {
                setMenuOpen(false); // ← закрываем меню
                alert(`Голосовалка\nВерсия: ${APP_VERSION}\n© 2025`);
              }}
              style={{ width: '100%', padding: '12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px' }}
            >
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