export default function GalleryIcon({ size = 52, color = 'primary-medium' }) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.8">
        <circle cx="26" cy="26" r="26"  style={{ fill: `var(--color-${ color })` }}/>
        <rect x="18" y="18" width="16" height="16" fill="white"/>
        <rect x="12" y="21" width="3" height="10" fill="white"/>
        <rect x="37" y="21" width="3" height="10" fill="white"/>
      </g>
    </svg>
  )
}
