import './link.css'
import RightArrowIcon from "#/atoms/icons/right-arrow-icon.jsx";
import { Link } from "@inertiajs/react";

export default function AppLink ({ to, title, className, handleClick }) {
  if (!to && handleClick) {
    return <a onClick={ handleClick } className={ "link " + (className ?? '') }>{ title } <RightArrowIcon color="primary-medium" width={40} height={24}/></a>;
  }

  return <Link href={to} className={ "link " + (className ?? '') }>{ title } <RightArrowIcon color="primary-medium" width={40} height={24}/></Link>
}
