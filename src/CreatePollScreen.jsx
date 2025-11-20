// src/CreatePollScreen.jsx — v2.012

import React, { useState } from 'react'

export default function CreatePollScreen({ onBack }) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])

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
        v2.012
      </div>

      <button onClick={onBack} style={{ marginBottom: '20px' }}>← Назад</button>
      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>НОВЫЙ ОПРОС</h2>

      <input placeholder="Тема опроса" style={{ width: '100%', padding: '12px', fontSize: '18px', marginBottom: '20px', borderRadius: '12px', border: '1px solid #ccc' }} />

      {/* Вопрос — растягивается */}
      <textarea
        placeholder="Вопрос"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '18px',
          marginBottom: '20px',
          borderRadius: '12px',
          border: '1px solid #ccc',
          resize: 'none',
          minHeight: '80px',
          maxHeight: '200px',
          overflowY: 'auto',
          fieldSizing: 'content'
        }}
      />

      {/* Варианты — flex: 1, занимает всё оставшееся место */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', marginBottom: '20px' }}>
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