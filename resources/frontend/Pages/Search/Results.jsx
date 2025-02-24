import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import SearchIcon from "#/atoms/icons/search.jsx";
import React, { useEffect, useMemo, useState, useId } from "react";
import { Link, usePage } from "@inertiajs/react";
import Button from "#/atoms/buttons/button.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import './results.css'
import FilterButton from "#/atoms/filters/filter-button.jsx";
import { Inertia } from '@inertiajs/inertia';
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";



export default function Results({post}) {
  const { query } = usePage().props; // Получаем query из URL параметров
  const [results, setResults] = useState({});
  const [activeFilter, setActiveFilter] = useState(null); // Активный фильтр по умолчанию 'all'
  const [visibleCount, setVisibleCount] = useState(11); // Количество отображаемых элементов по умолчанию 11
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [inputQuery, setInputQuery] = useState(query);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(!!post);
  const [currentPost, setCurrentPost] = useState(post || null);





  useEffect(() => {
    if (!query) return;

    axios.get(route('search.index', { query: query.trim().toLowerCase() }))
      .then(response => {
        setResults({
          news: response.data.news,
          documents: response.data.documents,
          videos: response.data.videos,
          photoReportages: response.data.photoReportages
        });
      })
      .catch(console.error);
  }, [query]);

  // Мемоизация отфильтрованных результатов
  const filteredResults = useMemo(() => {
    if (!activeFilter || activeFilter === 'all') {
      return Object.values(results).flat();
    }
    return results[activeFilter] || [];
  }, [results, activeFilter]);

  const filterResults = (category) => {
    setActiveFilter(category); // Меняем активный фильтр при клике
    setVisibleCount(11); // Сбрасываем видимое количество элементов при смене фильтра
  };

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 11); // Увеличиваем видимое количество элементов на 11
  };


  const handlePost = (post) => {
    Inertia.get(route('post.show', {
      url: post.url
    }), {
      // Передаем параметры поиска обратно
      data: {
        search_query: query
      },
      preserveScroll: true
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    window.history.back();
  };


  // Функция для формирования ссылки
  const getResultLink = (result) => {
    switch(result.category) {
      case 'Новость': return `/news/${result.id}`;
      case 'Документ': return `/documents/${result.id}`;
      case 'Видео': return `/videos/${result.id}`;
      case 'Фоторепортаж': return `/photo-reportages/${result.id}`;
      default: return '#';
    }
  };


  const tabs = [
    {title: 'Новости', id: 'news'},
    {title: 'Документы', id: 'documents'},
    {title: 'Видео', id: 'videos'},
    {title: 'Фоторепортажи', id: 'photoReportages'},
  ]

  return (
    <>
      <AppHeader/>
      <PageTitle title="Результаты поиска"/>
      <div className={ `search search--opened` }>
        <div className="search-input">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => {
              setInputQuery(e.target.value);
              // Обновляем URL без перезагрузки страницы
              Inertia.replace(route('search.page', { query: e.target.value }));
            }}
          />
          <SearchIcon color="neutral-dark" size={ 24 } className="input-icon"/>
        </div>
        <Button handleClick={() => {
          Inertia.get(route('search.page', { query: inputQuery }));
        }}>

        <span className="search__text">Найти</span>
          <SearchIcon color="neutral-white" size={ 24 } className="search__icon"/>
        </Button>
      </div>
      <div className="results__container">
        <Tabs selected={activeFilter} tabs={ tabs } onTab={ filterResults }/>
        <div className="results__count-wrapper">
          <div className="results__count">Найдено { Math.min(visibleCount, (filteredResults.length ?? 0)) } результатов</div>
          <FilterButton isActive={ isFiltersOpened } onChange={ setFiltersOpened }/>
        </div>

        <div className="results__wrapper">
          <div className="results">
            {
              filteredResults.length > 0 ? (
                filteredResults.slice(0, visibleCount).map((result, index) => (
                  <div className="result" key={index}>
                    <Link
                      className="result__title"
                      href={getResultLink(result)}
                      onClick={(e) => {
                        e.preventDefault(); // Предотвращаем переход по ссылке
                        handlePost(result);
                      }}
                    >
                      {result.title}
                    </Link>
                  <div className="result__footer">
                    <div className="result__date">{ new Date(result.created_at).toLocaleDateString() }</div>
                    <div className="result__category">{ result.category }</div>
                  </div>
                </div>
              ))
              ) : (
                <h4>К сожалению, ничего не найдено</h4>
              ) }
          </div>
        </div>
        { visibleCount >= filteredResults.length ? '' : (
          <button onClick={ () => loadMore() } className="infinite-scroll-button">Показать еще</button>
        ) }
      </div>
      <AppFooter/>

      <Modal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        breadcrumbs={[
          { title: "Поиск", path: `/search/page?query=${query}` },
          { title: currentPost?.title }
        ]}
      >
        {currentPost && <PostContent post={currentPost} />}
      </Modal>
    </>
  )
}
