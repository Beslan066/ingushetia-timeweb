export default function BarsIcon({ size, color = 'neutral-black' }) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6H22" style={{ stroke: `var(--color-${color})` }} strokeWidth="2"/>
      <path d="M2 12H22" style={{ stroke: `var(--color-${color})` }} strokeWidth="2"/>
      <path d="M2 18H22" style={{ stroke: `var(--color-${color})` }} strokeWidth="2"/>
    </svg>
  );
}
