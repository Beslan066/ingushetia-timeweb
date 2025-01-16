import { forwardRef } from "react";

export default forwardRef(function PlayIcon({ size = 52, color = 'primary-medium', onClick}, ref) {
  return (
    <svg width={ size } height={ size } viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={ onClick } ref={ref}>
      <g opacity="0.8">
        <circle cx="26" cy="26" r="26" style={ { fill: `var(--color-${ color })` } }/>
        <path d="M36 26L21 34.6603L21 17.3397L36 26Z" fill="#F2F2F2"/>
      </g>
    </svg>

  )
})
