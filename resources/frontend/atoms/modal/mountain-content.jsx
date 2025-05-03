import './mountain-content.css'
import Gallery from "#/atoms/gallery/gallery.jsx";
import React from "react";
import Tag from "#/atoms/tags/tag.jsx";

export default function MountainContent({ mountain }) {
  if (!mountain) {
    return null;
  }

  console.log(mountain)

  return (
    <div className="mountain-content printable-content">
      <div className="mountain__body-wrapper">

        <h2 className="mountain-modal__title">{ mountain.title }</h2>
        <div className="mountain-modal__image">
          <img src={ '/storage/' + mountain.image_main } alt={ mountain.title }/>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div className="mountain-image__description">Фото:{ mountain.image_author }</div>
          <div className="mountain-image__description">{ mountain.image_description }</div>
        </div>

        <div className="mountain__properties">
          <div className="mountain__property">
            <div className="mountain-property__title">Дата начала строительства</div>
            <div className="mountain-property__value">{ mountain.year }</div>
          </div>
          <div className="mountain__property">
            <div className="mountain-property__title">Расположение</div>
            <div className="mountain-property__value">{ mountain.location }</div>
          </div>
          <div className="mountain__property">
            <div className="mountain-property__title">Координаты</div>
            <div className="mountain-property__value">{ mountain.coordinates }</div>
          </div>
          <div className="mountain__property">
            <div className="mountain-property__title">Высота над уровнем моря</div>
            <div className="mountain-property__value">{ mountain.see_height }</div>
          </div>
          <div className="mountain__property">
            <div className="mountain-property__title">Состав</div>
            <div className="mountain-property__value">{ mountain.structure }</div>
          </div>
        </div>
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
