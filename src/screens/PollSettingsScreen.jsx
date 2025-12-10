// src/screens/PollSettingsScreen.jsx — v3.030 — сохранение настроек в currentDraft

import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import LaunchButton from '../components/LaunchButton.jsx'
import '../styles/screens/PollSettingsScreen.css'

export default function PollSettingsScreen() {
  const navigate = useNavigate()
  const { currentDraft, setCurrentDraft } = useOutletContext()

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

  // Загрузка настроек из currentDraft
  useEffect(() => {
    if (currentDraft?.settings) {
      const s = currentDraft.settings
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
  }, [currentDraft])

  const saveSettings = () => {
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

    // Сохраняем настройки в глобальный черновик
    setCurrentDraft(prev => ({
      ...prev,
      settings
    }))

    alert('Настройки сохранены!')
    navigate('/create')
  }

  return (
    <div className="settings-container">
      <BackButton onClick={() => navigate('/create')} />

      <h2 className="settings-title">СВОЙСТВА ОПРОСА</h2>

      <div className="settings-card shadow-card">
        <div className="setting-item" style={{ opacity: 0.7 }}>
          <span className="setting-label">Запуск с одобрения администратора</span>
          <input type="checkbox" checked disabled className="checkbox" />
        </div>

        <div className="setting-item">
          <span className="setting-label">Одновременно можно выбрать сразу несколько вариантов ответа</span>
          <input type="checkbox" checked={multiple} onChange={e => setMultiple(e.target.checked)} className="checkbox" />
        </div>

        <div className="setting-item">
          <span className="setting-label">Анонимный опрос</span>
          <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} className="checkbox" />
        </div>

        {anonymous && (
          <div className="hint-box">
            При анонимном опросе ник участника скрыт
          </div>
        )}

        <div className="setting-item">
          <span className="setting-label">Показывать результаты участникам</span>
          <input type="checkbox" checked={showResults} onChange={e => setShowResults(e.target.checked)} className="checkbox" />
        </div>

        <div className="setting-item">
          <span className="setting-label">Разрешить комментарии</span>
          <input type="checkbox" checked={allowComments} onChange={e => setAllowComments(e.target.checked)} className="checkbox" />
        </div>

        <div className="setting-item">
          <span className="setting-label">Закрытый опрос, вход только по приглашению (паролю)</span>
          <input type="checkbox" checked={closedPoll} onChange={e => setClosedPoll(e.target.checked)} className="checkbox" />
        </div>

        <div className="setting-item">
          <span className="setting-label">Привязать к конкретному адресу (объекту)</span>
          <input type="checkbox" checked={tiedToAddress} onChange={e => setTiedToAddress(e.target.checked)} className="checkbox" />
        </div>

        {tiedToAddress && (
          <div className="date-section">
            <span>Адрес или название объекта</span>
            <input
              placeholder="Например: ГК №47, ул. Ленина 15, Домоуправление «Солнечное»"
              value={addressHint}
              onChange={e => setAddressHint(e.target.value)}
              className="custom-nick-input"
            />
          </div>
        )}

        <div className="setting-item">
          <span className="setting-label">Ограничить время опроса</span>
          <input type="checkbox" checked={hasEndDate} onChange={e => setHasEndDate(e.target.checked)} className="checkbox" />
        </div>

        {hasEndDate && (
          <div className="date-section">
            <span>Дата окончания</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="date-input" />
          </div>
        )}

        <div className="revote-section">
          <span>Через сколько можно переголосовать</span>
          <select value={revoteDelay} onChange={e => setRevoteDelay(e.target.value)} className="revote-select">
            <option value="never">Никогда</option>
            <option value="1h">Через 1 час</option>
            <option value="24h">Через сутки</option>
            <option value="7d">Через неделю</option>
            <option value="30d">Через месяц</option>
          </select>
        </div>

        {!anonymous && (
          <>
            <div className="custom-nick-section">
              <span>Отображать имя участника как:</span>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="nick" checked={effectiveNickType === 'telegram'} onChange={() => setNickType('telegram')} />
                  <span>Ник из Telegram</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="nick" checked={effectiveNickType === 'custom'} onChange={() => setNickType('custom')} />
                  <span>Специальный ник</span>
                </label>
              </div>
              {effectiveNickType === 'custom' && (
                <input
                  placeholder="Указать, чему он должен соответствовать"
                  value={customNickHint}
                  onChange={e => setCustomNickHint(e.target.value)}
                  className="custom-nick-input"
                />
              )}
            </div>
          </>
        )}
      </div>

      <LaunchButton onClick={saveSettings}>
        СОХРАНИТЬ НАСТРОЙКИ
      </LaunchButton>
    </div>
  )
}