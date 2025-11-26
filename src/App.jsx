// src/App.jsx — v1.038 (всё с русскими комментариями!)

import React, { useState, useEffect } from 'react'
import MainScreen from './screens/MainScreen.jsx'
import CreatePollScreen from './screens/CreatePollScreen.jsx'
import PollSettingsScreen from './screens/PollSettingsScreen.jsx'
import { loadDrafts, deleteDraft } from './utils/draftUtils.js'
import { APP_VERSION } from './utils/constants.js'

// Главный компонент всего приложения
export default function App() {
  // Какой экран показываем сейчас: 'main', 'create' или 'settings'
  const [screen, setScreen] = useState('main')

  // Список всех черновиков
  const [drafts, setDrafts] = useState([])

  // ID текущего редактируемого черновика (если открываем из списка)
  const [currentDraftId, setCurrentDraftId] = useState(null)

  // Состояние раскрытия списков на главном экране
  const [activeOpen, setActiveOpen] = useState(true)   // "АКТИВНЫЕ ТЕМЫ" — открыт по умолчанию
  const [myOpen, setMyOpen] = useState(false)          // "МОИ ТЕМЫ" — закрыт по умолчанию

  // Функция обновления списка черновиков из localStorage
  const refreshDrafts = () => {
    setDrafts(loadDrafts())
  }

  // При старте приложения — загружаем черновики
  useEffect(() => {
    refreshDrafts()
  }, [])

  // Открываем "АКТИВНЫЕ ТЕМЫ" — закрываем "МОИ ТЕМЫ"
  const toggleActive = () => {
    setActiveOpen(true)
    setMyOpen(false)
  }

  // Открываем "МОИ ТЕМЫ" — закрываем "АКТИВНЫЕ ТЕМЫ"
  const toggleMy = () => {
    setMyOpen(true)
    setActiveOpen(false)
  }

  // Переход на экран настроек опроса
  const handleOpenSettings = (draftId) => {
    setCurrentDraftId(draftId)
    setScreen('settings')
  }

  // Открытие черновика на редактирование
  const handleOpenDraft = (draft) => {
    setCurrentDraftId(draft.id)
    setScreen('create')
  }

  // Удаление черновика
  const handleDeleteDraft = (id) => {
    if (confirm('Удалить черновик?')) {
      deleteDraft(id)
      refreshDrafts()
    }
  }

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100dvh', position: 'relative' }}>
      {/* Версия приложения — в левом верхнем углу */}
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888', zIndex: 9999 }}>
        {APP_VERSION}
      </div>

      {/* Главный экран */}
      {screen === 'main' && (
        <MainScreen
          drafts={drafts}
          activeOpen={activeOpen}
          myOpen={myOpen}
          onToggleActive={toggleActive}
          onToggleMy={toggleMy}
          onNewPoll={() => {
            setCurrentDraftId(null)
            setScreen('create')
          }}
          onOpenDraft={handleOpenDraft}
          onDeleteDraft={handleDeleteDraft}
        />
      )}

      {/* Экран создания/редактирования опроса */}
      {screen === 'create' && (
        <CreatePollScreen
          draftId={currentDraftId}
          onBack={() => {
            setScreen('main')
            refreshDrafts()
          }}
          onOpenSettings={handleOpenSettings}
        />
      )}

      {/* Экран настроек опроса */}
      {screen === 'settings' && (
        <PollSettingsScreen
          draftId={currentDraftId}
          onBack={() => setScreen('create')}
        />
      )}
    </div>
  )
}