import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
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

  // Открытие поста (Inertia.visit меняет URL и передает post)
  const handlePost = (post) => {
    Inertia.visit(`/news/${post.url}`, { preserveScroll: true });
  };

  // Если `showNews` обновился, открываем модалку
  useEffect(() => {
    if (props.showNews) {
      setCurrentPost(props.showNews);
      setIsModalOpen(true);
    }
  }, [props.showNews]);

  // Закрытие модалки (только сброс состояния, без Inertia.visit)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    window.history.pushState({}, "", "/"); // Меняем URL без запроса
  };

  return (
    <>
      <div className="hero-wrapper">
        <div className="hero__slider-wrapper">
          <MainSlider slides={slides} onPost={handlePost} />
          <div className="news-wrapper">
            <Tabs tabs={categories} />
            <News news={news.slice(0, 3)} handlePost={handlePost} />
            <AppLink to="/news" title="Все новости" />
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
        {currentPost ? <PostContent post={currentPost}/> : <div>Загрузка...</div>}
      </Modal>
    </>
  );
}
