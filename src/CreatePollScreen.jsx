// src/CreatePollScreen.jsx — v2.050

import React, { useState, useEffect } from 'react'

export default function CreatePollScreen({ onBack, draft }) {
  const [theme, setTheme] = useState('')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState('')
  const [viewerFile, setViewerFile] = useState(null)
  const [draftId, setDraftId] = useState(null)

  useEffect(() => {
    if (draft) {
      setTheme(draft.theme || '')
      setQuestion(draft.question || '')
      setOptions(draft.options?.length >= 2 ? draft.options : ['', ''])
      setDraftId(draft.id)
    }
  }, [draft])

  const saveDraft = () => {
    const currentData = {
      theme,
      question,
      options: options.filter(o => o.trim() !== ''),
      attachments,
      timestamp: Date.now(),
      id: draftId || Date.now().toString()
    }
    if (!draftId) setDraftId(currentData.id)
    localStorage.setItem(`draft_${currentData.id}`, JSON.stringify(currentData))
    const ids = JSON.parse(localStorage.getItem('draftIds') || '[]')
    if (!ids.includes(currentData.id)) {
      ids.push(currentData.id)
      localStorage.setItem('draftIds', JSON.stringify(ids))
    }
  }

  const handleBack = () => {
    const hasData = theme.trim() !== '' || question.trim() !== '' || options.some(o => o.trim() !== '') || attachments.length > 0
    if (hasData) saveDraft()
    onBack()
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

  const addOption = () => setOptions([...options, ''])
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
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888' }}>
        v2.050
      </div>

      <button onClick={handleBack} style={{ background: 'none', border: 'none', fontSize: '32px', padding: '4px 8px', cursor: 'pointer', alignSelf: 'flex-start' }}>
        ←
      </button>

      <h2 style={{ fontSize: '22px', margin: '8px 0 20px 0' }}>НОВЫЙ ОПРОС</h2>

      <input placeholder="Тема опроса" value={theme} onChange={e => setTheme(e.target.value)} style={{ width: '100%', padding: '12px', fontSize: '18px', marginBottom: '20px', borderRadius: '12px', border: '1px solid #ccc' }} />

      <textarea
        placeholder="Вопрос"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '18px',
          marginBottom: '8px',
          borderRadius: '12px',
          border: '1px solid #ccc',
          resize: 'none',
          minHeight: '80px',
          maxHeight: '200px',
          overflowY: 'auto',
          fieldSizing: 'content'
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <label>
          <input type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx,.txt" onChange={handleFiles} style={{ display: 'none' }} />
          <div style={{ fontSize: '32px', cursor: 'pointer' }}>📎</div>
        </label>

        {attachments.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
            {attachments.map((file, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div onClick={() => openFile(file)} style={{ cursor: 'pointer' }}>
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : file.type.startsWith('video/') ? (
                    <div style={{ width: '40px', height: '40px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>▶</div>
                  ) : (
                    <div style={{ width: '40px', height: '40px', background: '#ddd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                      {file.name.split('.').pop().toUpperCase()}
                    </div>
                  )}
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeAttachment(i) }} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px' }}>
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

      {/* Варианты — поднято на одну строку */}
      <div style={{ flex: 1, overflowY: options.length > 3 ? 'auto' : 'visible', paddingRight: '8px', paddingBottom: '100px' }}>
        {options.map((opt, i) => (
          <div key={i} style={{ display: 'flex', marginBottom: '12px' }}>
            <input
              placeholder={`Вариант ответа ${i + 1}`}
              value={opt}
              onChange={e => updateOption(i, e.target.value)}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ccc' }}
            />
            {options.length > 2 && (
              <button onClick={() => removeOption(i)} style={{ marginLeft: '8px', background: '#ff4d4d', color: 'white', borderRadius: '8px', padding: '0 12px' }}>
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки — подняты на одну строку */}
      <div style={{ marginTop: '-40px' }}>
        <button onClick={addOption} style={{ width: '100%', padding: '12px', background: '#4a90e2', color: 'white', borderRadius: '12px', marginBottom: '12px' }}>
          + Добавить вариант ответа
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ flex: 1, padding: '16px', background: '#666', color: 'white', fontSize: '18px', fontWeight: 'bold', borderRadius: '16px' }}>
            ⚙️ Свойства опроса
          </button>
          <button style={{ flex: 1, padding: '16px', background: '#52c41a', color: 'white', fontSize: '18px', fontWeight: 'bold', borderRadius: '16px' }}>
            ЗАПУСТИТЬ ОПРОС
          </button>
        </div>
      </div>
    </div>
  )
}