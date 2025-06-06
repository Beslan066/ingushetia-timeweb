export default function SearchIcon({ size, color = 'neutral-black', className = null }) {
  return (
    <svg width={ size } height={ size } className={ className } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.5" cy="7.5" r="6.5" transform="matrix(-1 0 0 1 18 3)" style={{ stroke: `#fff` }} strokeWidth="2"/>
      <path d="M15 15L21 21" style={{ stroke: `#fff` }} strokeWidth="2"/>
    </svg>
  )
}
