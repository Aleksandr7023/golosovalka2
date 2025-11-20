// src/App.jsx — v1.026

import React, { useState, useEffect } from 'react'
import CreatePollScreen from './CreatePollScreen.jsx'

export default function App() {
  const [screen, setScreen] = useState('main')
  const [activeOpen, setActiveOpen] = useState(true)
  const [myOpen, setMyOpen] = useState(false)
  const [draft, setDraft] = useState(null)
  const [editDraft, setEditDraft] = useState(null) // для редактирования

  useEffect(() => {
    const saved = localStorage.getItem('draftPoll')
    if (saved) setDraft(JSON.parse(saved))
  }, [])

  const toggleActive = () => {
    setActiveOpen(true)
    setMyOpen(false)
  }

  const toggleMy = () => {
    setMyOpen(true)
    setActiveOpen(false)
  }

  const openDraft = () => {
    setEditDraft(draft)
    setScreen('create')
  }

  const deleteDraft = () => {
    if (confirm('Удалить черновик?')) {
      localStorage.removeItem('draftPoll')
      setDraft(null)
    }
  }

  const hotTopics = [
    "Ремонт в подъезде #47", "Арта в 'Мир Танков'", "Кофе без пластика",
    "Новый парк в районе", "Шум от соседей", "Бесплатный Wi-Fi в метро",
    "Цены на продукты", "Экология города", "Транспортные пробки", "Безопасность на улицах"
  ]

  const myTopics = draft ? [{ ...draft, isDraft: true }] : []

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888' }}>
        v1.026
      </div>

      {screen === 'main' ? (
        <>
          <div style={{ textAlign: 'right', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
            🔷 78   🔶 135   ⭐ 7   ⚡ 53   💬 50
          </div>

          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <img src="https://iili.io/fdku4vj.jpg" alt="Столкновение сил" style={{ width: '120px', marginBottom: '16px' }} />
            <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '12px', padding: '10px 16px', marginBottom: '20px' }}>
              <span style={{ marginRight: '10px', fontSize: '20px' }}>🔍</span>
              <input type="text" placeholder="Поиск по обсуждениям" style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }} />
            </div>
            <button onClick={() => setScreen('create')} style={{ width: '100%', padding: '16px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 6px 16px rgba(74,144,226,0.3)' }}>
              ЗАДАТЬ НОВЫЙ ОПРОС
            </button>
          </div>

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
                      <div key={i} style={{ background: t.isDraft ? '#fffbe6' : 'white', padding: '16px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px', position: 'relative' }}>
                        <div onClick={t.isDraft ? openDraft : undefined} style={{ cursor: t.isDraft ? 'pointer' : 'default' }}>
                          {t.theme} {t.isDraft && '(черновик)'}
                        </div>
                        {t.isDraft && (
                          <button onClick={(e) => { e.stopPropagation(); deleteDraft() }} style={{ position: 'absolute', top: '8px', right: '8px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', fontSize: '12px' }}>
                            ×
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <CreatePollScreen draft={editDraft} onBack={() => setScreen('main')} />
      )}
    </div>
  )
}