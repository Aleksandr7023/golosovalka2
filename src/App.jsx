import React from 'react'

export default function App() {
  return (
    <div style={{ padding: '15px', fontFamily: 'Arial, sans-serif', background: '#f0f8ff', minHeight: '100vh' }}>
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555' }}>
        🔷 78 &nbsp; 🔶 135 &nbsp; ⭐ 7 &nbsp; ⚡ 53 &nbsp; 💬 50
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '5px' }}>🔍</span>
        <input type="text" placeholder="Поиск по опросам" style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong>АКТИВНЫЕ ТЕМЫ:</strong>
        <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
          <ul style={{ paddingLeft: '15px' }}>
            <li>"Ремонт в подъезде #47"</li>
            <li>"Арта в 'Мир Танков'"</li>
            <li>"Кофе без пластика"</li>
            <li>"Тема 4"</li>
            <li>"Тема 5"</li>
            <li>"Тема 6"</li>
            <li>"Тема 7"</li>
            <li>"Тема 8"</li>
            <li>"Тема 9"</li>
            <li>"Тема 10"</li>
          </ul>
        </div>
      </div>

      <button style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '20px', marginTop: '20px', fontSize: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        ЗАДАТЬ НОВЫЙ ОПРОС
      </button>

      <div style={{ marginTop: '20px' }}>
        <strong>МОИ ТЕМЫ:</strong>
        <ul style={{ paddingLeft: '15px' }}>
          <li>(пока пусто)</li>
        </ul>
      </div>
    </div>
  )
}