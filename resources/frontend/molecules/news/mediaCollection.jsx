import MediaNews from "#/atoms/news/media.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import './media.css'
import React, { useState } from "react";
import Modal from "#/atoms/modal/modal.jsx";
import ReportageContent from "#/atoms/modal/reportage-content.jsx";
import useModal from "#/hooks/useModal.js";
import { parseISO, format, isWithinInterval, startOfYear, endOfYear } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function MediaCollection({ media }) {
  if (!media?.length) {
    return null;
  }

  const getSlidesCount = (slides) => {
    if (!slides) {
      return null;
    }

    const arr = JSON.parse(slides);
    const length = arr.length;
    if (!length) {
      return null;
    }

    return length + ' фото'
  }

  const [slide, isOpen, setSlide] = useModal(null);

  // Форматирование даты
  const formatDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return '';

    try {
      // Заменяем пробел между датой и временем на 'T' для корректного парсинга
      const isoDateStr = dateStr.includes(' ') ? dateStr.replace(' ', 'T') : dateStr;
      const date = parseISO(isoDateStr);

      if (isNaN(date.getTime())) {
        return '';
      }

      const now = new Date();
      const currentYearStart = startOfYear(now);
      const currentYearEnd = endOfYear(now);

      // Проверяем, находится ли дата в текущем году
      const isCurrentYear = isWithinInterval(date, {
        start: currentYearStart,
        end: currentYearEnd
      });

      if (isCurrentYear) {
        // Для текущего года: день, месяц и время
        return format(date, 'dd MMM, HH:mm', { locale: ru });
      } else {
        // Для прошлых лет: день, месяц и год
        return format(date, 'dd MMM yyyy', { locale: ru });
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <div className="media">
      <div className="media__wrapper">
        {
          media.map((item) => {
            const isVideo = item.hasOwnProperty('video');
            const slides = isVideo ? null : getSlidesCount(item?.slides);
            return <MediaNews
              key={item.id}
              id={item.id}
              type={isVideo ? 'video' : 'gallery'}
              title={item.title}
              count={slides}
              date={item.published_at}
              image={item.image_main}
              video={item.video}
              handleOpen={() => setSlide(item)}
            />
          })
        }
      </div>
      <AppLink to="/media" title="Все репортажи" className="media__details"/>

      <Modal breadcrumbs={[{ title: 'Главная' }, { title: 'Репортажи и видео' }, { title: slide?.title }]} isOpen={isOpen} handleClose={() => setSlide(null)}>
        <ReportageContent reportage={slide}/>
      </Modal>
    </div>
  )
}
