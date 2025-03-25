import './slide.css';
import { format } from "#/utilities/date.js";

export default function Slide({ title, category, date, image, id, onPost, style, url, imageWebp }) {
  const formattedDate = format(date);
  const imageUrl = imageWebp ? `/storage/${imageWebp}` : `/storage/${image}`;

  return (
    <div className="slide" style={style}>
      <img src={imageUrl} alt={'Изображение новости ' + title} className="slide__image" />
      <div className="slide__info">
        <div className="slide-info__keys">
          <div className="slide-info__date">{ formattedDate }</div>
          <div className="slide-info__category">{ category }</div>
        </div>
        <a onClick={() => onPost({ id, title, url: url || `/news/${id}` })} className="slide-info__title">{ title }</a>
      </div>
    </div>
  )
}
