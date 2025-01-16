import FilterIcon from "#/atoms/icons/filter.jsx";

export default function FilterButton({ isActive, onChange }) {
  return (
    <button className={ `filter-trigger filter-trigger--${ isActive ? 'opened' : 'closed' }` } onClick={ () => onChange(!isActive) }>
      <FilterIcon size={24} color={ isActive ? 'primary-medium' : 'neutral-dark' } />
    </button>
  )
}
