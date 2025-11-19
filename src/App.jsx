import React from 'react'

export default function App() {
  const stats = [
    { icon: '🔷', value: 78 },
    { icon: '🔶', value: 135 },
    { icon: '⭐', value: 7 },
    { icon: '⚡', value: 53 },
    { icon: '💬', value: 50 }
  ]

  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Строка достижений */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', fontSize: '14px', marginBottom: '32px' }}>
        {stats.map(s => (
          <span key={s.icon}>{s.icon} {s.value}</span>
        ))}
      </div>

      {/* Поиск */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '12px', padding: '8px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <span style={{ marginRight: '8px' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Поиск по опросам" 
            style={{ border: 'none', outline: 'none', width: '100%' }}
          />
        </div>
      </div>

      {/* Активные темы */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>АКТИВНЫЕ ТЕМЫ:</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            "Ремонт в подъезде #47"
          </div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            "Арта в 'Мир Танков'"
          </div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            "Кофе без пластика"
          </div>
        </div>
      </div>

      {/* Кнопка */}
      <button style={{ 
        width: '100%', 
        padding: '16px', 
        background: '#0066ff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '16px', 
        fontSize: '18px', 
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0,102,255,0.3)'
      }}>
        ЗАДАТЬ НОВЫЙ ОПРОС
      </button>

      {/* Мои темы */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>МОИ ТЕМЫ:</h2>
        <div style={{ color: '#888' }}>(пока пусто)</div>
      </div>
    </div>
  )
}