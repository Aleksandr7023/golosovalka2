// src/screens/CreatePollScreen.jsx — v2.067 (стили вынесены — чистый код!)

import React, { useState, useEffect, useRef } from 'react'
import BackButton from '../components/BackButton.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SecondaryButton from '../components/SecondaryButton.jsx'
import { saveDraft } from '../utils/draftUtils.js'
import './styles/screens/CreatePollScreen.css'

export default function CreatePollScreen({ draftId, onBack, onOpenSettings }) {
  const [theme, setTheme] = useState('')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState('')
  const [viewerFile, setViewerFile] = useState(null)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const optionsRef = useRef(null)

  // Загрузка черновика
  useEffect(() => {
    if (!draftId) {
      setTheme('')
      setQuestion('')
      setOptions(['', ''])
      setAttachments([])
      return
    }
    const saved = localStorage.getItem(`draft_${draftId}`)
    if (saved) {
      const data = JSON.parse(saved)
      setTheme(data.theme || '')
      setQuestion(data.question || '')
      setOptions(data.options?.length >= 2 ? data.options : ['', ''])
      setAttachments(data.attachments || [])
    }
  }, [draftId])

  // Клавиатура (мобильные)
  useEffect(() => {
    const original = window.innerHeight
    const handleResize = () => {
      const diff = original - window.innerHeight
      setKeyboardHeight(diff > 100 ? diff : 0)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('focusin', handleResize)
    window.addEventListener('focusout', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('focusin', handleResize)
      window.removeEventListener('focusout', handleResize)
    }
  }, [])

  // Viewport фикс
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  const saveCurrentDraft = () => {
    const data = {
      theme,
      question,
      options: options.filter(o => o.trim() !== ''),
      attachments,
      id: draftId || undefined
    }
    return saveDraft(data)
  }

  const handleBack = () => {
    const hasData = theme.trim() || question.trim() || options.some(o => o.trim()) || attachments.length
    if (hasData) saveCurrentDraft()
    onBack()
  }

  const handleOpenSettings = () => {
    const currentId = draftId || saveCurrentDraft()
    onOpenSettings(currentId)
  }

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    const valid = files.filter(f => f.size <= 50 * 1024 * 1024)
    const invalid = files.filter(f => f.size > 50 * 1024 * 1024)
    if (invalid.length > 0) setError('Файлы > 50 МБ запрещены')
    else setError('')
    if (attachments.length + valid.length > 3) setError('Максимум 3 вложения')
    else setAttachments([...attachments, ...valid].slice(0, 3))
  }

  const removeAttachment = (i) => setAttachments(attachments.filter((_, idx) => idx !== i))

  const openFile = (file) => {
    const url = URL.createObjectURL(file)
    setViewerFile({ url, type: file.type, name: file.name })
  }

  const addOption = () => {
    setOptions([...options, ''])
    setTimeout(() => {
      if (optionsRef.current) optionsRef.current.scrollTop = optionsRef.current.scrollHeight
    }, 0)
  }

  const removeOption = (i) => {
    if (options.length <= 2) return
    setOptions(options.filter((_, idx) => idx !== i))
  }

  const updateOption = (i, value) => {
    const newOpts = [...options]
    newOpts[i] = value
    setOptions(newOpts)
  }

  return (
    <div className="create-poll-container">
      <BackButton onClick={handleBack} />

      <h2 className="poll-title">НОВЫЙ ОПРОС</h2>

      <input
        className="theme-input"
        placeholder="Тема опроса"
        value={theme}
        onChange={e => setTheme(e.target.value)}
      />

      <textarea
        className="question-textarea"
        placeholder="Вопрос"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />

      {/* Вложения */}
      <div className="attachments-bar">
        <label>
          <input type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx,.txt" onChange={handleFiles} style={{ display: 'none' }} />
          <div>Paperclip</div>
        </label>

        {attachments.length > 0 && (
          <div className="attachments-list">
            {attachments.map((file, i) => (
              <div key={i} className="attachment-item">
                <div onClick={() => openFile(file)} className="attachment-preview">
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="" />
                  ) : file.type.startsWith('video/') ? (
                    <div className="video-preview">Play</div>
                  ) : (
                    file.name.split('.').pop().toUpperCase()
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeAttachment(i) }}
                  className="remove-attachment btn-base btn-small-danger shadow-danger"
                  style={{ background: '#ff4d4d', color: 'white' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div style={{ color: '#ff4d4d', marginBottom: '12px', fontSize: '14px' }}>{error}</div>}

      {/* Просмотрщик */}
      {viewerFile && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setViewerFile(null)} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'white', fontSize: '32px', padding: '16px' }}>×</button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            {viewerFile.type.startsWith('image/') ? (
              <img src={viewerFile.url} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : viewerFile.type.startsWith('video/') ? (
              <video src={viewerFile.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
              <iframe src={viewerFile.url} title={viewerFile.name} style={{ width: '90%', height: '90%', border: 'none' }} />
            )}
          </div>
        </div>
      )}

      {/* Варианты */}
      <div ref={optionsRef} className="options-list" style={{ paddingBottom: keyboardHeight > 0 ? `${keyboardHeight + 20}px` : '20px' }}>
        {options.map((opt, i) => (
          <div key={i} className="option-item">
            <input
              className="option-input"
              placeholder={`Вариант ответа ${i + 1}`}
              value={opt}
              onChange={e => updateOption(i, e.target.value)}
            />
            {options.length > 2 && (
              <button
                onClick={() => removeOption(i)}
                className="remove-option btn-base shadow-secondary"
                style={{ background: '#ff4d4d', color: 'white', borderRadius: '8px', padding: '0 12px' }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки */}
      <div className="bottom-buttons">
        <PrimaryButton onClick={addOption} className="add-option-btn">
          + Добавить вариант ответа
        </PrimaryButton>

        <div className="action-buttons">
          <SecondaryButton onClick={handleOpenSettings}>
            Settings Свойства опроса
          </SecondaryButton>
          <PrimaryButton>
            ЗАПУСТИТЬ ОПРОС
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}