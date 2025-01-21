import { Link, usePage } from "@inertiajs/react";
import './regions-navigation.css';

export default function DocumentsNavigation() {
  const { component, props } = usePage();
  const { documentTypes } = props;

  return (
    <nav className="regions-nav">
      <ul>
        {/* Вкладка "Все" */}
        <li>
          <Link
            className={`regions-nav__link ${component === 'Documents/Documents' && !location.search.includes('type_id') ? 'active' : ''}`}
            href="/documents">
            Все
          </Link>
        </li>

        {/* Остальные типы документов */}
        {documentTypes.map((type) => (
          <li key={type.id}>
            <Link
              className={`regions-nav__link ${component === 'Documents/Documents' && location.search.includes(`type_id=${type.id}`) ? 'active' : ''}`}
              href={`/documents?type_id=${type.id}`}>
              {type.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
