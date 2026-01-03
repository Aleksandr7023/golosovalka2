// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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

  // Определение Telegram ID — исправленный полный вариант
  useEffect(() => {
    let id = null;

    // 1. Mini App (смартфон) — основной способ
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      id = window.Telegram.WebApp.initDataUnsafe.user.id;
    }

    // 2. Telegram Web (ПК) — из URL хэша (#tgWebAppData=...)
    if (!id && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const webAppData = hashParams.get('tgWebAppData');
      if (webAppData) {
        try {
          const decoded = decodeURIComponent(webAppData);
          const userStr = new URLSearchParams(decoded).get('user');
          if (userStr) {
            const user = JSON.parse(decodeURIComponent(userStr));
            id = user.id;
          }
        } catch (e) {
          console.error('Ошибка парсинга webAppData из хэша', e);
        }
      }
    }

    // 3. Резерв — localStorage (Telegram Web на ПК)
    if (!id) {
      const stored = localStorage.getItem('user_auth') || localStorage.getItem('tg_user_auth');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          id = userData.id;
        } catch (e) {
          console.error('Ошибка парсинга localStorage', e);
        }
      }
    }

    // 4. Тестовый режим для localhost (ПК, npm run dev)
    if (!id && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      id = 9999;
    }

    setTelegramId(id);
  }, []);

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
                setMenuOpen(false);
                navigate('/profile');
              }}
              style={{ width: '100%', padding: '12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px' }}
            >
              Мой профиль
            </button>
            <button 
              onClick={() => {
                setMenuOpen(false);
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