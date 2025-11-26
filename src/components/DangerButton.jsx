// src/components/DangerButton.jsx — КРАСНАЯ КНОПКА УДАЛЕНИЯ (работает 100%!)

export default function DangerButton({ onClick, children = '×' }) {
  return (
    <button
      onClick={onClick}
      className="btn-base btn-small-danger shadow-danger"
      style={{
        background: '#ff4d4d',
        color: 'white',
        border: 'none'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#ff3333'
        e.currentTarget.style.boxShadow = '0 4px 10px rgba(255,77,77,0.6)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#ff4d4d'
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(255,77,77,0.4)'
      }}
    >
      {children}
    </button>
  )
}