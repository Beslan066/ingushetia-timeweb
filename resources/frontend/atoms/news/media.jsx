import './media.css';
import GalleryIcon from "#/atoms/icons/gallery.jsx";
import PlayIcon from "#/atoms/icons/play.jsx";
import Label from "#/atoms/labels/label.jsx";
import React from "react";
import Video from "#/atoms/video/video.jsx";
import { parseISO, format, isWithinInterval, startOfYear, endOfYear } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function MediaNews({ type = 'gallery', image, title, date, count, id, handleOpen, video }) {
  const formatDate = (dateInput) => {
    if (!dateInput) return '';
    try {
      let dateObj = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
      if (typeof dateInput === 'string') {
        const isoFormatted = dateInput.includes(' ') ? dateInput.replace(' ', 'T') : dateInput;
        dateObj = parseISO(isoFormatted);
        if (isNaN(dateObj.getTime())) dateObj = new Date(dateInput);
      }
      if (isNaN(dateObj.getTime())) return '';

      const now = new Date();
      const currentYearStart = startOfYear(now);
      const currentYearEnd = endOfYear(now);

      const isCurrentYear = isWithinInterval(dateObj, {
        start: currentYearStart,
        end: currentYearEnd
      });

      return isCurrentYear
        ? format(dateObj, 'dd MMM, HH:mm', { locale: ru })
        : format(dateObj, 'dd MMM yyyy', { locale: ru });
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'video'
      ? <PlayIcon className="media-icon" />
      : <GalleryIcon className="media-icon" />;
  };

  return (
    <div className="media-card">
      <div className="media__image" onClick={() => handleOpen()}>
        {type === 'gallery' ? (
          <img src={`/storage/${image}`} alt={title} loading="lazy" />
        ) : (
          <Video video={video} image={image} />
        )}
        <div className="media__icon-wrapper">
          {getTypeIcon(type)}
        </div>
        {!!count && (
          <div className="media__label">
            <Label text={count} />
          </div>
        )}
      </div>
      <div className="media__body">
        <div className="media__title" onClick={() => handleOpen()}>{title}</div>
        {formatDate(date) && (
          <div className="media__date">{formatDate(date)}</div>
        )}
      </div>
    </div>
  );
}
