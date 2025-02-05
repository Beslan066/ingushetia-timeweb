import MainSlider from "#/molecules/slider/slider.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import './hero.css';
import React, { useEffect, useState } from "react";
import News from "#/molecules/news/news.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import Spotlights from "#/molecules/spotlights/spotlights.jsx";
import Important from "#/atoms/important/important.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import useModal from "#/hooks/useModal.js";


import { Inertia } from '@inertiajs/inertia';

export default function Hero({ categories, slides, news, openedNews }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [slide, isOpen, setSlide] = useModal(openedNews);

  const onCategorySwitch = (category) => {
    setSelectedCategory(category);
  };

  const filteredArticles = selectedCategory
    ? news.filter((post) => post.category_id === selectedCategory).slice(0, 3)
    : news.slice(0, 3);



  const handlePost = (post) => {
    if (post) {
      setSlide(post);
      Inertia.visit(`/post/${post.url}`); // Используем URL вместо ID
    }
  };

  const handleNews = (post) => {
    if (post) {
      setSlide(post);
      Inertia.visit(`/post/${post.url}`); // Используем URL вместо ID
    }
  };

  useEffect(() => {
    if (openedNews) {
      setSlide(openedNews); // Открываем модальное окно, если есть openedNews
    }
  }, [openedNews]);

  return (
    <>
      <div className="hero-wrapper">
        <div className="hero__slider-wrapper">
          <MainSlider slides={slides} onPost={handlePost} />
          <div className="news-wrapper">
            <Tabs tabs={categories} onTab={onCategorySwitch} selected={selectedCategory} />
            <News news={filteredArticles} handlePost={handleNews} />
            <AppLink to="/news" title="Все новости" />
          </div>
        </div>
        <div className="hero__sidebar-wrapper">
          <Spotlights news={news} onPost={handleNews} />
          <Important />
        </div>
      </div>

      <Modal
        breadcrumbs={[{ title: 'Главная' }, { title: 'Новости' }, { title: slide?.title }]}
        isOpen={isOpen}
        handleClose={() => {
          setSlide(false);
          Inertia.visit('/'); // Возвращаемся на главную страницу
        }}
      >
        <PostContent post={slide} />
      </Modal>
    </>
  );
}
