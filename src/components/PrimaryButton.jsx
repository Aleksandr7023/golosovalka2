// src/components/PrimaryButton.jsx — СИНИЙ, как "ЗАДАТЬ НОВЫЙ ОПРОС" и "Добавить вариант ответа"

export default function PrimaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '16px',
        background: '#4a90e2',     // ← СИНИЙ, как было изначально!
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '16px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
        transition: 'all 0.2s ease',
        ...style
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#357ab8'
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 144, 226, 0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#4a90e2'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.3)'
      }}
    >
      {children}
    </button>
  )
}