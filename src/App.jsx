import React from 'react'

export default function App() {
  return (
    <div style={{ padding: '15px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555' }}>
        🔷 78 &nbsp; 🔶 135 &nbsp; ⭐ 7 &nbsp; ⚡ 53 &nbsp; 💬 50
      </div>

      <div style={{ marginTop: '20px' }}>
        🔍 <input type="text" placeholder="Поиск по опросам" style={{ width: '90%', padding: '8px' }} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong>ТОП-3 ТЕМЫ:</strong>
        <ul style={{ paddingLeft: '15px' }}>
          <li>"Ремонт в подъезде #47"</li>
          <li>"Арта в 'Мир Танков'"</li>
          <li>"Кофе без пластика"</li>
        </ul>
      </div>

      <button style={{ width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', marginTop: '20px' }}>
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