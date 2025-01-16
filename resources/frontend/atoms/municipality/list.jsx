import './municipality.css';

export default function MunicipalityItem({ active, title, id, onActive }) {
  return <button className={ `municipalities__item ${ active ? 'municipalities__item--active' : '' }` } onClick={ () => onActive(id) }>{ title }</button>
}
