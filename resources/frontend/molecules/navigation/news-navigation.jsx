import { Link, usePage } from "@inertiajs/react";
import './regions-navigation.css'


export default function NewsNavigation() {
  const {component} = usePage()

  return (
    <nav className="regions-nav">
      <ul>
        <li><Link className={ `regions-nav__link ${ component === 'News/News' ? 'active' : ''}` } href="/news">Администрация Главы и Правительства</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'News/Government' ? 'active' : ''}` } href="/government-news">Правительство</Link></li>
      </ul>
    </nav>
  )
}
