import React from 'react'

export default function App() {
  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Строка достижений */}
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
        🔷 78   🔶 135   ⭐ 7   ⚡ 53   💬 50
      </div>

      {/* Верхний блок */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🔥</div>
        <h1 style={{ margin: '0 0 20px 0', fontSize: '28px', fontWeight: 'bold' }}>Голосовалка</h1>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '12px', padding: '10px 16px', marginBottom: '20px' }}>
          <span style={{ marginRight: '10px', fontSize: '20px' }}>🔍</span>
          <input type="text" placeholder="Поиск по опросам" style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }} />
        </div>
        <button style={{ width: '100%', padding: '16px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 6px 16px rgba(74,144,226,0.3)' }}>
          ЗАДАТЬ НОВЫЙ ОПРОС
        </button>
      </div>

      {/* Активные темы — прокручиваются */}
<div style={{ marginBottom: '40px' }}>
  <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>АКТИВНЫЕ ТЕМЫ:</h2>
  <div style={{ height: '200px', overflowY: 'auto', paddingRight: '8px' }}>
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
      <div style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
        "Новый парк в районе"
      </div>
      <div style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
        "Шум от соседей"
      </div>
      <div style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
        "Бесплатный Wi-Fi в метро"
      </div>
      <div style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
        "Цены на продукты"
      </div>
      <div style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
        "Экология города"
      </div>
    </div>
  </div>
</div>

      {/* Мои темы */}
      <div>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>МОИ ТЕМЫ:</h2>
        <div style={{ color: '#888' }}>(пока пусто)</div>
      </div>
    </div>
  )
}