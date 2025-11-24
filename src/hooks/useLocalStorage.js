// src/hooks/useLocalStorage.js

import { useState, useEffect } from 'react'

/**
 * Кастомный хук для работы с localStorage
 * @param {string} key — ключ в localStorage
 * @param {any} initialValue — значение по умолчанию (если в хранилище пусто)
 * @returns {[any, Function]} — [значение, функция для обновления]
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Ошибка чтения localStorage ключа "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error)
    }
  }

  // Синхронизация между вкладками (опционально, но круто)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue)
        } catch (error) {
          console.error('Ошибка синхронизации localStorage:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [storedValue, setValue]
}