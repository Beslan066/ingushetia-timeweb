import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import SearchIcon from "#/atoms/icons/search.jsx";
import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Button from "#/atoms/buttons/button.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import './results.css';
import FilterButton from "#/atoms/filters/filter-button.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import axios from "axios";

export default function Results() {
  const { query, initialResults } = usePage().props;
  const [results, setResults] = useState(initialResults || {});
  const [activeFilter, setActiveFilter] = useState(null);
  const [visibleCount, setVisibleCount] = useState(11);
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [inputQuery, setInputQuery] = useState(query);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    axios.get(route('search.index', { query: query.trim().toLowerCase() }))
      .then(response => {
        setResults({
          news: response.data.news || [],
          documents: response.data.documents || [],
          videos: response.data.videos || [],
          photoReportages: response.data.photoReportages || []
        });
      })
      .catch(console.error);
  }, [query]);

  const filteredResults = useMemo(() => {
    if (!activeFilter || activeFilter === 'all') {
      // Используем общий отсортированный список
      return results.all || [];
    }
    return results[activeFilter] || [];
  }, [results, activeFilter]);

  const filterResults = (category) => {
    setActiveFilter(category);
    setVisibleCount(11);
  };

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 11);
  };

  // Функция для получения названия категории
  const getCategoryTitle = (category) => {
    if (!category) return 'Новость';
    if (typeof category === 'object') {
      return category.title || category.name || 'Новость';
    }
    return category;
  };

  // Обработчик открытия поста
  const handlePost = (post) => {
    setIsLoading(true);

    // Если у поста есть все данные - открываем сразу
    if (post.content && post.category) {
      setCurrentPost(post);
      setIsModalOpen(true);
      setIsLoading(false);
      window.history.pushState({}, "", `/post/${post.url}`);
      return;
    }

    // Ищем полную версию поста в результатах
    const allResults = Object.values(results).flat();
    const fullPost = allResults.find(r => r.id === post.id && r.content);

    if (fullPost) {
      setCurrentPost(fullPost);
      setIsModalOpen(true);
      setIsLoading(false);
      window.history.pushState({}, "", `/post/${post.url}`);
      return;
    }

    // Если не нашли, используем то что есть
    setCurrentPost(post);
    setIsModalOpen(true);
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    // Возвращаемся на страницу результатов поиска
    window.history.pushState({}, "", `/search/page?query=${query}`);
  };

  const tabs = [
    { title: 'Все', id: 'all' },
    { title: 'Новости', id: 'news' },
    { title: 'Документы', slug: 'documents' },
    { title: 'Видео', id: 'videos' },
    { title: 'Фоторепортажи', id: 'photoReportages' },
  ];

  const getResultLink = (result) => {
    switch(result.category) {
      case 'Новость': return `/news/${result.slug || result.url}`;
      case 'Документ': return `/documents/${result.id}`;
      case 'Видео': return `/videos/${result.id}`;
      case 'Фоторепортаж': return `/photo-reportages/${result.id}`;
      default: return '#';
    }
  };

  return (
    <>
      <AppHeader />
      <PageTitle title="Результаты поиска" />

      <div className="search search--opened">
        <div className="search-input">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => {
              setInputQuery(e.target.value);
              router.replace(route('search.page', { query: e.target.value }));
            }}
          />
          <SearchIcon color="neutral-dark" size={24} className="input-icon" />
        </div>
        <Button handleClick={() => {
          router.get(route('search.page', { query: inputQuery }));
        }}>
          <span className="search__text">Найти</span>
          <SearchIcon color="neutral-white" size={24} className="search__icon" />
        </Button>
      </div>

      <div className="results__container">
        <Tabs selected={activeFilter} tabs={tabs} onTab={filterResults} />
        <div className="results__count-wrapper">
          <div className="results__count">
            Найдено {filteredResults.length} результатов
          </div>
          <FilterButton isActive={isFiltersOpened} onChange={setFiltersOpened} />
        </div>

        <div className="results__wrapper">
          <div className="results">
            {filteredResults.length > 0 ? (
              filteredResults.slice(0, visibleCount).map((result, index) => (
                <div className="result" key={result.id || index}>
                  <Link
                    className="result__title"
                    href={getResultLink(result)}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePost(result);
                    }}
                  >
                    {result.title}
                  </Link>
                  <div className="result__footer">
                    <div className="result__date">
                      {new Date(result.created_at || result.published_at).toLocaleDateString()}
                    </div>
                    <div className="result__category">
                      {getCategoryTitle(result.category)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4>К сожалению, ничего не найдено</h4>
            )}
          </div>
        </div>

        {visibleCount < filteredResults.length && (
          <button onClick={loadMore} className="infinite-scroll-button">
            Показать еще
          </button>
        )}
      </div>

      <AppFooter />

      <Modal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        breadcrumbs={[
          { title: "Поиск", path: `/search/page?query=${query}` },
          { title: currentPost?.title }
        ]}
      >
        {isLoading ? (
          <div className="loading">Загрузка...</div>
        ) : (
          currentPost && <PostContent post={currentPost} />
        )}
      </Modal>
    </>
  );
}
