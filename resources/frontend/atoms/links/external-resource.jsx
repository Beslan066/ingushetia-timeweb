import './external-resource.css'
import ExternalLinkIcon from "#/atoms/icons/external-link.jsx";
import { Link } from "@inertiajs/react";

export default function ExternalResource({ title, link, highlightedDescription }) {

  return (
    <div className="external-resource__wrapper">
      <div className="external-resource__info">
        <div className="external-resource__title">{ title }</div>
        {!!highlightedDescription && <div className="external-resource__highligted-description">{highlightedDescription}</div>}
      </div>
      <div className="external-resource__footer">
        <a href={link} className="external-resource__path">{ link }</a>
        <ExternalLinkIcon color="neutral-darkest" />
      </div>
    </div>
  )
}

export function ExternalResourceInline ({ title, link, highlightedDescription }) {
  return (
    <div className="external-resource__wrapper external-resource__wrapper--inline">
      <div className="external-resource__info">
        <div className="external-resource__title">{ title }</div>
        {!!highlightedDescription && <div className="external-resource__highligted-description">{highlightedDescription}</div>}
      </div>
      <div className="external-resource__footer"><Link href={link}><ExternalLinkIcon color="neutral-darkest" /></Link></div>
    </div>
  )
}
