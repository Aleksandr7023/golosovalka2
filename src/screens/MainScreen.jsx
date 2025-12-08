// src/screens/MainScreen.jsx — v1.027 — клик по черновику использует currentDraftId

import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton.jsx'
import DangerButton from '../components/DangerButton.jsx'
import '../styles/screens/MainScreen.css'

export default function MainScreen() {
  const navigate = useNavigate()
  const { drafts, onOpenDraft, onDeleteDraft, setCurrentDraftId } = useOutletContext()

  const [activeOpen, setActiveOpen] = useState(true)
  const [myOpen, setMyOpen] = useState(false)

  const toggleActive = () => {
    setActiveOpen(prev => !prev)
    if (myOpen) setMyOpen(false)
  }

  const toggleMy = () => {
    setMyOpen(prev => !prev)
    if (activeOpen) setActiveOpen(false)
  }

  const handleOpenDraft = (draft) => {
    setCurrentDraftId(draft.id)
    navigate('/create')
  }

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

        <PrimaryButton onClick={() => navigate('/create')}>
          ЗАДАТЬ НОВЫЙ ОПРОС
        </PrimaryButton>
      </div>

      <div className="section">
        <h2 onClick={toggleActive} className="section-title">
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
        <h2 onClick={toggleMy} className="section-title">
          МОИ ТЕМЫ: {myOpen ? '▼' : '▲'}
        </h2>
        {myOpen && (
          <div className="topic-list">
            {drafts.length === 0 ? (
              <div style={{ color: '#888' }}>(пока пусто)</div>
            ) : (
              drafts.map((draft, i) => (
                <div key={i} className="draft-item shadow-card">
                  <div onClick={() => handleOpenDraft(draft)} className="draft-text">
                    {draft.theme || 'Без темы'} (черновик)
                  </div>
                  <DangerButton
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteDraft(draft.id)
                    }}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
// FORCE_PUSH_TIMESTAMP: 2025-12-08 19:00:55