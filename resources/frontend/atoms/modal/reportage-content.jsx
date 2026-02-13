import './reportage-content.css';
import React, { useState } from "react";
import { parseReportageSlides } from "#/utilities/slides.js";
import FsLightbox from 'fslightbox-react';
import Tag from "#/atoms/tags/tag.jsx";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Video from "#/atoms/video/video.jsx";

// Функция для форматирования даты с добавлением года
export const format = (date) => {
  const currentYear = new Date().getFullYear();
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  const year = new Date(date).getFullYear();

  if (year !== currentYear) {
    return `${formattedDate}, ${year}`;
  }
  return formattedDate;
};

export default function ReportageContent({ reportage }) {
  if (!reportage) {
    return null;
  }

  const formattedDate = format(reportage.published_at);  // Форматируем дату
  const slides = parseReportageSlides(reportage.slides);

  const [toggle, setToggle] = useState(false);
  const [current, setCurrent] = useState(0);

  // Обновляем слайд, при клике
  const setSlide = (i) => {
    setToggle(!toggle);
    setCurrent(i + 1);
  }

  // Формируем полные URL для fslightbox
  const getFullImageUrl = (slidePath) => {
    // Если путь уже полный URL
    if (slidePath.startsWith('http://') || slidePath.startsWith('https://')) {
      return slidePath;
    }

    // Если путь начинается с '/'
    if (slidePath.startsWith('/')) {
      return slidePath;
    }

    // Добавляем 'storage/' если его нет и путь не начинается с '/'
    if (!slidePath.startsWith('storage/') && !slidePath.startsWith('/')) {
      return `/storage/${slidePath}`;
    }

    return `/${slidePath}`;
  };

  // Создаем массив полных URL для fslightbox
  const lightboxSources = slides.map(slide => getFullImageUrl(slide));

  console.log('Lightbox sources:', lightboxSources); // Для отладки

  return (
    <div className="reportage-content">
      <div className="reportage__meta">
        <div className="reportage-meta__date">{formattedDate}</div>
        <div className="reportage-meta__category">{reportage.category?.title}</div>
      </div>

      <div className="reportage__header">
        <h2 className="reportage__title">{reportage.title}</h2>
      </div>

      <div className="reportage__gallery">
        {
          slides.map((slide, i) => (
            <button key={i} className="photo-item" onClick={() => setSlide(i)}>
              <img
                src={getFullImageUrl(slide)}
                alt={'Слайд ' + i}
                onError={(e) => {
                  console.error('Error loading image:', getFullImageUrl(slide));
                  e.target.style.display = 'none'; // Скрываем битые изображения
                }}
              />
            </button>
          ))
        }
      </div>

      {/* Используем lightboxSources с полными URL вместо slides */}
      <FsLightbox
        toggler={toggle}
        sources={lightboxSources}
        slide={current}
        onOpen={() => console.log('Lightbox opened with sources:', lightboxSources)}
        onClose={() => console.log('Lightbox closed')}
      />

      {reportage.video && <Video video={reportage.video} image={reportage.image_main} />}

      <div className="share__wrapper">
        <div className="share__title">Поделиться:</div>
        <div className="share__buttons">
          <a href="" type="button"><img src="/img/icons/social/telegram (1).png" alt="Telegram" /></a>
          <a href="" type="button"><img src="/img/icons/social/VK.png" alt="VK" /></a>
          <a href="" type="button"><img src="/img/icons/social/ok.png" alt="OK" /></a>
          <a href="" type="button"><img src="/img/icons/social/Whatsapp.png" alt="Whatsapp" /></a>
          <a href="" type="button"><img src="/img/icons/social/Link.png" alt="Link" /></a>
        </div>
      </div>

      {reportage?.relatedPosts ? (
        <div className="related">
          <h2 className="related__title">Смотрите также</h2>
          <div className="related__posts">
            {
              reportage.relatedPosts.map((related) => (
                <AgencyNewsItem
                  title={related.title}
                  image={related.image_main}
                  category={related?.category?.title}
                  id={related.id}
                  key={related.id}
                  date={related.published_at}
                />
              ))
            }
          </div>
        </div>
      ) : ''}
    </div>
  )
}
