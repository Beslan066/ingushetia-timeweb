import './vector.css';
import AppLink from "#/atoms/buttons/link.jsx";
import Checkmark from "#/atoms/icons/checkmark.jsx";

export default function VectorItem({ profits, title, route, image }) {
  return (
    <div className="vector">
      <div className="vector__image">
        <img src={ image } alt={ title }/>
      </div>

      <div className="vector__body">
        <h2 className="vector__title">{ title }</h2>
        <div className="vector__profits">
          {
            profits.map((profit) => {
              return (
                <div className="vector__profit-container" key={profit}>
                  <div className="vector__checkmark"><Checkmark color="primary-medium" /></div>
                  <div className={"vector__profit"}>{ profit }</div>
                </div>
              )
            })
          }
        </div>
        <AppLink to={ route } title="Подробнее"/>
      </div>
    </div>
  )
}
