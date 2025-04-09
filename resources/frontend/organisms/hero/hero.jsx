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

export default function Hero({ categories, slides, news, showNews }) {
  const { props } = usePage();
  const [isModalOpen, setIsModalOpen] = useState(!!showNews);
  const [currentPost, setCurrentPost] = useState(showNews || null);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const onCategorySwitch = (categoryId) => {
    setSelectedCategory(categoryId !== null ? String(categoryId) : null);
  };

  const filteredArticles = selectedCategory !== null
    ? news.filter(post => String(post.category_id) === String(selectedCategory))
    : news;

  const handlePost = (post) => {
    router.get(`/news/${post.url}`, {}, {
      preserveScroll: true,
      only: ['showNews'],
      onSuccess: (page) => {
        setCurrentPost(page.props.showNews);
        setIsModalOpen(true);
      }
    });
  };

  useEffect(() => {
    if (props.showNews) {
      setCurrentPost(props.showNews);
      setIsModalOpen(true);
    }
  }, [props.showNews]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    window.history.pushState({}, "", "/");
  };

  if (!categories || categories.length === 0) {
    return <div>Нет доступных категорий</div>;
  }

  return (
    <>
      <div className="hero-wrapper">
        <div className="hero__slider-wrapper">
          <MainSlider slides={slides} onPost={handlePost} />
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
