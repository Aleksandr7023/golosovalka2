// src/App.jsx — v1.039 (взаимоисключающие списки — как ты просил!)

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

  // Состояние списков — взаимоисключающие
  const [activeOpen, setActiveOpen] = useState(true)  // Активные темы
  const [myOpen, setMyOpen] = useState(false)         // Мои темы

  // Изначально закрыты

  const refreshDrafts = () => setDrafts(loadDrafts())

  useEffect(() => {
    refreshDrafts()
  }, [])

  // Клик по "АКТИВНЫЕ ТЕМЫ" — если открыт → закрыть, иначе открыть (и закрыть "Мои")
  const toggleActive = () => {
    if (activeOpen) {
      setActiveOpen(false)
    } else {
      setActiveOpen(true)
      setMyOpen(false)
    }
  }

  // Клик по "МОИ ТЕМЫ" — если открыт → закрыть, иначе открыть (и закрыть "Активные")
  const toggleMy = () => {
    if (myOpen) {
      setMyOpen(false)
    } else {
      setMyOpen(true)
      setActiveOpen(false)
    }
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