import './label.css'

export default function Label({ className, text }) {
  return <div className={ 'label ' + (className ?? '') }>{ text }</div>
}
