// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainScreen from './screens/MainScreen.jsx';
import PollScreen from './screens/PollScreen.jsx';
import CommentScreen from './screens/CommentScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import { APP_VERSION } from './utils/constants.js';

// Контекст для передачи telegramId и telegramUsername
export const UserContext = React.createContext({ telegramId: null, telegramUsername: '' });

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [telegramId, setTelegramId] = useState(null);
  const [telegramUsername, setTelegramUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Определение Telegram ID и Username
  useEffect(() => {
    let id = null;
    let username = '';

    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      id = user.id;
      username = user.username || '';
    }

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
            username = user.username || '';
          }
        } catch (e) {
          console.error('Ошибка парсинга tgWebAppData', e);
        }
      }
    }

    if (!id) {
      const stored = localStorage.getItem('user_auth');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          id = userData.id;
          username = userData.username || '';
        } catch (e) {}
      }
    }

    if (!id && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      id = 9999;
      username = 'test_user';
    }

    if (id) {
      localStorage.setItem('app_telegram_id', id);
    }
    if (username) {
      localStorage.setItem('app_telegram_username', username);
    }

    setTelegramId(id);
    setTelegramUsername(username);
  }, []);

  useEffect(() => {
    if (telegramId === null) {
      const savedId = localStorage.getItem('app_telegram_id');
      if (savedId) setTelegramId(savedId);
    }
    if (telegramUsername === '') {
      const savedUsername = localStorage.getItem('app_telegram_username');
      if (savedUsername) setTelegramUsername(savedUsername);
    }
  }, [telegramId, telegramUsername]);

  const isMainScreen = location.pathname === '/';
  const isPollScreen = location.pathname.startsWith('/poll/');

  const handleBack = () => {
    if (isPollScreen) {
      navigate('/'); // ← с PollScreen всегда на главную
    } else {
      navigate(-1); // ← на других экранах — по истории
    }
  };

  return (
    <UserContext.Provider value={{ telegramId, telegramUsername }}>
      <div className="app">
        <header style={{ padding: '20px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!isMainScreen && (
              <button
                onClick={handleBack}
                style={{ background: 'none', border: 'none', fontSize: '32px', cursor: 'pointer', marginRight: '15px', padding: '0' }}
              >
                ←
              </button>
            )}
          </div>

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
            minWidth: '180px',
            width: '180px'
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
                setShowHelpModal(true);
              }}
              style={{ width: '100%', padding: '12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px' }}
            >
              Помощь
            </button>
            <button 
              onClick={() => {
                setMenuOpen(false);
                alert(`Голосовалка\nВерсия: ${APP_VERSION}\n© 2026`);
              }}
              style={{ width: '100%', padding: '12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px' }}
            >
              О программе
            </button>
          </div>
        )}

        {showHelpModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              textAlign: 'center'
            }}>
              <h2 style={{ marginBottom: '20px', color: '#0969da' }}>Помощь</h2>
              <p style={{ fontSize: '16px', marginBottom: '30px' }}>
                По всем вопросам пишите на почту:<br />
                <strong>admin@the8th.ru</strong>
              </p>
              <button
                onClick={() => setShowHelpModal(false)}
                style={{
                  padding: '12px 30px',
                  background: '#2ea44f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Закрыть
              </button>
            </div>
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