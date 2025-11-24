// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css' // ← Глобальные стили (из index.css)
import { APP_VERSION } from './utils/constants.js'

// Для отладки в консоли (по желанию)
console.log(`%c Golosovalka2 ${APP_VERSION}`, 'color: #52c41a; font-size: 16px; font-weight: bold;')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)