import './municipality-content.css'
import Gallery from "#/atoms/gallery/gallery.jsx";
import React from "react";
import Tag from "#/atoms/tags/tag.jsx";

export default function MunicipalityContent({ municipality }) {
  if (!municipality) {
    return null;
  }

  // Проверка на наличие supervisor
  const hasSupervisor = municipality?.supervisor && Object.keys(municipality.supervisor).length > 0;


  return (
    <div className="municipality-content">
      <div className="municipality__body-wrapper">

        <div className="municipality-modal__body">
          <h2 className="municipality-modal__title">{ municipality.title }</h2>
          <div className="municipality-modal__bio">
            <div className="municipality-modal__logo">
              <img src={ `/storage/${ municipality.arms }` } alt="Герб города Магас"/>
            </div>
            <div className="municipality-modal__bio-content" dangerouslySetInnerHTML={ { __html: municipality.content } }></div>
          </div>

          <div className="municipality-modal__properties">
            <div className="stat-item">
              <p>{ municipality.square }</p>
              <span>Площадь</span>
            </div>
            <div className="stat-item">
              <p>{ municipality.year } г.</p>
              <span>Основан</span>
            </div>
            <div className="stat-item">
              <p>{ municipality.population } чел.</p>
              <span>Население</span>
            </div>
          </div>

          {hasSupervisor && (
            <div className="city-head">
              <div className="head-person-image">
                <img src={`/storage/${municipality.supervisor.image_main}`} alt="" />
              </div>
              <div className="head-person-info">
                <h3>{municipality.supervisor.name}</h3>
                {municipality.supervisor.position && (
                  <span className="supervisor__position">{municipality.supervisor.position}</span>
                )}
                <div className="head-bio" dangerouslySetInnerHTML={{ __html: municipality.supervisor.bio }}></div>
              </div>
            </div>
          )}
        </div>

        {
          <Gallery gallery={ ['/img/content/magas.webp', '/img/content/magas1', '/img/content/magas2', '/img/content/Magas3.jpg', '/img/content/magas4.jpg', '/img/Rectangle 1.png'] }/>
        }
      </div>

      <div className="city-contacts">
        <div className="city-contact">
          <h4>Телефон:</h4>
          <p>{ municipality.phone_number }</p>
        </div>
        {
          !!municipality.fax_number && <div className="city-contact">
            <h4>Факс:</h4>
            <p>{ municipality.fax_number }</p>
          </div>
        }
        <div className="city-contact">
          <h4>Эл.почта</h4>
          <p>{ municipality.email }</p>
        </div>
        <div className="city-contact">
          <h4>Адрес</h4>
          <p>{ municipality.address }</p>
        </div>
      </div>
    </div>
  )
}
