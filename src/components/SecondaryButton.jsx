export default function SecondaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      className="btn-base btn-large shadow-secondary"
      style={{ background: '#666', color: 'white', ...style }}
    >
      {children}
    </button>
  )
}
// FORCE_PUSH_TIMESTAMP: 2025-12-06 16:40:25