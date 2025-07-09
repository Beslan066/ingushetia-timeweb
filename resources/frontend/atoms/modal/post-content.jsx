import './post-content.css';
import Tag from "#/atoms/tags/tag.jsx";
import React from "react";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Gallery from "#/atoms/gallery/gallery.jsx";
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {Link} from "@inertiajs/react";

const PostContent = ({post, onPost}) => {
  if (!post) {
    return <div className="post-content">Новость не найдена</div>;
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'd MMMM yyyy', { locale: ru });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="post-content printable-content">
      {/* Мета-информация */}
      <div className="post__meta">
        {post.category && (
          <Link
            href={route('posts.by.tag', post.category.id)}
            className="post-meta__link"
          >
            <div className="post-meta__category">
              {post.category.title}
            </div>
          </Link>
        )}
        <div className="post-meta__date">
          {formatDate(post.published_at)}
        </div>
      </div>

      {/* Заголовок и главное изображение */}
      <div className="post__header">
        <h1 className="post__title">{post.title}</h1>

        {post.image_main && (
          <div className="post__image-wrapper">
            <img
              src={`/storage/${post.image_main}`}
              alt={post.title}
              className="post__image-main"
              loading="lazy"
            />
            {post.image_description && (
              <div className="post__image-description">
                {post.image_description}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Основной контент */}
      <div className="post__body">
        {/* Лид новости */}
        {post.lead && (
          <div className="post__lead">
            <p className="post__lead-text">
              <strong>{post.lead}</strong>
            </p>
          </div>
        )}

        {/* Контент в зависимости от типа */}
        <div className="post__content">
          {post.type === 'video' && (
            <div
              className="post__video-embed"
              dangerouslySetInnerHTML={{__html: post.content}}
            />
          )}

          {post.type === 'document' && (
            <div
              className="post__document-content"
              dangerouslySetInnerHTML={{__html: post.content}}
            />
          )}

          {!['video', 'document'].includes(post.type) && (
            <>
              <div
                className="post__text-content"
                dangerouslySetInnerHTML={{__html: post.content}}
              />

              {post.reportage && (
                <div className="post__gallery">
                  <Gallery gallery={post.reportage.slides}/>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Теги */}
      {post.tags?.length > 0 && (
        <div className="post__tags">
          <div className="post__tags-title">Теги:</div>
          <div className="post__tags-list">
            {post.tags.map((tag) => (
              <Tag
                key={tag.id}
                tag={tag.name}
                className="post__tag-item"
              />
            ))}
          </div>
        </div>
      )}

      {/* Похожие новости */}
      {post.relatedPosts?.length > 0 && (
        <div className="post__related">
          <h2 className="post__related-title">Смотрите также</h2>
          <div className="post__related-list">
            {post.relatedPosts.map((related) => (
              <AgencyNewsItem
                key={related.id}
                title={related.title}
                image={related.image_main}
                category={related.category?.title}
                date={related.published_at}
                onPost={() => onPost(related)}
                className="post__related-item"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostContent;
