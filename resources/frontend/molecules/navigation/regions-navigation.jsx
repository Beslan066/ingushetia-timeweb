import { Link, usePage } from "@inertiajs/react";
import './regions-navigation.css'


export default function RegionsNavigation() {
  const {component} = usePage()

  return (
    <nav className="regions-nav">
      <ul>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Culture' ? 'active' : ''}` } href="/region">О регионе</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/History' ? 'active' : ''}` } href="/history">История</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Economics' ? 'active' : ''}` } href="/economic">Экономика</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/Municipality' ? 'active' : ''}` } href="/municipality">Муниципальные образования</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/SocialEconomics' ? 'active' : ''}` } href="/social-economic-development">Социально-экономическое развитие</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/NationalProjects' ? 'active' : ''}` } href="/nation-projects">Национальные проекты</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/PresidentImplementations' ? 'active' : ''}` } href="/implementations">Реализация стратегических инициатив Президента РФ</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/MilitarySupport' ? 'active' : ''}` } href="/military-support">Поддержка семей военнослужащих</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Culture/CitizenSupport' ? 'active' : ''}` } href="/economic-support">Поддержка экономики и граждан</Link></li>
      </ul>
    </nav>
  )
}
