// src/PollSettingsScreen.jsx — v3.010 (настройки сохраняются и загружаются правильно)

import React, { useState, useEffect } from 'react'

export default function PollSettingsScreen({ onBack, draftId: currentDraftId }) {
  const [multiple, setMultiple] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [showResults, setShowResults] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [hasEndDate, setHasEndDate] = useState(false)
  const [endDate, setEndDate] = useState('')
  const [closedPoll, setClosedPoll] = useState(false)
  const [tiedToAddress, setTiedToAddress] = useState(false)
  const [addressHint, setAddressHint] = useState('')
  const [nickType, setNickType] = useState('telegram')
  const [customNickHint, setCustomNickHint] = useState('')
  const [revoteDelay, setRevoteDelay] = useState('never')

  const effectiveNickType = anonymous ? 'telegram' : nickType

  // Загрузка настроек при изменении currentDraftId (включая первый рендер)
  useEffect(() => {
    if (!currentDraftId) {
      // Новый опрос — чистые настройки
      setMultiple(false)
      setAnonymous(false)
      setShowResults(true)
      setAllowComments(true)
      setHasEndDate(false)
      setEndDate('')
      setClosedPoll(false)
      setTiedToAddress(false)
      setAddressHint('')
      setNickType('telegram')
      setCustomNickHint('')
      setRevoteDelay('never')
      return
    }

    const saved = localStorage.getItem(`draft_${currentDraftId}`)
    if (saved) {
      const data = JSON.parse(saved)
      if (data.settings) {
        const s = data.settings
        setMultiple(!!s.multiple)
        setAnonymous(!!s.anonymous)
        setShowResults(s.showResults !== false)
        setAllowComments(s.allowComments !== false)
        setHasEndDate(!!s.hasEndDate)
        setEndDate(s.endDate || '')
        setClosedPoll(!!s.closedPoll)
        setTiedToAddress(!!s.tiedToAddress)
        setAddressHint(s.addressHint || '')
        setNickType(s.nickType || 'telegram')
        setCustomNickHint(s.customNickHint || '')
        setRevoteDelay(s.revoteDelay || 'never')
      }
    }
  }, [currentDraftId])

  const saveSettings = () => {
    if (!currentDraftId) {
      alert('Ошибка: черновик не найден')
      return
    }

    const settings = {
      multiple,
      anonymous,
      showResults,
      allowComments,
      hasEndDate,
      endDate: hasEndDate ? endDate : null,
      closedPoll,
      tiedToAddress,
      addressHint: tiedToAddress ? addressHint : '',
      nickType: anonymous ? 'telegram' : nickType,
      customNickHint: effectiveNickType === 'custom' ? customNickHint : '',
      revoteDelay
    }

    const draftKey = `draft_${currentDraftId}`
    const draftData = JSON.parse(localStorage.getItem(draftKey) || '{}')
    draftData.settings = settings
    draftData.timestamp = Date.now()
    localStorage.setItem(draftKey, JSON.stringify(draftData))

    alert('Настройки сохранены!')
    onBack()
  }

  return (
    <div style={{ padding: '16px', background: '#f8f9fa', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

      <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '32px', padding: '4px 8px', cursor: 'pointer', alignSelf: 'flex-start' }}>
        ←
      </button>

      <h2 style={{ fontSize: '22px', margin: '4px 0 16px 0' }}>СВОЙСТВА ОПРОСА</h2>

      <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', opacity: 0.7 }}>
          <span style={{ fontSize: '17px' }}>Запуск с одобрения администратора</span>
          <input type="checkbox" checked={true} disabled style={{ width: '22px', height: '22px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Одновременно можно выбрать сразу несколько вариантов ответа</span>
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
          <span style={{ fontSize: '17px' }}>Закрытый опрос, вход только по приглашению (паролю)</span>
          <input type="checkbox" checked={closedPoll} onChange={e => setClosedPoll(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '17px' }}>Привязать к конкретному адресу (объекту)</span>
          <input type="checkbox" checked={tiedToAddress} onChange={e => setTiedToAddress(e.target.checked)} style={{ width: '22px', height: '22px' }} />
        </label>

        {tiedToAddress && (
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '17px', display: 'block', marginBottom: '6px' }}>Адрес или название объекта</span>
            <input
              placeholder="Например: ГК №47, ул. Ленина 15, Домоуправление «Солнечное»"
              value={addressHint}
              onChange={e => setAddressHint(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #ccc' }}
            />
          </div>
        )}

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
                  placeholder="Указать, чему он должен соответствовать"
                  value={customNickHint}
                  onChange={e => setCustomNickHint(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #ccc' }}
                />
              </div>
            )}
          </>
        )}
      </div>

      <button onClick={saveSettings} style={{ width: '100%', padding: '16px', background: '#52c41a', color: 'white', fontSize: '18px', fontWeight: 'bold', borderRadius: '16px' }}>
        СОХРАНИТЬ НАСТРОЙКИ
      </button>
    </div>
  )
}