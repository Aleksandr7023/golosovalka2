// src/screens/MainScreen.jsx — v1.008 (ВЫПАДАЮЩИЕ СПИСКИ РАБОТАЮТ!)

import React from 'react'
import PrimaryButton from '../components/PrimaryButton.jsx'
import './styles/screens/MainScreen.css'

export default function MainScreen({
  drafts,
  onNewPoll,
  onOpenDraft,
  onDeleteDraft,
  activeOpen,
  myOpen,
  onToggleActive,
  onToggleMy
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
    <div className="main-container">
      <div className="rating-bar">
        🔷 78 🔶 135 ⭐ 7 ⚡ 53 💬 50
      </div>

      <div className="central-block shadow-card">
        <img src="https://iili.io/fdku4vj.jpg" alt="Столкновение сил" />
        <div className="search-input">
          <span>🔍</span>
          <input type="text" placeholder="Поиск по обсуждениям" />
        </div>
        <PrimaryButton onClick={onNewPoll}>
          ЗАДАТЬ НОВЫЙ ОПРОС
        </PrimaryButton>
      </div>

      <div className="section">
        <h2 onClick={onToggleActive} className="section-title">
          АКТИВНЫЕ ТЕМЫ: {activeOpen ? '▼' : '▲'}
        </h2>
        {activeOpen && (
          <div className="topic-list">
            {hotTopics.map((topic, i) => (
              <div key={i} className="topic-item shadow-card">
                {topic}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h2 onClick={onToggleMy} className="section-title">
          МОИ ТЕМЫ: {myOpen ? '▼' : '▲'}
        </h2>
        {myOpen && (
          <div className="topic-list">
            {drafts.length === 0 ? (
              <div style={{ color: '#888' }}>(пока пусто)</div>
            ) : (
              drafts.map((draft, i) => (
                <div key={i} className="draft-item shadow-card">
                  <div onClick={() => onOpenDraft(draft)} style={{ cursor: 'pointer' }}>
                    {draft.theme || 'Без темы'} (черновик)
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteDraft(draft.id) }}
                    className="delete-draft-btn"
                  >
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