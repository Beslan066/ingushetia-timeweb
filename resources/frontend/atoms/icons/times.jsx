export default function TimesIcon ({size = 24, color = 'neutral-black'}) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L20 20" strokeWidth="2" style={{ stroke: `var(--color-${color})` }}/>
      <path d="M4 20L20 4" strokeWidth="2" style={{ stroke: `var(--color-${color})` }}/>
    </svg>
  );
}
