// src/components/DangerButton.jsx
export default function DangerButton({ onClick, children = '×' }) {
  return (
    <button
      onClick={onClick}
      className="btn-base btn-small-danger shadow-danger"
      style={{ background: '#ff4d4d', color: 'white' }}
    >
      {children}
    </button>
  )
}