export default function PrintIcon({ size = 24, color = 'neutral-black' }) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 18H3V11C3 9.89543 3.89543 9 5 9H19C20.1046 9 21 9.89543 21 11V18H17" style={ { stroke: `var(--color-${ color })` }} strokeWidth="2"/>
      <rect x="7" y="14" width="10" height="6" style={ { stroke: `var(--color-${ color })` }} strokeWidth="2"/>
      <rect x="7" y="4" width="10" height="5" style={ { stroke: `var(--color-${ color })` }}strokeWidth="2"/>
    </svg>
  )
}
