import './mountain-content.css'
import Gallery from "#/atoms/gallery/gallery.jsx";
import React from "react";
import Tag from "#/atoms/tags/tag.jsx";

export default function MountainContent({ mountain }) {
  if (!mountain) {
    return null;
  }

  return (
    <div className="mountain-content printable-content">
      <div className="mountain__body-wrapper">

        <h2 className="mountain-modal__title">{ mountain.title }</h2>
        <div className="mountain-modal__image">
          {mountain.image_main &&
            <img src={ '/storage/' + mountain.image_main } alt={ mountain.title }/>
          }
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          {mountain.image_author &&
            <div className="mountain-image__description">Фото:{ mountain.image_author }</div>
          }
          {mountain.image_description &&
            <div className="mountain-image__description">{ mountain.image_description }</div>
          }
        </div>

        <div className="mountain__properties">
          {mountain.year &&
            <div className="mountain__property">
              <div className="mountain-property__title">Дата начала строительства</div>
              <div className="mountain-property__value">{ mountain.year }</div>
            </div>
          }
          {mountain.location &&
            <div className="mountain__property">
              <div className="mountain-property__title">Расположение</div>
              <div className="mountain-property__value">{ mountain.location }</div>
            </div>
          }
          {mountain.coordinates &&
            <div className="mountain__property">
              <div className="mountain-property__title">Координаты</div>
              <div className="mountain-property__value">{ mountain.coordinates }</div>
            </div>
          }
          {mountain.see_height &&
            <div className="mountain__property">
              <div className="mountain-property__title">Высота над уровнем моря</div>
              <div className="mountain-property__value">{ mountain.see_height }</div>
            </div>
          }
          {mountain.structure &&
            <div className="mountain__property">
              <div className="mountain-property__title">Состав</div>
              <div className="mountain-property__value">{ mountain.structure }</div>
            </div>
          }
        </div>

        {mountain.lead &&
          <p>
            <b>
              {mountain.lead}
            </b>
          </p>
        }
        <div className="mountain-content" dangerouslySetInnerHTML={ { __html: mountain.content } }></div>
        {
          mountain.reportage ? (
            <Gallery gallery={ mountain.reportage.slides }/>
          ) : ''
        }
      </div>
      {/*<div className="tags__wrapper">*/}
      {/*  <div className="tags__title">Теги:</div>*/}
      {/*  <div className="tags">*/}
      {/*    {*/}
      {/*      (mountain?.tags ?? ['Спорт', 'Культура', 'Машины']).map((tag) => <Tag key={ tag } tag={ tag }/>)*/}
      {/*    }*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="share__wrapper">
        <div className="share__title">Поделиться:</div>
        <div className="share__buttons">
          <a href="" type="button"><img src="/img/icons/social/telegram (1).png" alt=""/></a>
          <a href="" type="button"><img src="/img/icons/social/VK.png" alt=""/></a>
          <a href="" type="button"><img src="/img/icons/social/ok.png" alt=""/></a>
          <a href="" type="button"><img src="/img/icons/social/Whatsapp.png" alt=""/></a>
          <a href="" type="button"><img src="/img/icons/social/Link.png" alt=""/></a>
        </div>
      </div>
    </div>
  )
}
