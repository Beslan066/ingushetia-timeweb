export default function LeftArrowIcon({ width = 40, height = 24, color = 'neutral-black' }) {
  return (
    <svg width={ width } height={ height } viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M9 18L3 12L9 6" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
        <path d="M3 12L35 12" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
      </g>
    </svg>
  )
}
