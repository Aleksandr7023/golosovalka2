import React from 'react'

export default function App() {
  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Строка достижений */}
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
        🔷 78 &nbsp; 🔶 135 &nbsp; ⭐ 7 &nbsp; ⚡ 53 &nbsp; 💬 50
      </div>

      {/* Заголовок + поиск */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🗳️</div>
        <h1 style={{ margin: '0 0 20px 0', fontSize: '28px', fontWeight: 'bold' }}>Голосовалка</h1>
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '12px', padding: '10px 16px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <span style={{ marginRight: '10px', fontSize: '20px' }}>🔍</span>
          <input type="text" placeholder="Поиск по опросам" style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }} />
        </div>
      </div>

      {/* Активные темы — прокручиваемые карточки */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>АКТИВНЫЕ ТЕ ТЕМЫ:</h2>
        <div style={{ maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
              "Ремонт в подъезде #47"
            </div>
            <div style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
              "Арта в 'Мир Танков'"
            </div>
            <div style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
              "Кофе без пластика"
            </div>
            {/* Добавь ещё — будет скроллиться */}
          </div>
        </div>
      </div>

      {/* Кнопка */}
      <button style={{ 
        width: '100%', 
        padding: '18px', 
        background: '#0066ff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '16px', 
        fontSize: '18px', 
        fontWeight: 'bold',
        boxShadow: '0 6px 16px rgba(0,102,255,0.3)',
        marginBottom: '40px'
      }}>
        ЗАДАТЬ НОВЫЙ ОПРОС
      </button>

      {/* Мои темы */}
      <div>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>МОИ ТЕМЫ:</h2>
        <div style={{ color: '#888' }}>(пока пусто)</div>
      </div>
    </div>
  )
}