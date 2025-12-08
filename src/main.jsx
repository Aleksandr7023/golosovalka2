// main.jsx — стили вынесены

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import MainScreen from './screens/MainScreen.jsx'
import CreatePollScreen from './screens/CreatePollScreen.jsx'
import PollSettingsScreen from './screens/PollSettingsScreen.jsx'

import './styles/globals.css'
import './styles/common.css'
import './styles/ErrorBoundary.css' // ← новый файл

import { APP_VERSION } from './utils/constants.js'
console.log(`%c Golosovalka2 ${APP_VERSION} запущена!`, 'color: #52c41a; font-size: 16px; font-weight: bold;')

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      const stack = this.state.errorInfo?.componentStack || ''
      const firstLine = stack.split('\n')[1] || ''
      const fileMatch = firstLine.match(/\((.*):(\d+):\d+\)/)
      const fileName = fileMatch ? fileMatch[1].split('/').pop() : 'неизвестный файл'
      const lineNumber = fileMatch ? fileMatch[2] : '?'

      return (
        <div className="error-container">
          <h1 className="error-title">Ошибка приложения</h1>
          <div className="error-info">
            <p><strong>Файл:</strong> {fileName}</p>
            <p><strong>Строка:</strong> {lineNumber}</p>
            <p className="error-message">{this.state.error?.toString()}</p>
          </div>
          <button className="reload-button" onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainScreen />} />
            <Route path="create" element={<CreatePollScreen />} />
            <Route path="settings" element={<PollSettingsScreen />} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
// FORCE_PUSH_TIMESTAMP: 2025-12-08 19:00:54