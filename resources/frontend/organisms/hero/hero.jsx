import React, { useEffect, useState } from "react";
import { usePage, router } from "@inertiajs/react"; // Важно: используем router вместо Inertia
import MainSlider from "#/molecules/slider/slider.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import News from "#/molecules/news/news.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import Spotlights from "#/molecules/spotlights/spotlights.jsx";
import Important from "#/atoms/important/important.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import "./hero.css";

export default function Hero({ categories, slides, news, showNews }) {
  const { props } = usePage();
  const [isModalOpen, setIsModalOpen] = useState(!!showNews);
  const [currentPost, setCurrentPost] = useState(showNews || null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Логирование для отладки
  useEffect(() => {
    console.log('Selected category:', selectedCategory);
  }, [selectedCategory]);

  const onCategorySwitch = (categoryId) => {
    setSelectedCategory(categoryId !== null ? Number(categoryId) : null);
  };

  // Фильтрация новостей по категории
  const filteredArticles = selectedCategory !== null
    ? news.filter(post => post.category_id === selectedCategory)
    : news;

  // Открытие поста в модальном окне (без перезагрузки)
  const handlePost = (post) => {
    router.get(`/news/${post.url}`, {}, {
      preserveScroll: true,
      only: ['showNews'], // Загружаем только showNews из контроллера
      onSuccess: (page) => {
        setCurrentPost(page.props.showNews); // Обновляем пост
        setIsModalOpen(true); // Открываем модалку
      }
    });
  };

  // Следим за showNews (если пришел с сервера — открываем)
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
    window.history.pushState({}, "", "/"); // Сброс URL (без перезагрузки)
  };

  if (!categories || categories.length === 0) {
    return <div>Нет доступных категорий</div>;
  }

  return (
    <>
      <div className="hero-wrapper">
        <div className="hero__slider-wrapper">
          {/*<MainSlider slides={slides} onPost={handlePost} />*/}
          <div className="news-wrapper">
            <Tabs
              tabs={categories}
              onTab={onCategorySwitch}
              selected={selectedCategory}
            />
            {filteredArticles.length > 0 ? (
              <>
                <News news={filteredArticles.slice(0, 3)} onPost={handlePost} />
                <AppLink to="/news" title="Все новости" />
              </>
            ) : (
              <div>Нет новостей в этой категории</div>
            )}
          </div>
        </div>
        <div className="hero__sidebar-wrapper">
          <Spotlights news={news} onPost={handlePost} />
          <Important />
        </div>
      </div>

      <Modal
        breadcrumbs={[{ title: "Главная" }, { title: "Новости" }, { title: currentPost?.title }]}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      >
        {currentPost ? <PostContent post={currentPost} onPost={handlePost}/> : <div>Загрузка...</div>}
      </Modal>
    </>
  );
}
