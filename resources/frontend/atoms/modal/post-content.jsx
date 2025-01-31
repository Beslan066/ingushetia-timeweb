import './post-content.css';
import Tag from "#/atoms/tags/tag.jsx";
import React from "react";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Gallery from "#/atoms/gallery/gallery.jsx";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale'; // подключаем локаль для русского языка

export default function PostContent({ post }) {
  if (!post) {
    return null;
  }

  const newsDate = new Date(post.published_at); // создаём объект Date для работы с датой
  const currentYear = new Date().getFullYear(); // получаем текущий год

  // Форматируем дату без года, с использованием русской локали
  const formattedDate = format(newsDate, 'HH:mm, d MMMM', { locale: ru });

  // Форматируем дату с добавлением года, если год не текущий
  const displayDate =
    newsDate.getFullYear() === currentYear
      ? formattedDate // если год совпадает с текущим, показываем только дату без года
      : `${formattedDate}, ${newsDate.getFullYear()}`; // иначе добавляем год

  return (
    <div className="post-content">
      <div className="post__meta">
        <div className="post-meta__date">{displayDate}</div> {/* Выводим отформатированную дату */}
        <div className="post-meta__category">{post.category?.title}</div>
      </div>
      <div className="post__header">
        <h2 className="post__title">{post.title}</h2>
        <div className="post__image">
          <img src={`/storage/${post.image_main}`} alt="" />
          {post.image_description && <div className="image__description">{post.image_description}</div>}
        </div>
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        {post.reportage && <Gallery gallery={post.reportage.slides} />}
      </div>
      <div className="tags__wrapper">
        <div className="tags__title">Теги:</div>
        <div className="tags">
          {(post?.tags ?? ['Спорт', 'Культура', 'Машины']).map((tag) => <Tag key={tag} tag={tag} />)}
        </div>
      </div>
      <div className="share__wrapper">
        <div className="share__title">Поделиться:</div>
        <div className="share__buttons">
          <a href="" type="button"><img src="/img/icons/social/telegram (1).png" alt="" /></a>
          <a href="" type="button"><img src="/img/icons/social/VK.png" alt="" /></a>
          <a href="" type="button"><img src="/img/icons/social/ok.png" alt="" /></a>
          <a href="" type="button"><img src="/img/icons/social/Whatsapp.png" alt="" /></a>
          <a href="" type="button"><img src="/img/icons/social/Link.png" alt="" /></a>
        </div>
      </div>
      {post?.relatedPosts && post.relatedPosts.length && Array.isArray(post.relatedPosts) ? (
        <div className="related">
          <h2 className="related__title">Смотрите также</h2>
          <div className="related__posts">
            {post.relatedPosts.map((related) => (
              <AgencyNewsItem
                title={related.title}
                image={related.image_main}
                category={related?.category?.title}
                id={related.id}
                key={related.id}
                date={related.published_at}
              />
            ))}
          </div>
        </div>
      ) : ''}
    </div>
  );
}
