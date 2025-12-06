// src/App.jsx — чистый контейнер

import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { APP_VERSION } from './utils/constants.js'

export default function App() {
  return (
    <div style={{
      padding: '16px',
      background: '#f8f9fa',
      minHeight: '100dvh',
      position: 'relative',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: '12px',
        color: '#888',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.7)',
        padding: '4px 8px',
        borderRadius: '6px'
      }}>
        {APP_VERSION}
      </div>
      <Outlet />
    </div>
  )
}
// FORCE_PUSH_TIMESTAMP: 2025-12-06 16:40:24