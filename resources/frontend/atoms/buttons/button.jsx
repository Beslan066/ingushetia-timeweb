import './button.css';

export default function Button ({ handleClick, text, children, severity = 'primary' }) {
  return <button style={{padding: '10px'}} className={ `button button--${severity}` } onClick={ handleClick }>{ text ?? children } </button>
}
