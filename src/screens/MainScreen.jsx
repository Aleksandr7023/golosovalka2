// src/screens/MainScreen.jsx — v1.021 — по профессиональному стандарту

// 1. Импорты
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import PrimaryButton from '../components/PrimaryButton.jsx'
import DangerButton from '../components/DangerButton.jsx'
import { deleteDraft } from '../utils/draftUtils.js'

import '../styles/screens/MainScreen.css'

// 2. Компонент
export default function MainScreen() {
  const navigate = useNavigate()

  // 3. Состояние
  const [drafts, setDrafts] = useState([])
  const [activeOpen, setActiveOpen] = useState(true)
  const [myOpen, setMyOpen] = useState(false)

  // 4. Вспомогательные функции
  const refreshDrafts = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('draft_'))
    const loaded = keys.map(k => {
      const data = JSON.parse(localStorage.getItem(k))
      return { ...data, id: k.replace('draft_', '') }
    })
    setDrafts(loaded)
  }

  const handleDeleteDraft = (id) => {
    if (confirm('Удалить черновик?')) {
      localStorage.removeItem(`draft_${id}`)
      refreshDrafts()
    }
  }

const handleOpenDraft = (draft) => {
  navigate('/create', { state: { draftId: draft.id }, replace: true })
}

  const toggleActive = () => {
    setActiveOpen(prev => !prev)
    if (myOpen) setMyOpen(false)
  }

  const toggleMy = () => {
    setMyOpen(prev => !prev)
    if (activeOpen) setActiveOpen(false)
  }

  // 5. useEffect
  useEffect(() => {
    refreshDrafts()
    window.addEventListener('focus', refreshDrafts)
    return () => window.removeEventListener('focus', refreshDrafts)
  }, [])

  // 6. Константы (данные)
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

  // 7. Рендер
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
                      handleDeleteDraft(draft.id)
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