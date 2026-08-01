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
  const [results, setResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [visibleCount, setVisibleCount] = useState(11);
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [inputQuery, setInputQuery] = useState(query);
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

    // Если есть initialResults и они не пустые, используем их
    if (initialResults && Object.values(initialResults).some(arr => arr?.length > 0)) {
      const allResults = [
        ...(initialResults.news || []),
        ...(initialResults.photoReportages || []),
        ...(initialResults.videos || []),
        ...(initialResults.documents || []),
      ];
      // Сортируем по дате
      const sorted = allResults.sort((a, b) => {
        const dateA = new Date(a.published_at || a.created_at);
        const dateB = new Date(b.published_at || b.created_at);
        return dateB - dateA;
      });
      setResults(sorted);
      setIsSearching(false);
      return;
    }

    // Если initialResults пустые, делаем запрос
    axios.get(route('search.index', { query: query.trim().toLowerCase() }))
      .then(response => {
        const allResults = [
          ...(response.data.news || []),
          ...(response.data.photoReportages || []),
          ...(response.data.videos || []),
          ...(response.data.documents || []),
        ];
        // Сортируем по дате
        const sorted = allResults.sort((a, b) => {
          const dateA = new Date(a.published_at || a.created_at);
          const dateB = new Date(b.published_at || b.created_at);
          return dateB - dateA;
        });
        setResults(sorted);
      })
      .catch(console.error)
      .finally(() => setIsSearching(false));
  }, [query, initialResults]);

  // Фильтрация результатов
  const filteredResults = useMemo(() => {
    if (!results.length) return [];

    if (!activeFilter || activeFilter === 'all') {
      return results;
    }

    // Фильтруем по типу
    return results.filter(item => {
      switch(activeFilter) {
        case 'news': return item.type === 'news' || item.category_type === 'Новость';
        case 'documents': return item.type === 'document' || item.category_type === 'Документ';
        case 'videos': return item.type === 'video' || item.category_type === 'Видео';
        case 'photoReportages': return item.type === 'photo' || item.category_type === 'Фоторепортаж';
        default: return true;
      }
    });
  }, [results, activeFilter]);

  const filterResults = (category) => {
    setActiveFilter(category);
    setVisibleCount(11);
  };

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 11);
  };

  // Функция для получения названия категории
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
    const fullPost = results.find(r => r.id === post.id && r.content);

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
    switch(result.type || result.category_type) {
      case 'news':
      case 'Новость':
        return `/news/${result.slug || result.url}`;
      case 'document':
      case 'Документ':
        return `/documents/${result.id}`;
      case 'video':
      case 'Видео':
        return `/videos/${result.id}`;
      case 'photo':
      case 'Фоторепортаж':
        return `/photo-reportages/${result.id}`;
      default:
        return `/post/${result.url}`;
    }
  };

  // Проверяем, есть ли результаты
  const hasResults = results.length > 0;

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
              // Обновляем URL при вводе
              router.replace(route('search.page', { query: e.target.value }));
            }}
            onKeyPress={(e) => {
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
            {isSearching ? 'Поиск...' : `Найдено ${filteredResults.length} результатов`}
          </div>
          <FilterButton isActive={isFiltersOpened} onChange={setFiltersOpened} />
        </div>

        <div className="results__wrapper">
          <div className="results">
            {isSearching ? (
              <div className="loading-results">Загрузка результатов...</div>
            ) : filteredResults.length > 0 ? (
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
                      {new Date(result.published_at || result.published_at).toLocaleDateString()}
                    </div>
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
