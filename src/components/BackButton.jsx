// src/components/BackButton.jsx

import React from 'react'

export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        fontSize: '32px',
        padding: '4px 8px',
        cursor: 'pointer',
        alignSelf: 'flex-start',
        lineHeight: '1',
        margin: '0',
        outline: 'none',
        userSelect: 'none'
      }}
      aria-label="Назад"
    >
      ←
    </button>
  )
}