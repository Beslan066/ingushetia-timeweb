import './post-content.css';
import Tag from "#/atoms/tags/tag.jsx";
import React, { useState } from "react";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Gallery from "#/atoms/gallery/gallery.jsx";
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {Link} from "@inertiajs/react";

const PostContent = ({post, onPost}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!post) {
    return <div className="post-content">Новость не найдена</div>;
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'd MMMM yyyy', {locale: ru});
    } catch {
      return dateString;
    }
  };

  // Получаем текущий URL страницы
  const getCurrentUrl = () => {
    return window.location.href;
  };

  // Получаем заголовок для шаринга
  const getShareTitle = () => {
    return post.title || 'Поделиться новостью';
  };

  // Обработчик для Telegram
  const shareToTelegram = (e) => {
    e.preventDefault();
    const url = getCurrentUrl();
    const title = getShareTitle();
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  // Обработчик для VK
  const shareToVK = (e) => {
    e.preventDefault();
    const url = getCurrentUrl();
    const title = getShareTitle();
    const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(vkUrl, '_blank', 'noopener,noreferrer');
  };

  // Обработчик для Odnoklassniki
  const shareToOK = (e) => {
    e.preventDefault();
    const url = getCurrentUrl();
    const okUrl = `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(url)}`;
    window.open(okUrl, '_blank', 'noopener,noreferrer');
  };

  // Обработчик для WhatsApp
  const shareToWhatsApp = (e) => {
    e.preventDefault();
    const url = getCurrentUrl();
    const title = getShareTitle();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Обработчик для копирования ссылки
  const copyLink = async (e) => {
    e.preventDefault();
    const url = getCurrentUrl();

    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Ошибка при копировании:', err);
      // Fallback для старых браузеров
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="post-content printable-content">
      {/* Мета-информация */}
      <div className="post__meta">
        {post.category && (
          <a
            href={`/category/${post.category.id}`}
            className="post-meta__link"
          >
            <div className="post-meta__category">
              {post.category.title}
            </div>
          </a>
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
              src={post.agency_id === 5
                ? '/storage/' + post.image_main
                : '/storage/news/' + post.image_main}
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
          <div className="post__lead" style={{marginTop: '10px'}}>
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

      {/* Блок "Поделиться" с обновленными обработчиками */}
      <div className="post__links">
        <span className="mb-2">Поделиться:</span>
        <div className="share-buttons d-flex align-items-center flex-wrap gap-2">
          <a
            href="#"
            onClick={shareToTelegram}
            type="button"
            title="Поделиться в Telegram"
          >
            <img src="/img/icons/social/telegram (1).png" alt="Telegram"/>
          </a>
          <a
            href="#"
            onClick={shareToVK}
            type="button"
            title="Поделиться ВКонтакте"
          >
            <img src="/img/icons/social/VK.png" alt="VK"/>
          </a>
          <a
            href="#"
            onClick={shareToOK}
            type="button"
            title="Поделиться в Одноклассниках"
          >
            <img src="/img/icons/social/ok.png" alt="OK"/>
          </a>
          <a
            href="#"
            onClick={shareToWhatsApp}
            type="button"
            title="Поделиться в WhatsApp"
          >
            <img src="/img/icons/social/Whatsapp.png" alt="WhatsApp"/>
          </a>
          <a
            href="#"
            onClick={copyLink}
            type="button"
            title="Копировать ссылку"
            style={{ position: 'relative' }}
          >
            <img src="/img/icons/social/Link.png" alt="Копировать ссылку"/>
            {copySuccess && (
              <span style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#333',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                marginBottom: '5px',
                zIndex: 10
              }}>
                Ссылка скопирована!
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Похожие новости */}
      {post.relatedPosts?.length > 0 && (
        <div className="post__related">
          <h2 className="post__related-title">Смотрите также</h2>
          <div className="post__related-list post__related-list_news">
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
