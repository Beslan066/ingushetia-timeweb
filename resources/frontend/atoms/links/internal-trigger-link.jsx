import ChevronRightIcon from "#/atoms/icons/chevron-right.jsx";
import './internal-trigger.css'

export default function InternalTriggerLink({ title, description, onClick }) {
  return (
    <div className="internal-trigger">
      <div className="internal-trigger__info">
        <h4 className="internal-trigger__title">{ title }</h4>
        { !!description && <span className="internal-trigger__description">{ description }</span> }
      </div>
      <button onClick={ onClick } className="internal-trigger__link"><ChevronRightIcon color="neutral-dark"/>
      </button>
    </div>
  )
}
