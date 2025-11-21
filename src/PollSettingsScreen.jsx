// src/PollSettingsScreen.jsx
import React, { useState } from 'react'

export default function PollSettingsScreen({ onBack }) {
  const [multiple, setMultiple] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [showResults, setShowResults] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [endDate, setEndDate] = useState('')

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100vh' }}>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>← Назад</button>
      <h2 style={{ fontSize: '22px', marginBottom: '30px' }}>СВОЙСТВА ОПРОСА</h2>

      <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Множественный выбор</span>
          <input type="checkbox" checked={multiple} onChange={e => setMultiple(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Анонимный опрос</span>
          <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Показывать результаты</span>
          <input type="checkbox" checked={showResults} onChange={e => setShowResults(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Разрешить комментарии</span>
          <input type="checkbox" checked={allowComments} onChange={e => setAllowComments(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Дата окончания</span>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ccc' }} />
        </div>
      </div>

      <button style={{ width: '100%', padding: '16px', background: '#52c41a', color: 'white', fontSize: '18px', fontWeight: 'bold', borderRadius: '16px' }}>
        СОХРАНИТЬ НАСТРОЙКИ
      </button>
    </div>
  )
}