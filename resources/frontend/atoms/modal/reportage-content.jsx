import './reportage-content.css'
import React, { useState } from "react";
import { format } from "#/utilities/date.js";
import { parseReportageSlides } from "#/utilities/slides.js";
import FsLightbox from 'fslightbox-react';
import Tag from "#/atoms/tags/tag.jsx";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Video from "#/atoms/video/video.jsx";

export default function ReportageContent({ reportage }) {
  if (!reportage) {
    return null;
  }

  const formattedDate = format(reportage.published_at);
  const slides = parseReportageSlides(reportage.slides);

  const [toggle, setToggle] = useState(false);
  const [current, setCurrent] = useState(0);

  // It's not considering state, it's considering STATE CHANGE.
  // @see https://github.com/banthagroup/fslightbox-react/issues/232#issuecomment-1842269375
  const setSlide = (i) => {
    setToggle(!toggle);
    setCurrent(i + 1);
  }

  return (
    <div className="reportage-content">
      <div className="reportage__meta">
        <div className="reportage-meta__date">{ formattedDate }</div>
        <div className="reportage-meta__category">{ reportage.category?.title }</div>
      </div>

      <div className="reportage__header">
        <h2 className="reportage__title">{ reportage.title }</h2>
      </div>

      <div className="reportage__gallery">
        {
          slides.map((slide, i) => <button key={ slide } className="photo-item" onClick={ () => setSlide(i) }>
            <img src={ slide } alt={ 'Слайд + i' }/></button>)
        }
      </div>

      <FsLightbox toggler={ toggle } sources={ slides } slide={ current }/>

      { reportage.video && <Video video={ reportage.video } image={ reportage.image_main }/> }

      <div className="tags__wrapper">
        <div className="tags__title">Теги:</div>
        <div className="tags">
          {
            (reportage?.tags ?? ['Спорт', 'Культура', 'Машины']).map((tag) => <Tag key={ tag } tag={ tag }/>)
          }
        </div>
      </div>
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
      {
        reportage?.relatedPosts ? (
          <div className="related">
            <h2 className="related__title">Смотрите также</h2>
            <div className="related__posts">
              {
                reportage.relatedPosts.map((related) =>
                  <AgencyNewsItem title={ related.title } image={ related.image_main } category={ related?.category?.title } id={ related.id } key={ related.id } date={ related.published_at }/>)
              }
            </div>
          </div>
        ) : ''
      }
    </div>
  )
}
