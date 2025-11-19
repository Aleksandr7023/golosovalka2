import React from 'react'

export default function App() {
  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Строка достижений */}
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555', marginBottom: '24px' }}>
        🔷 78 &nbsp; 🔶 135 &nbsp; ⭐ 7 &nbsp; ⚡ 53 &nbsp; 💬 50
      </div>

      {/* Верхний блок: картинка + поиск + кнопка */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <img src="https://thumbs.dreamstime.com/b/%D0%BE%D0%B3%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BF%D1%83%D0%B7%D1%8B%D1%80%D1%8C-%D1%80%D0%B5%D1%87%D0%B8-%D0%B3%D0%BE%D1%80%D0%B8%D1%82-%D0%B8%D1%81%D0%BA%D1%80%D0%B0%D0%BC%D0%B8-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D0%BD%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D1%8F%D1%80%D0%BA%D0%BE-%D0%BE%D1%80%D0%B0%D0%BD%D0%B6%D0%B5%D0%B2%D1%8B%D0%BC-%D0%B8-363194551.jpg" alt="Жаркие споры" style={{ width: '120px', height: '120px', marginBottom: '20px' }} />
        <h1 style={{ margin: '0 0 20px 0', fontSize: '28px', fontWeight: 'bold' }}>Голосовалка</h1>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '12px', padding: '10px 16px', marginBottom: '20px' }}>
          <span style={{ marginRight: '10px', fontSize: '20px' }}>🔍</span>
          <input type="text" placeholder="Поиск по опросам" style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }} />
        </div>
        <button style={{ width: '100%', padding: '16px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 6px 16px rgba(255,77,77,0.4)' }}>
          ЗАДАТЬ НОВЫЙ ОПРОС
        </button>
      </div>

      {/* Активные темы — теперь точно прокручиваются */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>АКТИВНЫЕ ТЕМЫ:</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
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

      {/* Мои темы */}
      <div>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>МОИ ТЕМЫ:</h2>
        <div style={{ color: '#888' }}>(пока пусто)</div>
      </div>
    </div>
  )
}