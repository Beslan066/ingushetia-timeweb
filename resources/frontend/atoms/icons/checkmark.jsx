export default function Checkmark({ size = 24, color = 'neutral-black' }) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8L10 18L5 13" style={ { stroke: `var(--color-${ color })` }} strokeWidth="2"/>
    </svg>
  )
}
