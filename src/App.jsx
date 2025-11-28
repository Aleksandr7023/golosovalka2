// src/App.jsx — v1.040 (при закрытии одного — открывается другой!)

import React, { useState, useEffect } from 'react'
import MainScreen from './screens/MainScreen.jsx'
import CreatePollScreen from './screens/CreatePollScreen.jsx'
import PollSettingsScreen from './screens/PollSettingsScreen.jsx'
import { loadDrafts, deleteDraft } from './utils/draftUtils.js'
import { APP_VERSION } from './utils/constants.js'

export default function App() {
  const [screen, setScreen] = useState('main')
  const [drafts, setDrafts] = useState([])
  const [currentDraftId, setCurrentDraftId] = useState(null)

  // Один из списков ВСЕГДА открыт
  const [activeOpen, setActiveOpen] = useState(true)
  const [myOpen, setMyOpen] = useState(false)

  const refreshDrafts = () => setDrafts(loadDrafts())

  useEffect(() => {
    refreshDrafts()
  }, [])

  // Клик по "АКТИВНЫЕ ТЕМЫ" — переключаем: если был открыт → закрываем (и открываем "Мои")
  const toggleActive = () => {
    setActiveOpen(prev => !prev)
    setMyOpen(prev => !prev)  // ← автоматически переключаем другой
  }

  // Клик по "МОИ ТЕМЫ" — то же самое
  const toggleMy = () => {
    setMyOpen(prev => !prev)
    setActiveOpen(prev => !prev)  // ← автоматически переключаем другой
  }

  const handleOpenSettings = (draftId) => {
    setCurrentDraftId(draftId)
    setScreen('settings')
  }

  const handleOpenDraft = (draft) => {
    setCurrentDraftId(draft.id)
    setScreen('create')
  }

  const handleDeleteDraft = (id) => {
    if (confirm('Удалить черновик?')) {
      deleteDraft(id)
      refreshDrafts()
    }
  }

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100dvh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888', zIndex: 9999 }}>
        {APP_VERSION}
      </div>

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

      {screen === 'settings' && (
        <PollSettingsScreen
          draftId={currentDraftId}
          onBack={() => setScreen('create')}
        />
      )}
    </div>
  )
}