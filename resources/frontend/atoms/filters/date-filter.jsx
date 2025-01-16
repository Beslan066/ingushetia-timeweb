import './filters.css';
import { useEffect, useState } from "react";

export default function DateFilter({ placeholder, value, onChange }) {
  const [type, setType] = useState('text');

  useEffect(() => {
    setType(!!value ? 'date' : 'text');
  }, [value])

  return <input className="filter filter--date" type={ type } placeholder={ placeholder } value={ value } onChange={ (e) => onChange(e.target.value) } onFocus={ () => setType('date') } onBlur={ () => { !!value ? setType('date') : setType('text')  } }/>
}
