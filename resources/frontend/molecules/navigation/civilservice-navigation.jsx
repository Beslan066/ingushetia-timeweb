import { Link, usePage } from "@inertiajs/react";
import './awards.css';

export default function CivilserviceNavigation() {
  const { component, props } = usePage();
  const { civilServiceTypes } = props;

  return (
    <nav className="award-nav">
      <ul>
        {/* Вкладка "Все" */}
        <li>
          <Link
            className={`award-nav__link ${component === 'CivilServices/CivilService' && !location.search.includes('type_id') ? 'active' : ''}`}
            href="/civil-service">
            Все
          </Link>
        </li>

        {/* Остальные типы наград */}
        {civilServiceTypes.map((type) => (
          <li key={type.id}>
            <Link
              className={`award-nav__link ${component === 'CivilServices/CivilService' && location.search.includes(`type_id=${type.id}`) ? 'active' : ''}`}
              href={`/civil-service?type_id=${type.id}`}>
              {type.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
