// src/App.jsx — v1.029 (обновление черновиков + чистый второй экран)

import React, { useState, useEffect } from 'react'
import CreatePollScreen from './CreatePollScreen.jsx'

export default function App() {
  const [screen, setScreen] = useState('main')
  const [activeOpen, setActiveOpen] = useState(true)
  const [myOpen, setMyOpen] = useState(false)
  const [drafts, setDrafts] = useState([])
  const [editDraft, setEditDraft] = useState(null)

  const loadDrafts = () => {
    const ids = JSON.parse(localStorage.getItem('draftIds') || '[]')
    const loaded = ids.map(id => {
      const data = localStorage.getItem(`draft_${id}`)
      return data ? JSON.parse(data) : null
    }).filter(Boolean)
    setDrafts(loaded)
  }

  useEffect(() => {
    loadDrafts()
  }, [])

  const toggleActive = () => {
    setActiveOpen(true)
    setMyOpen(false)
  }

  const toggleMy = () => {
    setMyOpen(true)
    setActiveOpen(false)
  }

  const openDraft = (draft) => {
    setEditDraft(draft)
    setScreen('create')
  }

  const deleteDraft = (id) => {
    if (confirm('Удалить черновик?')) {
      localStorage.removeItem(`draft_${id}`)
      const ids = JSON.parse(localStorage.getItem('draftIds') || '[]')
      localStorage.setItem('draftIds', JSON.stringify(ids.filter(d => d !== id)))
      loadDrafts()
    }
  }

  const hotTopics = [
    "Ремонт в подъезде #47", "Арта в 'Мир Танков'", "Кофе без пластика",
    "Новый парк в районе", "Шум от соседей", "Бесплатный Wi-Fi в метро",
    "Цены на продукты", "Экология города", "Транспортные пробки", "Безопасность на улицах"
  ]

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {screen === 'main' ? (
        <>
          <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888' }}>
            v1.029
          </div>

          <div style={{ textAlign: 'right', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
            🔷 78   🔶 135   ⭐ 7   ⚡ 53   💬 50
          </div>

          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <img src="https://iili.io/fdku4vj.jpg" alt="Столкновение сил" style={{ width: '120px', marginBottom: '16px' }} />
            <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '12px', padding: '10px 16px', marginBottom: '20px' }}>
              <span style={{ marginRight: '10px', fontSize: '20px' }}>🔍</span>
              <input type="text" placeholder="Поиск по обсуждениям" style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }} />
            </div>
            <button onClick={() => {
              setEditDraft(null)
              setScreen('create')
            }} style={{ width: '100%', padding: '16px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold' }}>
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
                  {drafts.length === 0 ? (
                    <div style={{ color: '#888' }}>(пока пусто)</div>
                  ) : (
                    drafts.map((draft, i) => (
                      <div key={i} style={{ background: '#fffbe6', padding: '16px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px', position: 'relative' }}>
                        <div onClick={() => openDraft(draft)} style={{ cursor: 'pointer' }}>
                          {draft.theme || 'Без темы'} (черновик)
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); deleteDraft(draft.id) }} style={{ position: 'absolute', top: '8px', right: '8px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', fontSize: '12px' }}>
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <CreatePollScreen 
          draft={editDraft} 
          onBack={() => {
            setScreen('main')
            loadDrafts()  // <-- обновляем список черновиков
          }} 
        />
      )}
    </div>
  )
}