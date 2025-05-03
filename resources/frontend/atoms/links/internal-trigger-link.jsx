import ChevronRightIcon from "#/atoms/icons/chevron-right.jsx";
import './internal-trigger.css'

export default function InternalTriggerLink({ title, description, onClick }) {
  return (
    <div className="internal-trigger" style={{marginBottom: '10px'}} onClick={ onClick }>
      <div className="internal-trigger__info">
        <h4 className="internal-trigger__title">{ title }</h4>
        { !!description && <span className="internal-trigger__description">{ description }</span> }
      </div>
      <button className="internal-trigger__link"><ChevronRightIcon color="neutral-dark"/>
      </button>
    </div>
  )
}
