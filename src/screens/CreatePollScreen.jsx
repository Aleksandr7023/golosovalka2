// src/screens/CreatePollScreen.jsx — v2.080 (фото НЕ открывается при прикреплении — 100% работает!)

import React, { useState, useEffect, useRef } from 'react'
import BackButton from '../components/BackButton.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SecondaryButton from '../components/SecondaryButton.jsx'
import LaunchButton from '../components/LaunchButton.jsx'
import { saveDraft } from '../utils/draftUtils.js'
import '../styles/screens/CreatePollScreen.css'

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

    if (invalid.length > 0) {
      setError('Файлы > 50 МБ запрещены')
    } else {
      setError('')
    }

    if (attachments.length + valid.length > 3) {
      setError('Максимум 3 вложения')
    } else {
      setAttachments(prev => [...prev, ...valid].slice(0, 3))
      setViewerFile(null) // ← сбрасываем просмотрщик при новом файле
    }
  }

  const removeAttachment = (i) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== i))
    if (viewerFile && viewerFile.file === attachments[i]) {
      URL.revokeObjectURL(viewerFile.url)
      setViewerFile(null)
    }
  }

  const openFile = (file) => {
    const url = URL.createObjectURL(file)
    setViewerFile({ url, file })
  }

  const addOption = () => {
    setOptions(prev => [...prev, ''])
    setTimeout(() => {
      if (optionsRef.current) optionsRef.current.scrollTop = optionsRef.current.scrollHeight
    }, 0)
  }

  const removeOption = (i) => {
    if (options.length <= 2) return
    setOptions(prev => prev.filter((_, idx) => idx !== i))
  }

  const updateOption = (i, value) => {
    setOptions(prev => {
      const newOpts = [...prev]
      newOpts[i] = value
      return newOpts
    })
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
          <div>📎</div>
        </label>

        {attachments.length > 0 && (
          <div className="attachments-list">
            {attachments.map((file, i) => (
              <div key={i} className="attachment-item">
                <div onClick={() => openFile(file)} className="attachment-preview">
                  {file.type.startsWith('image/') ? (
                    <div className="image-placeholder">Фото</div>
                  ) : file.type.startsWith('video/') ? (
                    <div className="video-preview">▶</div>
                  ) : (
                    <div className="file-placeholder">
                      {file.name.split('.').pop().toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeAttachment(i)
                  }}
                  className="remove-attachment"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="error-text">{error}</div>}

      {/* Просмотрщик */}
      {viewerFile && (
        <div className="viewer-overlay">
          <button onClick={() => setViewerFile(null)} className="viewer-close">×</button>
          <div className="viewer-content">
            {viewerFile.file.type.startsWith('image/') ? (
              <img src={viewerFile.url} alt="" />
            ) : viewerFile.file.type.startsWith('video/') ? (
              <video src={viewerFile.url} controls autoPlay />
            ) : (
              <iframe src={viewerFile.url} title={viewerFile.file.name} />
            )}
          </div>
        </div>
      )}

      {/* Варианты */}
      <div ref={optionsRef} className="options-list" style={{ paddingBottom: keyboardHeight > 0 ? `${keyboardHeight + 20}px` : '20px' }}>
        {options.map((opt, i) => (
          <div key={i} className="option-item">
            <textarea
              className="option-input"
              placeholder={`Вариант ответа ${i + 1}`}
              value={opt}
              onChange={e => updateOption(i, e.target.value)}
              rows={1}
            />
            {options.length > 2 && (
              <button onClick={() => removeOption(i)} className="remove-option">
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки */}
      <div className="bottom-buttons">
        <PrimaryButton onClick={addOption}>
          + Добавить вариант ответа
        </PrimaryButton>
        <div className="action-buttons">
          <SecondaryButton onClick={handleOpenSettings}>
            ⚙️ Свойства опроса
          </SecondaryButton>
          <LaunchButton>
            ЗАПУСТИТЬ ОПРОС
          </LaunchButton>
        </div>
      </div>
    </div>
  )
}