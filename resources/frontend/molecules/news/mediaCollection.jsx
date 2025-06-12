import MediaNews from "#/atoms/news/media.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import './media.css'
import React from "react";
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
    if (!slides) return null;
    const arr = JSON.parse(slides);
    return arr.length ? arr.length + ' фото' : null;
  };

  const [slide, isOpen, setSlide] = useModal(null);

  const formatDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return '';
    try {
      const isoDateStr = dateStr.includes(' ') ? dateStr.replace(' ', 'T') : dateStr;
      const date = parseISO(isoDateStr);
      if (isNaN(date.getTime())) return '';

      const now = new Date();
      const currentYearStart = startOfYear(now);
      const currentYearEnd = endOfYear(now);

      const isCurrentYear = isWithinInterval(date, {
        start: currentYearStart,
        end: currentYearEnd
      });

      return isCurrentYear
        ? format(date, 'dd MMM, HH:mm', { locale: ru })
        : format(date, 'dd MMM yyyy', { locale: ru });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <div className="media">
      <div className="media__wrapper">
        {media.map((item) => {
          const type = item.type === 'video' ? 'video' : 'gallery';
          const slides = type === 'gallery' ? getSlidesCount(item?.slides) : null;

          return (
            <MediaNews
              key={item.id}
              id={item.id}
              type={type}
              title={item.title}
              count={slides}
              date={item.published_at}
              image={item.image_main}
              video={item.video}
              handleOpen={() => setSlide(item)}
            />
          );
        })}
      </div>
      <AppLink to="/media" title="Все репортажи" className="media__details"/>

      <Modal
        breadcrumbs={[
          { title: 'Главная' },
          { title: 'Репортажи и видео' },
          { title: slide?.title }
        ]}
        isOpen={isOpen}
        handleClose={() => setSlide(null)}
      >
        <ReportageContent reportage={slide}/>
      </Modal>
    </div>
  );
}
