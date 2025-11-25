// src/utils/constants.js вЂ” РІСЃРµ РєРѕРЅСЃС‚Р°РЅС‚С‹ РІ РѕРґРЅРѕРј РјРµСЃС‚Рµ

// Р’РµСЂСЃРёСЏ РїСЂРёР»РѕР¶РµРЅРёСЏ (РјРµРЅСЏРµС‚СЃСЏ С‚РѕР»СЊРєРѕ Р·РґРµСЃСЊ!)
export const APP_VERSION = 'v1.3'

// РњР°РєСЃРёРјР°Р»СЊРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РІР°СЂРёР°РЅС‚РѕРІ РѕС‚РІРµС‚Р°
export const MAX_OPTIONS = 20

// РњР°РєСЃРёРјР°Р»СЊРЅС‹Р№ СЂР°Р·РјРµСЂ С„Р°Р№Р»Р° (50 РњР‘)
export const MAX_FILE_SIZE = 50 * 1024 * 1024

// РњР°РєСЃРёРјР°Р»СЊРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РІР»РѕР¶РµРЅРёР№
export const MAX_ATTACHMENTS = 3

// РџРѕРґРґРµСЂР¶РёРІР°РµРјС‹Рµ С‚РёРїС‹ С„Р°Р№Р»РѕРІ
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

// Р’Р°СЂРёР°РЅС‚С‹ РїРµСЂРµРіРѕР»РѕСЃРѕРІР°РЅРёСЏ
export const REVOTE_OPTIONS = [
  { value: 'never', label: 'РќРёРєРѕРіРґР°' },
  { value: '1h', label: 'Р§РµСЂРµР· 1 С‡Р°СЃ' },
  { value: '24h', label: 'Р§РµСЂРµР· СЃСѓС‚РєРё' },
  { value: '7d', label: 'Р§РµСЂРµР· РЅРµРґРµР»СЋ' },
  { value: '30d', label: 'Р§РµСЂРµР· РјРµСЃСЏС†' }
]

// РўРёРїС‹ РЅРёРєРѕРІ
export const NICK_TYPES = {
  TELEGRAM: 'telegram',
  CUSTOM: 'custom'
}
