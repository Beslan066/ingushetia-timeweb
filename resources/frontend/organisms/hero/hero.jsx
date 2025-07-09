import React, { useEffect, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import MainSlider from "#/molecules/slider/slider.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import News from "#/molecules/news/news.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import Spotlights from "#/molecules/spotlights/spotlights.jsx";
import Important from "#/atoms/important/important.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import "./hero.css";

export default function Hero ({
                categories = [],
                slides = [],
                news = [],
                showNews = null,
                spotlights = []
              }) {
  const { props } = usePage();
  const [isModalOpen, setIsModalOpen] = useState(!!showNews);
  const [currentPost, setCurrentPost] = useState(showNews || null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredNews, setFilteredNews] = useState(
    Array.isArray(news) ? news.slice(0, 3) : []
  );
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик смены категории
  const onCategorySwitch = (categoryId) => {
    const newCategory = categoryId !== null ? String(categoryId) : null;
    setSelectedCategory(newCategory);
    setIsLoading(true);

    router.reload({
      method: 'get',
      data: {
        category: newCategory,
        from: 'main_page'
      },
      preserveScroll: true,
      only: ['news'],
      onSuccess: ({ props: data }) => {
        const updatedNews = Array.isArray(data.news) ? data.news : [];
        setFilteredNews(updatedNews.slice(0, 3));

        const searchParams = new URLSearchParams();
        if (newCategory) searchParams.set('category', newCategory);
        window.history.pushState({}, "", `/?${searchParams.toString()}`);
      },
      onFinish: () => setIsLoading(false),
    });
  };

  // Обработчик открытия новости
  const handlePost = (post) => {
    if (!post?.url) return;

    router.get(`/post/${post.url}`, {}, {
      preserveScroll: true,
      onSuccess: () => {
        window.history.pushState({}, "", `/post/${post.url}`);
      }
    });
  };

  // Эффект для обработки открытой новости при загрузке
  useEffect(() => {
    if (props.showNews) {
      setCurrentPost(props.showNews);
      setIsModalOpen(true);
    }
  }, [props.showNews]);

  // Закрытие модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    router.get('/', {}, {
      preserveScroll: true,
      preserveState: true
    });
  };

  // Если нет категорий, показываем заглушку
  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className="hero-error">Нет доступных категорий</div>;
  }

  return (
    <>
      <div className="hero-wrapper">
        <div className="hero__slider-wrapper">
          {/* Слайдер */}
          {Array.isArray(slides) && slides.length > 0 ? (
            <MainSlider slides={slides} onPost={handlePost} />
          ) : (
            <div className="slider-placeholder">Нет главных материалов</div>
          )}

          {/* Блок новостей с табами */}
          <div className="news-wrapper">
            <Tabs
              tabs={categories}
              onTab={onCategorySwitch}
              selected={selectedCategory}
            />

            {isLoading ? (
              <div className="loading-indicator">Загрузка...</div>
            ) : Array.isArray(filteredNews) && filteredNews.length > 0 ? (
              <>
                <News news={filteredNews} onPost={handlePost} />
                <AppLink
                  to={selectedCategory ? `/news?category=${selectedCategory}` : "/news"}
                  title="Все новости"
                />
              </>
            ) : (
              <div className="no-news">Нет новостей в этой категории</div>
            )}
          </div>
        </div>

        {/* Сайдбар */}
        <div className="hero__sidebar-wrapper">
          {Array.isArray(spotlights) && spotlights.length > 0 ? (
            <Spotlights news={spotlights} onPost={handlePost} />
          ) : (
            <div className="spotlights-placeholder">Нет рекомендуемых новостей</div>
          )}
          <Important />
        </div>
      </div>

      {/* Модальное окно с новостью */}
      <Modal
        breadcrumbs={[
          { title: "Главная" },
          { title: "Новости" },
          { title: currentPost?.title || "" }
        ]}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      >
        {currentPost ? (
          <PostContent post={currentPost} onPost={handlePost} />
        ) : (
          <div className="post-loading">Загрузка новости...</div>
        )}
      </Modal>
    </>
  );
};

