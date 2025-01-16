export default function VideoIcon({ size = 24, color = 'neutral-medium' }) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="16" height="12" style={ { stroke: `var(--color-${ color })` } } strokeWidth="2"/>
      <path d="M15 12L10 15L10 9L15 12Z" style={ { fill: `var(--color-${ color })` } }/>
    </svg>
  );
}
