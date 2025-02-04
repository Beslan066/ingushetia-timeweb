import { Link, usePage } from "@inertiajs/react";
import './awards.css';

export default function AwardNavigation() {
  const { component, props } = usePage();
  const { awardTypes } = props;

  return (
    <nav className="award-nav">
      <ul>
        {/* Вкладка "Все" */}
        <li>
          <Link
            className={`award-nav__link ${component === 'AwardPolitics/AwardPolitic' && !location.search.includes('type_id') ? 'active' : ''}`}
            href="/award-politic">
            Все
          </Link>
        </li>

        {/* Остальные типы наград */}
        {awardTypes.map((type) => (
          <li key={type.id}>
            <Link
              className={`award-nav__link ${component === 'AwardPolitics/AwardPolitic' && location.search.includes(`type_id=${type.id}`) ? 'active' : ''}`}
              href={`/award-politic?type_id=${type.id}`}>
              {type.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
