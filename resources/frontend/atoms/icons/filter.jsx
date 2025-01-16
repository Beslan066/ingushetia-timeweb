export default function FilterIcon({ size = 24, color = 'neutral-black' }) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7H14" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
      <path d="M22 17L10 17" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
      <path d="M18 7L22 7" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
      <path d="M6 17L2 17" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
      <rect x="14" y="4" width="4" height="6" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
      <rect x="10" y="20" width="4" height="6" transform="rotate(180 10 20)" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
    </svg>
  )
}
