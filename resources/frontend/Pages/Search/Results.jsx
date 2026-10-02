import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import SearchIcon from "#/atoms/icons/search.jsx";
import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Button from "#/atoms/buttons/button.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import './results.css';
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import axios from "axios";

// Маппинг id таба -> type, который приходит с бэкенда
const FILTER_TYPE_MAP = {
  news: 'news',
  documents: 'document',
  videos: 'video',
  photoReportages: 'photo',
};

export default function Results() {
  const { query, initialResults } = usePage().props;

  const [results, setResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(11);
  const [inputQuery, setInputQuery] = useState(query || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Загрузка результатов при монтировании и изменении query
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    setActiveFilter('all');
    setVisibleCount(11);

    const sortByDate = (arr) =>
      arr.sort((a, b) => {
        const dateA = new Date(a.published_at || a.created_at);
        const dateB = new Date(b.published_at || b.created_at);
        return dateB - dateA;
      });

    // Если есть initialResults и они не пустые — используем их
    const hasInitial =
      initialResults &&
      Object.values(initialResults).some(arr => arr?.length > 0);

    if (hasInitial) {
      const allResults = sortByDate([
        ...(initialResults.news || []),
        ...(initialResults.photoReportages || []),
        ...(initialResults.videos || []),
        ...(initialResults.documents || []),
      ]);
      setResults(allResults);
      setIsSearching(false);
      return;
    }

    // Иначе — запрос на бэкенд
    axios
      .get(route('search.index', { query: query.trim().toLowerCase() }))
      .then(response => {
        const allResults = sortByDate([
          ...(response.data.news || []),
          ...(response.data.photoReportages || []),
          ...(response.data.videos || []),
          ...(response.data.documents || []),
        ]);
        setResults(allResults);
      })
      .catch(console.error)
      .finally(() => setIsSearching(false));
  }, [query, initialResults]);

  // Фильтрация результатов по активному табу
  const filteredResults = useMemo(() => {
    if (!results.length) return [];
    if (!activeFilter || activeFilter === 'all') return results;

    const type = FILTER_TYPE_MAP[activeFilter];
    if (!type) return results;

    return results.filter(item => item.type === type);
  }, [results, activeFilter]);

  const filterResults = (category) => {
    setActiveFilter(category);
    setVisibleCount(11);
  };

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 11);
  };

  // Название категории для отображения
  const getCategoryTitle = (item) => {
    if (item.category_type) return item.category_type;
    if (item.category) {
      if (typeof item.category === 'object') {
        return item.category.title || item.category.name;
      }
      return item.category;
    }
    return 'Новость';
  };

  // Форматирование даты
  const formatDate = (item) => {
    const dateString = item.published_at || item.created_at;
    if (!dateString) return 'Дата не указана';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Дата не указана';
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'Дата не указана';
    }
  };

  // Ссылка на полную страницу по типу контента
  const getResultLink = (result) => {
    switch (result.type) {
      case 'news':
        return `/news/${result.slug || result.url}`;
      case 'document':
        return `/documents/${result.id}`;
      case 'video':
        return `/videos/${result.id}`;
      case 'photo':
        return `/photo-reportages/${result.id}`;
      default:
        return `/post/${result.url}`;
    }
  };

  // Открытие поста в модальном окне
  const handlePost = (post) => {
    setIsLoading(true);
    setCurrentPost(post);
    setIsModalOpen(true);
    setIsLoading(false);

    if (post.url || post.slug) {
      window.history.pushState({}, "", `/post/${post.url || post.slug}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    window.history.pushState({}, "", `/search/page?query=${query}`);
  };

  const tabs = [
    { title: 'Новости', id: 'news' },
    { title: 'Документы', id: 'documents' },
    { title: 'Видео', id: 'videos' },
    { title: 'Фоторепортажи', id: 'photoReportages' },
  ];

  return (
    <>
      <AppHeader />
      <PageTitle title="Результаты поиска" />

      <div className="search search--opened">
        <div className="search-input">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.get(route('search.page', { query: inputQuery }));
              }
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
            {isSearching
              ? 'Поиск...'
              : `Найдено ${filteredResults.length} результатов`}
          </div>
        </div>

        <div className="results__wrapper">
          <div className="results">
            {isSearching ? (
              <div className="loading-results">Загрузка результатов...</div>
            ) : filteredResults.length > 0 ? (
              filteredResults.slice(0, visibleCount).map((result, index) => (
                <div className="result" key={`${result.type}-${result.id}-${index}`}>
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
                    <div className="result__date">{formatDate(result)}</div>
                    <div className="result__category">
                      {getCategoryTitle(result)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4>К сожалению, ничего не найдено</h4>
            )}
          </div>
        </div>

        {!isSearching && visibleCount < filteredResults.length && (
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
          { title: currentPost?.title },
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
