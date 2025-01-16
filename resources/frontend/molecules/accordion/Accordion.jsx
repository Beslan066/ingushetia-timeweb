import { useRef, useState } from "react";
import './accordion.css'

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef()

  const handle = () => {
    setOpen(!open)
    drawerRef.current.style.maxHeight = !open ? `${drawerRef.current.scrollHeight}px` : '0';
  }

  return (
    <div className={ `accordion accordion--${open ? 'opened' : 'closed'}` }>
      <button className="accordion__header" onClick={ handle }>
        <span>{ title }</span>
        <span className="accordion__icon"><img src={ open ? '/img/icons/Minus.svg' : '/img/icons/Plus.svg' } alt="иконка открытия"/></span>
      </button>
      <div className="accordion__body" ref={drawerRef}>
        <div className="accordion-body__content">
          { children }
        </div>
      </div>
    </div>
  )
}
