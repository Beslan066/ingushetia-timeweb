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
import { Inertia } from '@inertiajs/inertia';

export default function Hero({ categories, slides, news, openedNews }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const onCategorySwitch = (category) => {
    setSelectedCategory(category);
  };

  const filteredArticles = selectedCategory
    ? news.filter((post) => post.category_id === selectedCategory).slice(0, 3)
    : news.slice(0, 3);

  const handlePost = (post) => {
    if (post) {
      Inertia.get(`/news/${post.url}`, {}, {
        only: ['openedNews'],
        onSuccess: (page) => {
          setCurrentPost(page.props.openedNews);
          setIsModalOpen(true);
        }
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
  };

  useEffect(() => {
    if (openedNews) {
      setCurrentPost(openedNews);
      setIsModalOpen(true);
    }
  }, [openedNews]);

  return (
    <>
      <div className="hero-wrapper">
        <div className="hero__slider-wrapper">
          <MainSlider slides={slides} onPost={handlePost} />
          <div className="news-wrapper">
            <Tabs tabs={categories} onTab={onCategorySwitch} selected={selectedCategory} />
            <News news={filteredArticles} handlePost={handlePost} />
            <AppLink to="/news" title="Все новости" />
          </div>
        </div>
        <div className="hero__sidebar-wrapper">
          <Spotlights news={news} onPost={handlePost} />
          <Important />
        </div>
      </div>

      <Modal
        breadcrumbs={[{ title: 'Главная' }, { title: 'Новости' }, { title: currentPost?.title }]}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      >
        <PostContent post={currentPost} />
      </Modal>
    </>
  );
}
