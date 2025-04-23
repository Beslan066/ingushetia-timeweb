import './media.css';
import GalleryIcon from "#/atoms/icons/gallery.jsx";
import Label from "#/atoms/labels/label.jsx";
import React from "react";
import Video from "#/atoms/video/video.jsx";
import { parseISO, format, isWithinInterval, startOfYear, endOfYear } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function MediaNews({ type = 'gallery', image, title, date, count, id, handleOpen, video }) {
  const formatDate = (dateInput) => {
    if (!dateInput) return '';

    try {
      // Если дата уже в формате Date, используем как есть
      let dateObj = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;

      // Если это строка, пробуем разные форматы
      if (typeof dateInput === 'string') {
        // Пробуем заменить пробел на 'T' для ISO формата
        const isoFormatted = dateInput.includes(' ')
          ? dateInput.replace(' ', 'T')
          : dateInput;

        dateObj = parseISO(isoFormatted);

        // Если не получилось, пробуем разобрать как есть
        if (isNaN(dateObj.getTime())) {
          dateObj = new Date(dateInput);
        }
      }

      // Проверяем валидность даты
      if (isNaN(dateObj.getTime())) {
        console.warn('Invalid date:', dateInput);
        return '';
      }

      const now = new Date();
      const currentYearStart = startOfYear(now);
      const currentYearEnd = endOfYear(now);

      // Проверяем текущий ли год
      const isCurrentYear = isWithinInterval(dateObj, {
        start: currentYearStart,
        end: currentYearEnd
      });

      return isCurrentYear
        ? format(dateObj, 'dd MMM, HH:mm', { locale: ru }) // Текущий год: "10 апр, 19:00"
        : format(dateObj, 'dd MMM yyyy', { locale: ru });  // Прошлые годы: "10 апр 2024"
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'gallery':
        return <GalleryIcon/>;
      case 'video':
        return null;
      default:
        throw new Error('type должен быть определен');
    }
  }

  return (
    <div className="media-card">
      <div className="media__image">
        {type === 'gallery' ? (
          <img src={`/storage/${image}`} alt={`Изображение ${title}`} />
        ) : (
          <Video video={video} image={image} />
        )}
        <div className="media__icon-wrapper">
          {getTypeIcon(type)}
        </div>
        {!!count && (
          <a onClick={() => handleOpen(id)} className="media__label">
            <Label text={count} />
          </a>
        )}
      </div>
      <div className="media__body">
        <a onClick={() => handleOpen(id)} className="media__title">{title}</a>
        {formatDate(date) && (
          <div className="media__date">{formatDate(date)}</div>
        )}
      </div>
    </div>
  )
}
