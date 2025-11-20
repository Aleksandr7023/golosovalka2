// src/CreatePollScreen.jsx — v2.018

import React, { useState } from 'react'

export default function CreatePollScreen({ onBack }) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState('')

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(f => f.size <= 50 * 1024 * 1024)
    const invalid = files.filter(f => f.size > 50 * 1024 * 1024)

    if (invalid.length > 0) setError('Файлы больше 50 МБ запрещены')
    else setError('')

    if (attachments.length + validFiles.length > 3) {
      setError('Максимум 3 вложения')
    } else {
      setAttachments([...attachments, ...validFiles].slice(0, 3))
    }
  }

  const removeAttachment = (i) => setAttachments(attachments.filter((_, idx) => idx !== i))

  const openFile = (file) => {
    const url = URL.createObjectURL(file)
    window.open(url, '_blank')
  }

  const addOption = () => setOptions([...options, ''])
  const removeOption = (i) => setOptions(options.filter((_, idx) => idx !== i))
  const updateOption = (i, value) => {
    const newOpts = [...options]
    newOpts[i] = value
    setOptions(newOpts)
  }

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888' }}>
        v2.018
      </div>

      <button onClick={onBack} style={{ marginBottom: '20px' }}>← Назад</button>

      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>НОВЫЙ ОПРОС</h2>

      <input placeholder="Тема опроса" style={{ width: '100%', padding: '12px', fontSize: '18px', marginBottom: '20px', borderRadius: '12px', border: '1px solid #ccc' }} />

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

      {/* Скрепка + превью справа */}
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
                      DOC
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

      {/* Варианты */}
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '190px', marginBottom: '20px', paddingRight: '8px' }}>
        {options.map((opt, i) => (
          <div key={i} style={{ display: 'flex', marginBottom: '12px' }}>
            <input
              placeholder={`Вариант ответа ${i + 1}`}
              value={opt}
              onChange={e => updateOption(i, e.target.value)}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ccc' }}
            />
            <button onClick={() => removeOption(i)} style={{ marginLeft: '8px', background: '#ff4d4d', color: 'white', borderRadius: '8px', padding: '0 12px' }}>
              ✕
            </button>
          </div>
        ))}
      </div>

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
  )
}