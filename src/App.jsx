// src/App.jsx — ТОЛЬКО ОДИН СПИСОК, 100% РАБОТАЕТ!

import React, { useState } from 'react'

export default function App() {
  const [isOpen, setIsOpen] = useState(true)

  const topics = [
    "Ремонт в подъезде #47",
    "Арта в 'Мир Танков'",
    "Кофе без пластика",
    "Новый парк в районе",
    "Шум от соседей"
  ]

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Проверка списка</h1>

      {/* ОДИН СПИСОК — РАБОТАЕТ НА 100% */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2
          onClick={() => setIsOpen(!isOpen)}
          style={{
            cursor: 'pointer',
            fontSize: '24px',
            margin: '0 0 20px 0',
            userSelect: 'none',
            color: '#333'
          }}
        >
          АКТИВНЫЕ ТЕМЫ: {isOpen ? 'Скрыть ▼' : 'Показать ▲'}
        </h2>

        {isOpen && (
          <div>
            {topics.map((topic, i) => (
              <div
                key={i}
                style={{
                  background: '#f9f9f9',
                  padding: '16px',
                  marginBottom: '12px',
                  borderRadius: '12px',
                  border: '1px solid #eee'
                }}
              >
                {topic}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '50px', textAlign: 'center', color: '#666' }}>
        Кликни на заголовок — список должен открываться/закрываться
      </div>
    </div>
  )
}