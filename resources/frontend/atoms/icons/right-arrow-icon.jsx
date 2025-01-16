export default function RightArrowIcon({ width = 40, height = 24, color = 'neutral-black' }) {
  return (
    <svg  width={ width } height={ height } viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29 6L35 12L29 18" style={ { stroke: `var(--color-${ color })` }} strokeWidth="2"/>
      <path d="M35 12H3" style={ { stroke: `var(--color-${ color })` }} strokeWidth="2"/>
    </svg>
  )
}
