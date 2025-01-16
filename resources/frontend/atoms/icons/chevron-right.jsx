export default function ChevronRightIcon({ size = 24, color = 'neutral-black' }) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4L17 12L9 20" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
    </svg>
  )
}
