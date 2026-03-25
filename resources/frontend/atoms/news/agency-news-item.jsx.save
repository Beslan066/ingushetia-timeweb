import './agency-item.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale'; // подключаем локаль для русского языка

export default function AgencyNewsItem({ id, date, category, title, image, onPost, url, imageWebp }) {
  const newsDate = new Date(date); // создаём объект Date для работы с датой
  const currentYear = new Date().getFullYear(); // получаем текущий год
  const imageUrl = imageWebp ? `/storage/${imageWebp}` : `/storage/${image}`;


  // Форматируем дату без года, с использованием русской локали
  const formattedDate = format(newsDate, 'HH:mm, d MMMM', { locale: ru });

  // Форматируем дату с добавлением года, если год не текущий
  const displayDate =
    newsDate.getFullYear() === currentYear
      ? formattedDate // если год совпадает с текущим, показываем только дату без года
      : `${formattedDate}, ${newsDate.getFullYear()}`; // иначе добавляем год

  return (
    <a onClick={() => onPost({ id, title, url: url || `/news/${id}` })} className="news-card">
      {image && (
        <div className="news-card__preview">
          <img src={imageUrl} alt={'Изображение новости ' + title} className="slide__image" />
        </div>
      )}

      <div className="news-card__body">
        <div className="news-card__keys">
          <div className="news-card__date">{displayDate}</div>
          <div className="news-card__category">{category}</div>
        </div>

          <div className="news-card__title">{title}</div>
      </div>
    </a>
  );
}
