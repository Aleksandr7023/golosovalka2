import React, { useState } from 'react'

export default function CreatePollScreen({ onBack }) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['Да', 'Нет'])

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100vh' }}>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>← Назад</button>

      <h2>СОЗДАНИЕ НОВОГО ОПРОСА</h2>

      <input
        placeholder="Вопрос"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ width: '100%', padding: '12px', margin: '16px 0', fontSize: '18px' }}
      />

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
          style={{ width: '100%', padding: '12px', margin: '8px 0' }}
        />
      ))}

      <button onClick={() => setOptions([...options, ''])} style={{ margin: '16px 0' }}>
        + Добавить вариант
      </button>

      <button style={{ width: '100%', padding: '16px', background: '#0066ff', color: 'white', fontSize: '18px' }}>
        ЗАПУСТИТЬ ОПРОС
      </button>
    </div>
  )
}