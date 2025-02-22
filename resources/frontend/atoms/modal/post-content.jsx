import './post-content.css';
import Tag from "#/atoms/tags/tag.jsx";
import React from "react";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Gallery from "#/atoms/gallery/gallery.jsx";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {Link} from "@inertiajs/react";


export default function PostContent({ post, onPost }) {
  if (!post) {
    return null;
  }
// Форматирование даты
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'd MMMM yyyy', { locale: ru });
    } catch {
      return dateString;
    }
  };


  return (
    <div className="post-content">
      <div className="post__meta">
        <Link href={route('posts.by.tag', post.category.id)}>
          <div className="post-meta__category">{post.category?.title}</div>
        </Link>
        <div className="post-meta__date">{formatDate(post.created_at)}</div>
      </div>

      {/* Заголовок и изображение */}
      <div className="post__header">
        <h2 className="post__title">{post.title}</h2>
        {post.image_main && (
          <div className="post__image">
            <img src={`/storage/${post.image_main}`} alt={post.title} />
            {post.image_description && (
              <div className="image__description">{post.image_description}</div>
            )}
          </div>
        )}
      </div>

      {/* Контент с учетом типа */}
      <div className="content">
        {post.type === 'video' && (
          <div className="video-embed" dangerouslySetInnerHTML={{__html: post.content}} />
        )}

        {post.type === 'document' && (
          <div className="document-content" dangerouslySetInnerHTML={{__html: post.content}} />
        )}

        {!['video', 'document'].includes(post.type) && (
          <>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            {post.reportage && <Gallery gallery={post.reportage.slides} />}
          </>
        )}
      </div>

      {/* Теги */}
      <div className="tags__wrapper">
        <div className="tags__title">Теги:</div>
        <div className="tags">
          {post.tags?.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {/* Блок "Смотрите также" */}
      {post.relatedPosts?.length > 0 && (
        <div className="related">
          <h2 className="related__title">Смотрите также</h2>
          <div className="related__posts">
            {post.relatedPosts.map((related) => (
              <AgencyNewsItem
                key={related.id}
                title={related.title}
                image={related.image_main}
                category={related.category?.title}
                date={related.published_at}
                onPost={() => onPost(related)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
