// src/App.jsx — чистый роутинг (версия только в constants.js)

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

  const refreshDrafts = () => {
    setDrafts(loadDrafts())
  }

  useEffect(() => {
    refreshDrafts()
  }, [])

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
      {/* Единая версия приложения — только здесь */}
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888', zIndex: 9999 }}>
        {APP_VERSION}
      </div>

      {screen === 'main' && (
        <MainScreen
          drafts={drafts}
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