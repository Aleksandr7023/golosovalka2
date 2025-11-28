// src/utils/constants.js — все константы в одном месте

// Версия приложения (меняется только здесь!)
export const APP_VERSION = 'v1.34'

// Максимальное количество вариантов ответа
export const MAX_OPTIONS = 20

// Максимальный размер файла (50 МБ)
export const MAX_FILE_SIZE = 50 * 1024 * 1024

// Максимальное количество вложений
export const MAX_ATTACHMENTS = 3

// Поддерживаемые типы файлов
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
]

// Варианты переголосования
export const REVOTE_OPTIONS = [
  { value: 'never', label: 'Никогда' },
  { value: '1h', label: 'Через 1 час' },
  { value: '24h', label: 'Через сутки' },
  { value: '7d', label: 'Через неделю' },
  { value: '30d', label: 'Через месяц' }
]

// Типы ников
export const NICK_TYPES = {
  TELEGRAM: 'telegram',
  CUSTOM: 'custom'
}
