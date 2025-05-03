import { Link, usePage } from "@inertiajs/react";
import './regions-navigation.css'


export default function CultureNavigation() {
  const {component} = usePage()

  return (
    <nav className="regions-nav">
      <ul>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Culture' ? 'active' : ''}` } href="/culture">Духовная культура Ингушей</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Architecture' ? 'active' : ''}` } href="/architecture">Древняя ингушская архитектура</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Folklor' ? 'active' : ''}` } href="/folklore">Ингушский фольклор</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Islam' ? 'active' : ''}` } href="/islam">Ислам в Ингушетии</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Crafts' ? 'active' : ''}` } href="/crafts">Ремесла</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Tools' ? 'active' : ''}` } href="/tools">Орудия труда</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Weapon' ? 'active' : ''}` } href="/weapon">Оружие</Link></li>
        </ul>
    </nav>
  )
}
