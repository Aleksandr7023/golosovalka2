// src/PollSettingsScreen.jsx — v3.008

import React, { useState } from 'react'

export default function PollSettingsScreen({ onBack }) {
  const [multiple, setMultiple] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [showResults, setShowResults] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [hasEndDate, setHasEndDate] = useState(false)
  const [endDate, setEndDate] = useState('')
  const [closedPoll, setClosedPoll] = useState(false)
  const [tiedToAddress, setTiedToAddress] = useState(false)
  const [nickType, setNickType] = useState('telegram')
  const [customNickHint, setCustomNickHint] = useState('')
  const [revoteDelay, setRevoteDelay] = useState('never')

  const effectiveNickType = anonymous ? 'telegram' : nickType

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Только версия текущего экрана, без наложения */}
      <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '12px', color: '#888', zIndex: 1000 }}>
        v3.008
      </div>

      <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '32px', padding: '4px 8px', cursor: 'pointer', alignSelf: 'flex-start' }}>
        ←
      </button>

      <h2 style={{ fontSize: '22px', margin: '4px 0 16px 0' }}>СВОЙСТВА ОПРОСА</h2>

      <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
        {/* Фиксированный пункт */}
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', opacity: 0.7 }}>
          <span style={{ fontSize: '17px' }}>Запуск с одобрения администратора</span>
          <input type="checkbox" checked={true} disabled style={{ width: '22px', height: '22px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Одновременно можно выбрать сразу несколько вариантов</span>
          <input type="checkbox" checked={multiple} onChange={e => setMultiple(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Анонимный опрос</span>
          <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        {anonymous && (
          <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '12px', marginBottom: '12px', fontSize: '15px', color: '#666' }}>
            При анонимном опросе ник участника скрыт
          </div>
        )}

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Показывать результаты участникам</span>
          <input type="checkbox" checked={showResults} onChange={e => setShowResults(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Разрешить комментарии</span>
          <input type="checkbox" checked={allowComments} onChange={e => setAllowComments(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Закрытый опрос, вход только по приглашению</span>
          <input type="checkbox" checked={closedPoll} onChange={e => setClosedPoll(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Привязать к конкретному адресу (объекту)</span>
          <input type="checkbox" checked={tiedToAddress} onChange={e => setTiedToAddress(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Ограничить время опроса</span>
          <input type="checkbox" checked={hasEndDate} onChange={e => setHasEndDate(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        {hasEndDate && (
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '17px', display: 'block', marginBottom: '6px' }}>Дата окончания</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '70%', padding: '10px', borderRadius: '12px', border: '1px solid #ccc' }} />
          </div>
        )}

        <div style={{ marginBottom: '12px' }}>
          <span style={{ fontSize: '17px', display: 'block', marginBottom: '8px' }}>Через сколько можно переголосовать</span>
          <select value={revoteDelay} onChange={e => setRevoteDelay(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #ccc', fontSize: '17px' }}>
            <option value="never">Никогда</option>
            <option value="1h">Через 1 час</option>
            <option value="24h">Через сутки</option>
            <option value="7d">Через неделю</option>
            <option value="30d">Через месяц</option>
          </select>
        </div>

        {!anonymous && (
          <>
            <div style={{ fontSize: '17px', marginBottom: '8px' }}>Отображать имя участника как:</div>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="radio" name="nick" checked={effectiveNickType === 'telegram'} onChange={() => setNickType('telegram')} style={{ marginRight: '12px' }} />
              <span style={{ fontSize: '17px' }}>Ник из Telegram</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="radio" name="nick" checked={effectiveNickType === 'custom'} onChange={() => setNickType('custom')} style={{ marginRight: '12px' }} />
              <span style={{ fontSize: '17px' }}>Специальный ник</span>
            </label>

            {effectiveNickType === 'custom' && (
              <div style={{ marginTop: '6px' }}>
                <input
                  placeholder="Соответствующий специфике опроса"
                  value={customNickHint}
                  onChange={e => setCustomNickHint(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #ccc' }}
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