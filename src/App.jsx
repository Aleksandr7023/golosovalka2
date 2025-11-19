import React from 'react'

export default function App() {
  const hotTopics = [
    "Ремонт в подъезде #47",
    "Арта в 'Мир Танков'",
    "Кофе без пластика",
    "Новый парк в районе",
    "Шум от соседей",
    "Бесплатный Wi-Fi в метро",
    "Цены на продукты",
    "Экология города",
    "Транспортные пробки",
    "Безопасность на улицах"
  ]

  const myTopics = [
    "Мой вопрос про арту",
    "Ремонт крыши",
    "Кофе без пластика",
    "Парк у дома",
    "Тишина ночью",
    "Wi-Fi в подъезде",
    "Дороги в районе",
    "Мусор на улице",
    "Освещение двора",
    "Детская площадка"
  ]

  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Строка достижений */}
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
        🔷 78   🔶 135   ⭐ 7   ⚡ 53   💬 50
      </div>

      {/* Верхний блок */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🔥</div>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '12px', padding: '10px 16px', marginBottom: '20px' }}>
          <span style={{ marginRight: '10px', fontSize: '20px' }}>🔍</span>
          <input type="text" placeholder="Поиск по опросам" style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }} />
        </div>
        <button style={{ width: '100%', padding: '16px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 6px 16px rgba(74,144,226,0.3)' }}>
          ЗАДАТЬ НОВЫЙ ОПРОС
        </button>
      </div>

      {/* Активные темы */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>АКТИВНЫЕ ТЕМЫ:</h2>
        <div style={{ height: '240px', overflowY: 'auto', paddingRight: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {hotTopics.map((topic, i) => (
              <div key={i} style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Мои темы */}
      <div>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>МОИ ТЕМЫ:</h2>
        <div style={{ height: '240px', overflowY: 'auto', paddingRight: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {myTopics.length === 0 ? (
              <div style={{ color: '#888' }}>(пока пусто)</div>
            ) : (
              myTopics.map((topic, i) => (
                <div key={i} style={{ background: 'white', padding: '18px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}>
                  {topic}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}