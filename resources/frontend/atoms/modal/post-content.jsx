import './post-content.css';
import Tag from "#/atoms/tags/tag.jsx";
import React from "react";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Gallery from "#/atoms/gallery/gallery.jsx";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';


export default function PostContent({ post, onPost }) {
  if (!post) {
    return null;
  }


  return (
    <div className="post-content">
      <div className="post__meta">
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
          {(post?.tags ?? ['Спорт', 'Культура', 'Машины']).map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
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
      {post?.relatedPosts && post.relatedPosts.length > 0 && (
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
                onPost={onPost}
                url={related.url}
                date={related.published_at}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
