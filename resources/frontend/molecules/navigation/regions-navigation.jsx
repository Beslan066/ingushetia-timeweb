import { Link, usePage } from "@inertiajs/react";
import './regions-navigation.css'


export default function RegionsNavigation() {
  const {component} = usePage()

  return (
    <nav className="regions-nav">
      <ul>
        <li><Link className={ `regions-nav__link ${ component === 'Region/Region' ? 'active' : ''}` } href="/region">О регионе</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Region/History' ? 'active' : ''}` } href="/history">История</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Region/Economics' ? 'active' : ''}` } href="/economic">Экономика</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Region/Municipality' ? 'active' : ''}` } href="/municipality">Муниципальные образования</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Region/SocialEconomics' ? 'active' : ''}` } href="/social-economic-development">Социально-экономическое развитие</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Region/NationalProjects' ? 'active' : ''}` } href="/nation-projects">Национальные проекты</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Region/PresidentImplementations' ? 'active' : ''}` } href="/implementations">Реализация стратегических инициатив Президента РФ</Link></li>
        <li><Link className={ `regions-nav__link ${ component === 'Region/MilitarySupport' ? 'active' : ''}` } href="/military-support">Поддержка семей военнослужащих</Link></li>
        {/*<li><Link className={ `regions-nav__link ${ component === 'Region/CitizenSupport' ? 'active' : ''}` } href="/economic-support">Поддержка экономики и граждан</Link></li>*/}
      </ul>
    </nav>
  )
}
