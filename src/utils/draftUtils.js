// src/utils/draftUtils.js — всё про черновики в одном месте

/**
 * Сохраняет черновик
 * @param {Object} draftData - данные черновика (theme, question, options, attachments и т.д.)
 * @returns {string} ID черновика
 */
export const saveDraft = (draftData) => {
  const id = draftData.id || Date.now().toString()
  const draft = {
    ...draftData,
    id,
    timestamp: Date.now()
  }

  // Сохраняем сам черновик
  localStorage.setItem(`draft_${id}`, JSON.stringify(draft))

  // Обновляем список ID
  const ids = JSON.parse(localStorage.getItem('draftIds') || '[]')
  if (!ids.includes(id)) {
    ids.push(id)
    localStorage.setItem('draftIds', JSON.stringify(ids))
  }

  return id
}

/**
 * Загружает все черновики, отсортированные по дате (новые сверху)
 * @returns {Array} массив черновиков
 */
export const loadDrafts = () => {
  const ids = JSON.parse(localStorage.getItem('draftIds') || '[]')
  
  const drafts = ids
    .map(id => {
      const data = localStorage.getItem(`draft_${id}`)
      return data ? JSON.parse(data) : null
    })
    .filter(Boolean)
    .sort((a, b) => b.timestamp - a.timestamp) // новые сверху

  return drafts
}

/**
 * Удаляет черновик по ID
 * @param {string} id - ID черновика
 */
export const deleteDraft = (id) => {
  localStorage.removeItem(`draft_${id}`)
  
  const ids = JSON.parse(localStorage.getItem('draftIds') || '[]')
  const filtered = ids.filter(d => d !== id)
  localStorage.setItem('draftIds', JSON.stringify(filtered))
}

/**
 * Полностью очищает все черновики (на будущее)
 */
export const clearAllDrafts = () => {
  const ids = JSON.parse(localStorage.getItem('draftIds') || '[]')
  ids.forEach(id => localStorage.removeItem(`draft_${id}`))
  localStorage.removeItem('draftIds')
}