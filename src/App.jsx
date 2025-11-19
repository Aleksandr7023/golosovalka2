import React, { useState } from 'react'

export default function App() {
  const [activeOpen, setActiveOpen] = useState(true)
  const [myOpen, setMyOpen] = useState(false)

  const toggleActive = () => {
    setActiveOpen(!activeOpen)
    if (myOpen) setMyOpen(false)
  }

  const toggleMy = () => {
    setMyOpen(!myOpen)
    if (activeOpen) setActiveOpen(false)
  }

  const hotTopics = [
    "Ремонт в подъезде #47", "Арта в 'Мир Танков'", "Кофе без пластика",
    "Новый парк в районе", "Шум от соседей", "Бесплатный Wi-Fi в метро",
    "Цены на продукты", "Экология города", "Транспортные пробки", "Безопасность на улицах"
  ]

  const myTopics = [
    "Мой вопрос про арту", "Ремонт крыши", "Кофе без пластика",
    "Парк у дома", "Тишина ночью", "Wi-Fi в подъезде",
    "Дороги в районе", "Мусор на улице", "Освещение двора", "Детская площадка"
  ]

  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Версия */}
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888' }}>
        v1.001
      </div>

      {/* Строка достижений */}
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
        🔷 78   🔶 135   ⭐ 7   ⚡ 53   💬 50
      </div>

      {/* Верхний блок */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <img src="https://iili.io/fdku4vj.jpg" alt="Столкновение сил" style={{ width: '120px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '12px', padding: '10px 16px', marginBottom: '20px' }}>
          <span style={{ marginRight: '10px', fontSize: '20px' }}>🔍</span>
          <input type="text" placeholder="Поиск по обсуждениям" style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }} />
        </div>
        <button style={{ width: '100%', padding: '16px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 6px 16px rgba(74,144,226,0.3)' }}>
          ЗАДАТЬ НОВЫЙ ОПРОС
        </button>
      </div>

      {/* Активные темы */}
      <div style={{ marginBottom: '30px' }}>
        <h2 onClick={toggleActive} style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          АКТИВНЫЕ ТЕМЫ: {activeOpen ? '▲' : '▼'}
        </h2>
        {activeOpen && (
          <div style={{ height: '240px', overflowY: 'auto', paddingRight: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {hotTopics.map((t, i) => (
                <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Мои темы */}
      <div>
        <h2 onClick={toggleMy} style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          МОИ ТЕМЫ: {myOpen ? '▲' : '▼'}
        </h2>
        {myOpen && (
          <div style={{ height: '240px', overflowY: 'auto', paddingRight: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {myTopics.length === 0 ? (
                <div style={{ color: '#888' }}>(пока пусто)</div>
              ) : (
                myTopics.map((t, i) => (
                  <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
                    {t}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}