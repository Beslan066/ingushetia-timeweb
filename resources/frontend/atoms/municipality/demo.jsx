import './municipality.css'
import AppLink from "#/atoms/buttons/link.jsx";

export default function MunicipalityDemo({ isOpened = false, isMobile = false, title, image, properties, id, onDetailsClick }) {
  return (
    <div className={ `municipality__detail-wrapper ${ isMobile ? 'municipality__detail-wrapper--mobile' : '' } ${isOpened ? 'municipality__detail-wrapper--opened' : ''}` }>
      <h3 className="detail__title">{ title }</h3>
      <div className="detail__image">
        <img src={'/storage/' + image} alt={ 'Изображение' + title }/>
      </div>
      <div className="detail__properties-wrapper">
        <div className="properties__title-wrapper">
          <h3 className="properties__title-mobile">{ title }</h3>
          <AppLink title="Подробнее" handleClick={ () => onDetailsClick(id) } />
        </div>
        <div className="properties__list">
          {
            properties.map((property) => {
              if (!property.value) {
                return null;
              }

              return (
                <div className={ `property__wrapper property--${property.slug}` } key={property.slug}>
                  <div className="property__title">{ property.title }</div>
                  <div className="property__value">{ property.value }</div>
                </div>
              )
            })
          }
        </div>
        <div className="properties__more">
          <AppLink title="Подробнее" handleClick={ () => onDetailsClick(id) } />
        </div>
      </div>
    </div>
  )
}
