// src/screens/MainScreen.jsx — v1.001

import React from 'react'
import BackButton from '../components/BackButton.jsx'

export default function MainScreen({ 
  drafts, 
  onNewPoll, 
  onOpenDraft, 
  onDeleteDraft 
}) {
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

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Главный экран — без стрелки "Назад" */}
      
      {/* Значки рейтинга */}
      <div style={{ textAlign: 'right', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
        78 135 7 53 50
      </div>

      {/* Центральный блок */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <img src="https://iili.io/fdku4vj.jpg" alt="Столкновение сил" style={{ width: '120px', marginBottom: '16px' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '12px', padding: '10px 16px', marginBottom: '20px' }}>
          <span style={{ marginRight: '10px', fontSize: '20px' }}>Search</span>
          <input 
            type="text" 
            placeholder="Поиск по обсуждениям" 
            style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }} 
          />
        </div>

        <button 
          onClick={onNewPoll}
          style={{ width: '100%', padding: '16px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold' }}
        >
          ЗАДАТЬ НОВЫЙ ОПРОС
        </button>
      </div>

      {/* Активные темы */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold' }}>
          АКТИВНЫЕ ТЕМЫ
        </h2>
        <div style={{ height: '240px', overflowY: 'auto', paddingRight: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {hotTopics.map((topic, i) => (
              <div 
                key={i} 
                style={{ background: 'white', padding: '16px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px' }}
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Мои темы (черновики) */}
      <div>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 'bold' }}>
          МОИ ТЕМЫ
        </h2>
        <div style={{ height: '240px', overflowY: 'auto', paddingRight: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {drafts.length === 0 ? (
              <div style={{ color: '#888' }}>(пока пусто)</div>
            ) : (
              drafts.map((draft, i) => (
                <div 
                  key={i} 
                  style={{ background: '#fffbe6', padding: '16px', borderRadius: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontSize: '17px', position: 'relative' }}
                >
                  <div onClick={() => onOpenDraft(draft)} style={{ cursor: 'pointer' }}>
                    {draft.theme || 'Без темы'} (черновик)
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteDraft(draft.id) }}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', fontSize: '12px' }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}