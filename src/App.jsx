import { useState } from 'react';
import MainScreen from './screens/MainScreen.jsx';
import { APP_VERSION, APP_NAME } from './utils/constants.js';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <header style={{ position: 'relative', padding: '20px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#0969da' }}>{APP_NAME}</h1>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
            ⋮
          </button>
        </div>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '100%',
            background: 'white',
            border: '1px solid #d0d7de',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,.1)',
            zIndex: 10,
            minWidth: '160px'
          }}>
            <p style={{ margin: '8px 0', fontSize: '14px' }}>Версия: {APP_VERSION}</p>
            {/* Другие пункты меню можно добавить здесь */}
          </div>
        )}
      </header>

      <main>
        <MainScreen />
      </main>
    </div>
  );
}