// src/screens/CreatePollScreen.jsx — v4.11 — сохранение настроек + URL вложений

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import mammoth from 'mammoth'

import BackButton from '../components/BackButton.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import SecondaryButton from '../components/SecondaryButton.jsx'
import LaunchButton from '../components/LaunchButton.jsx'

import { saveDraft } from '../utils/draftUtils.js'
import '../styles/screens/CreatePollScreen.css'

export default function CreatePollScreen() {
  const navigate = useNavigate()
  const { currentDraftId, currentDraft, setCurrentDraft } = useOutletContext()

  const draftId = currentDraftId

  const [theme, setTheme] = useState(currentDraft?.theme || '')
  const [question, setQuestion] = useState(currentDraft?.question || '')
  const [options, setOptions] = useState(currentDraft?.options || ['', ''])
  const [attachments, setAttachments] = useState(currentDraft?.attachments || [])
  const [viewerFile, setViewerFile] = useState(null)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const optionsRef = useRef(null)

  // Загрузка черновика из контекста (настройки уже там)
  useEffect(() => {
    if (currentDraft) {
      setTheme(currentDraft.theme || '')
      setQuestion(currentDraft.question || '')
      setOptions(currentDraft.options || ['', ''])
      setAttachments(currentDraft.attachments || [])
    }
  }, [currentDraft])

  // Клавиатура
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

  // Сохранение черновика (включая настройки)
  const saveCurrentDraft = () => {
    const data = {
      theme,
      question,
      options: options.filter(o => o.trim() !== ''),
      attachments: attachments.map(a => ({ url: a.url, name: a.name })), // ← только URL
      settings: currentDraft?.settings || {}, // ← сохраняем настройки
      id: draftId || undefined
    }
    saveDraft(data)
  }

  const handleBack = () => {
    const hasData = theme.trim() || question.trim() || options.some(o => o.trim()) || attachments.length
    if (hasData) saveCurrentDraft()
    navigate('/')
  }

  const handleOpenSettings = () => {
    saveCurrentDraft()
    navigate('/settings')
  }

  // === ЗАГРУЗКА ФАЙЛОВ НА ТВОЙ ХОСТИНГ ===
  const handleFiles = async (e) => {
    const newFiles = Array.from(e.target.files)

    // Проверка размера
    const tooBig = newFiles.filter(f => f.size > 50 * 1024 * 1024)
    if (tooBig.length > 0) {
      alert('Файлы больше 50 МБ запрещены')
      return
    }

    // Проверка количества
    if (attachments.length + newFiles.length > 3) {
      alert('Максимум 3 вложения')
      return
    }

    setIsUploading(true)

    const uploaded = []

    for (const file of newFiles) {
      const formData = new FormData()
      formData.append('file', file)

      const initData = window.Telegram.WebApp.initData

      try {
        const res = await fetch('https://the8th.ru/api/upload.php', {
          method: 'POST',
          headers: {
            'X-Telegram-InitData': initData
          },
          body: formData
        })

        const json = await res.json()

        if (json.success) {
          uploaded.push({ url: json.url, name: file.name })
        } else {
          alert(`Ошибка загрузки ${file.name}: ${json.error || 'неизвестно'}`)
        }
      } catch (err) {
        alert(`Ошибка сети при загрузке ${file.name}`)
      }
    }

    if (uploaded.length > 0) {
      setAttachments(prev => [...prev, ...uploaded])
    }

    setIsUploading(false)
  }

  const removeAttachment = (i) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== i))
  }

  const openFile = (fileUrl) => {
    window.open(fileUrl, '_blank')
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

      <input className="theme-input" placeholder="Тема опроса" value={theme} onChange={e => setTheme(e.target.value)} />

      <textarea className="question-textarea" placeholder="Вопрос" value={question} onChange={e => setQuestion(e.target.value)} />

      {/* Вложения */}
      <div className="attachments-bar">
        <div className="attachments-controls">
          <label>
            <input
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              onChange={handleFiles}
              disabled={isUploading}
              style={{ display: 'none' }}
            />
            <div className={isUploading ? 'uploading' : ''}>
              📎 {isUploading ? 'Загрузка...' : ''}
            </div>
          </label>

          {attachments.length > 0 && (
            <div className="attachments-list">
              {attachments.map((file, i) => (
                <div key={i} className="attachment-item">
                  <div onClick={() => openFile(file.url)} className="attachment-preview">
                    {file.name}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeAttachment(i) }} className="remove-attachment">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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