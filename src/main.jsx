// src/main.jsx — v1.001 (entry point — всё подключено правильно)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Глобальные стили — подключаем ВСЁ, что нужно
import './styles/globals.css'     // Ресет + базовые стили
import './styles/common.css'      // Кнопки, тени, карточки — всё общее

// Версия выводится в App.jsx — здесь только импортируем (для логов, если захотим)
import { APP_VERSION } from './utils/constants.js'

console.log(`%c Golosovalka2 ${APP_VERSION} запущена!`, 'color: #52c41a; font-size: 16px; font-weight: bold;')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)