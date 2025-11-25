// src/App.jsx — ТОЛЬКО ГЛАВНЫЙ ЭКРАН, ЧТОБЫ ВСЁ РАБОТАЛО СРАЗУ

import React, { useState } from 'react'

export default function App() {
  const [activeOpen, setActiveOpen] = useState(true)
  const [myOpen, setMyOpen] = useState(false)

  const hotTopics = [
    "Ремонт в подъезде #47",
    "Арта в 'Мир Танков'",
    "Кофе без пластика",
    "Новый парк в районе",
    "Шум от соседей"
  ]

  const drafts = [
    { id: 1, theme: "Тимминг в Стальном Охотнике" },
    { id: 2, theme: "Кто лучший танк?" }
  ]

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Голосовалка</h1>

      <button style={{ width: '100%', padding: '16px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', marginBottom: '30px' }}>
        ЗАДАТЬ НОВЫЙ ОПРОС
      </button>

      {/* АКТИВНЫЕ ТЕМЫ */}
      <div style={{ marginBottom: '30px' }}>
        <h2 
          onClick={() => setActiveOpen(!activeOpen)}
          style={{ 
            cursor: 'pointer', 
            fontSize: '20px', 
            margin: '0 0 10px 0', 
            background: '#f0f0f0', 
            padding: '10px', 
            borderRadius: '8px',
            userSelect: 'none'
          }}
        >
          АКТИВНЫЕ ТЕМЫ: {activeOpen ? '▼' : '►'}
        </h2>
        {activeOpen && (
          <div style={{ marginTop: '10px' }}>
            {hotTopics.map((topic, i) => (
              <div key={i} style={{ background: 'white', padding: '15px', marginBottom: '8px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                {topic}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* МОИ ТЕМЫ */}
      <div>
        <h2 
          onClick={() => setMyOpen(!myOpen)}
          style={{ 
            cursor: 'pointer', 
            fontSize: '20px', 
            margin: '0 0 10px 0', 
            background: '#fff8e1', 
            padding: '10px', 
            borderRadius: '8px',
            userSelect: 'none'
          }}
        >
          МОИ ТЕМЫ: {myOpen ? '▼' : '►'}
        </h2>
        {myOpen && (
          <div style={{ marginTop: '10px' }}>
            {drafts.length === 0 ? (
              <p style={{ color: '#888' }}>(пока пусто)</p>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} style={{ background: '#fffbe6', padding: '15px', marginBottom: '8px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'relative' }}>
                  {draft.theme} (черновик)
                  <button style={{ position: 'absolute', top: '8px', right: '8px', background: '#ff4d4d', color: 'white', border: 'none', width: '20px', height: '20px', borderRadius: '50%' }}>
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}