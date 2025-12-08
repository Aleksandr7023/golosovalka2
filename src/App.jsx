// src/App.jsx — v1.052 — currentDraftId + drafts + функции

import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { APP_VERSION } from './utils/constants.js'
import { loadDrafts, deleteDraft } from './utils/draftUtils.js'

export default function App() {
  const drafts = loadDrafts()

  const [currentDraftId, setCurrentDraftId] = useState(null)

  const handleOpenDraft = (draft) => {
    setCurrentDraftId(draft.id)
  }

  const handleDeleteDraft = (id) => {
    if (confirm('Удалить черновик?')) {
      deleteDraft(id)
      window.dispatchEvent(new Event('storage'))
    }
  }

  return (
    <div style={{
      padding: '16px',
      background: '#f8f9fa',
      minHeight: '100dvh',
      position: 'relative',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: '12px',
        color: '#888',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.7)',
        padding: '4px 8px',
        borderRadius: '6px'
      }}>
        {APP_VERSION}
      </div>

      <Outlet context={{
        currentDraftId,
        setCurrentDraftId,
        drafts,
        onOpenDraft: handleOpenDraft,
        onDeleteDraft: handleDeleteDraft
      }} />
    </div>
  )
}
// FORCE_PUSH_TIMESTAMP: 2025-12-08 19:00:54