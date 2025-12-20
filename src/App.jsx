// App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainScreen from './screens/MainScreen.jsx';
import PollScreen from './screens/PollScreen.jsx';
import CommentScreen from './screens/CommentScreen.jsx';
import { APP_VERSION, APP_NAME } from './utils/constants.js';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
          <p style={{ margin: '8px 0', fontSize: '14px' }}>Версия: {APP_VERSION}</p>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/poll/:id" element={<PollScreen />} />
          <Route path="/comment/:id" element={<CommentScreen />} />
        </Routes>
      </main>
    </div>
  );
}