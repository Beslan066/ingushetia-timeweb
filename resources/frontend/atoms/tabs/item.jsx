import './tabs.css';

export  default function TabItem({ title, active, id, onTab }) {
  return (
    <button
      className={`tabs__item ${active ? 'tabs__item--active' : ''}`}
      disabled={active}
      onClick={() => onTab(id)}
    >
      {title}
    </button>
  );
}

