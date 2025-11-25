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
        alignSelf: 'flex-start'
      }}
    >
      ←
    </button>
  )
}