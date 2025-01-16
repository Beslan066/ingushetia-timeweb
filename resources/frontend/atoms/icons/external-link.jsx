export default function ExternalLinkIcon ({ size = 24, color = 'neutral-black' }) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1071 6H5V19H18V13.8929" style={ { stroke: `var(--color-${ color })` }} strokeWidth="2"/>
      <path d="M14 4H20M20 4V10M20 4L11 13" style={ { stroke: `var(--color-${ color })` }} strokeWidth="2"/>
    </svg>
  )
}
