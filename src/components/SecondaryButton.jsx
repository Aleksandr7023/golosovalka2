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
// FORCE_PUSH_TIMESTAMP: 2025-12-08 19:00:55