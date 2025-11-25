export default function PrimaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      className="btn-base btn-large shadow-primary"
      style={{ background: '#52c41a', color: 'white', ...style }}
    >
      {children}
    </button>
  )
}