// src/PollSettingsScreen.jsx — v3.004

import React, { useState } from 'react'

export default function PollSettingsScreen({ onBack }) {
  const [multiple, setMultiple] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [showResults, setShowResults] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [hasEndDate, setHasEndDate] = useState(false)
  const [endDate, setEndDate] = useState('')
  const [nickType, setNickType] = useState('telegram') // 'telegram' | 'custom'
  const [customNickHint, setCustomNickHint] = useState('')

  // Если анонимно — принудительно telegram (скрытый ник)
  const effectiveNickType = anonymous ? 'telegram' : nickType

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888' }}>
        v3.004
      </div>

      <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '32px', padding: '4px 8px', cursor: 'pointer', alignSelf: 'flex-start' }}>
        ←
      </button>

      <h2 style={{ fontSize: '22px', margin: '8px 0 30px 0' }}>СВОЙСТВА ОПРОСА</h2>

      <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Можно выбрать несколько вариантов</span>
          <input type="checkbox" checked={multiple} onChange={e => setMultiple(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Анонимный опрос</span>
          <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        {anonymous && (
          <div style={{ padding: '12px', background: '#f0f0f0', borderRadius: '12px', marginBottom: '20px', fontSize: '16px', color: '#666' }}>
            При анонимном опросе ник участника скрыт
          </div>
        )}

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Показывать результаты участникам</span>
          <input type="checkbox" checked={showResults} onChange={e => setShowResults(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Разрешить комментарии</span>
          <input type="checkbox" checked={allowComments} onChange={e => setAllowComments(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '18px' }}>Ограничить время опроса</span>
          <input type="checkbox" checked={hasEndDate} onChange={e => setHasEndDate(e.target.checked)} style={{ width: '24px', height: '24px' }} />
        </label>

        {hasEndDate && (
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Дата окончания</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '70%', padding: '12px', borderRadius: '12px', border: '1px solid #ccc' }} />
          </div>
        )}

        {!anonymous && (
          <>
            <div style={{ fontSize: '18px', marginBottom: '12px' }}>Отображать имя участника как:</div>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <input type="radio" name="nick" checked={effectiveNickType === 'telegram'} onChange={() => setNickType('telegram')} style={{ marginRight: '12px' }} />
              <span style={{ fontSize: '18px' }}>Ник из Telegram</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <input type="radio" name="nick" checked={effectiveNickType === 'custom'} onChange={() => setNickType('custom')} style={{ marginRight: '12px' }} />
              <span style={{ fontSize: '18px' }}>Специальный ник</span>
            </label>

            {effectiveNickType === 'custom' && (
              <div style={{ marginTop: '8px' }}>
                <input
                  placeholder="Подсказка (например: номер бокса, ник в Танках)"
                  value={customNickHint}
                  onChange={e => setCustomNickHint(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ccc' }}
                />
              </div>
            )}
          </>
        )}
      </div>

      <button style={{ width: '100%', padding: '16px', background: '#52c41a', color: 'white', fontSize: '18px', fontWeight: 'bold', borderRadius: '16px' }}>
        СОХРАНИТЬ НАСТРОЙКИ
      </button>
    </div>
  )
}