import './filters.css';
import DateFilter from "#/atoms/filters/date-filter.jsx";
import { useState } from "react";
import Button from "#/atoms/buttons/button.jsx";

export default function Filters({ isActive, onChange }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const handleFilter = () => {
    onChange(from, to);
  }

  const handleClear = () => {
    console.log('clearing')
    setFrom('');
    setTo('');
  }


  return (
    <div className={ `filters__wrapper filters__wrapper--${isActive ? 'opened' : 'closed'}` }>
      <div className="filters">
        <div className="filters__date">
          <DateFilter placeholder="Период, с" value={ from } onChange={ (value) => setFrom(value) } />
          -
          <DateFilter placeholder="Период, до" value={ to } onChange={ (value) =>  setTo(value) } />
        </div>
        <div className="filters__action">
          <Button severity="primary" handleClick={ handleFilter } >Применить</Button>
          <Button severity="secondary" handleClick={ handleClear } >Очистить</Button>
        </div>
      </div>
    </div>
  )
}
