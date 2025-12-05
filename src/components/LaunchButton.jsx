// src/components/LaunchButton.jsx — зелёная кнопка "ЗАПУСТИТЬ ОПРОС"

export default function LaunchButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '16px',
        background: '#52c41a',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '16px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(82, 196, 26, 0.3)',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#389e0d'
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(82, 196, 26, 0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#52c41a'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(82, 196, 26, 0.3)'
      }}
    >
      {children}
    </button>
  )
}