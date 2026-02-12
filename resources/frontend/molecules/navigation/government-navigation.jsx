import { Link, usePage } from "@inertiajs/react";
import './regions-navigation.css'


export default function GovernmentNavigation() {
  const {component} = usePage()

  return (
    <nav className="regions-nav">
      <ul>
        <li>
          <Link className={ `regions-nav__link ${ component === 'Government/Government' ? 'active' : ''}` } href="/government">Правительство</Link>
          {
            component.startsWith('Government/Government') && (
              <ul>
                <li><Link className={ `regions-nav__link ${ component === 'Government/GovernmentStructure' ? 'active' : '' }` } href="/government/structure">Состав правительства</Link></li>
                <li><Link className={ `regions-nav__link ${ component === 'Government/GovernmentAbilities' ? 'active' : '' }` } href="/government/abilities">Полномочия правительства</Link></li>
                {/*<li><Link className={ `regions-nav__link ${ component === 'Government/GovernmentSessions' ? 'active' : '' }` } href="/government/sessions">Заседания правительства</Link></li>*/}
                {/*<li><Link className={ `regions-nav__link ${ component === 'Government/GovernmentPlan' ? 'active' : '' }` } href="/government/plans">План работы правительства</Link></li>*/}
                {/*<li><Link className={ `regions-nav__link ${ component === 'Government/GovernmentColleagues' ? 'active' : '' }` } href="/government/colleagues">Коллегии правительства</Link></li>*/}
              </ul>
            )
          }
        </li>
        {/*<li><Link className={`regions-nav__link ${ component === 'Government/Directories' ? 'active' : ''}`} href="/government/directories">Аппарат правительства</Link></li>*/}
        {/*<li><Link className={ `regions-nav__link ${ component === 'Administration/President' ? 'active' : ''}` } href="/government/structure">Аппарат правительства</Link></li>*/ }
        {/*<li><Link className={ `regions-nav__link ${ component === 'Administration/Projects' ? 'active' : ''}` } href="/government/projects">Проектная деятельность</Link></li>*/}
        {/*<li><Link className={ `regions-nav__link ${ component === 'Administration/GovernmentEntities' ? 'active' : ''}` } href="/government/entities">Органы исполнительной власти</Link></li>*/}
        {/*<li><Link className={ `regions-nav__link ${ component === 'Administration/Work' ? 'active' : ''}` } href="/government/work">Государственная служба</Link></li>*/}
        {/*<li><Link className={ `regions-nav__link ${ component === 'Administration/AntiCorruption' ? 'active' : ''}` } href="/government/anticorruption">Противодействие коррупции</Link></li>*/}
        {/*<li><Link className={ `regions-nav__link ${ component === 'Administration/AntiTerrorism' ? 'active' : ''}` } href="/government/antiterrorism">Противодействие терроризму</Link></li>*/}
        {/*<li><Link className={ `regions-nav__link ${ component === 'Administration/OpenData' ? 'active' : ''}` } href="/government/open-data">Открытые данные</Link></li>*/}
        {/*<li><Link className={ `regions-nav__link ${ component === 'Administration/Review' ? 'active' : ''}` } href="/government/review">Контрольно-надзорная деятельность</Link></li>*/}
      </ul>
    </nav>
  )
}
