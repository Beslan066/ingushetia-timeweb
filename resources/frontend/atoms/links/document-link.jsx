import './document-link.css'
import { Link } from "@inertiajs/react";
import ChevronRightIcon from "#/atoms/icons/chevron-right.jsx";

export default function DocumentLink({ title, link, type }) {
  return (
    <div className="document-link__wrapper">
      <div className="document-link__info">
        <div className="document-link__title">{ title }</div>
        <div className="document-link__category">{ type }</div>
      </div>
      <div className="document-link__teleport">
        <Link to={ link }>
          <ChevronRightIcon color="neutral-dark"/>
        </Link>
      </div>
    </div>
  )
}
