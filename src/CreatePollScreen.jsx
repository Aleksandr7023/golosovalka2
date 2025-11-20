// src/CreatePollScreen.jsx — v2.001

import React, { useState } from 'react'

export default function CreatePollScreen({ onBack }) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['Да', 'Нет'])

  const addOption = () => setOptions([...options, ''])

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888' }}>
        v2.001
      </div>

      <button onClick={onBack} style={{ marginBottom: '20px' }}>← Назад</button>

      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>СОЗДАНИЕ НОВОГО ОПРОСА</h2>

      <input
        placeholder="Вопрос"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ width: '100%', padding: '12px', fontSize: '18px', marginBottom: '20px', borderRadius: '12px', border: '1px solid #ccc' }}
      />

      <div style={{ marginBottom: '20px' }}>
        {options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Вариант ${i + 1}`}
            value={opt}
            onChange={e => {
              const newOpts = [...options]
              newOpts[i] = e.target.value
              setOptions(newOpts)
            }}
            style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '12px', border: '1px solid #ccc' }}
          />
        ))}
      </div>

      <button onClick={addOption} style={{ width: '100%', padding: '12px', background: '#4a90e2', color: 'white', borderRadius: '12px', marginBottom: '20px' }}>
        + Добавить вариант
      </button>

      <div style={{ background: '#e6f7ff', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
        Grok 4 предлагает: "Иногда нужна, но не во всех случаях"
      </div>

      <button style={{ width: '100%', padding: '16px', background: '#52c41a', color: 'white', fontSize: '18px', fontWeight: 'bold', borderRadius: '16px' }}>
        ЗАПУСТИТЬ ОПРОС
      </button>
    </div>
  )
}