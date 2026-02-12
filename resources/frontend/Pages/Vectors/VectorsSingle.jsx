import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import './vectors.css';
import Tabs from "#/atoms/tabs/tabs.jsx";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Filters from "#/molecules/filters/filters.jsx";
import FilterButton from "#/atoms/filters/filter-button.jsx";
import VectorItem from "#/atoms/vectors/vector-item.jsx";
import {Head, Link, router, usePage} from "@inertiajs/react";
import Modal from "#/atoms/modal/modal.jsx";
import VectorContent from "#/atoms/modal/vector-content.jsx";
import PopularVectors from "#/molecules/vectors/popular-vectors.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import useModal from "#/hooks/useModal.js";
import BackToTop from "#/atoms/topButton/BackToTop.jsx";

const handleSpotlight = (id, spotlights, setSlide) => {
  const cur = spotlights.find(s => s.id === id);
  setSlide(cur ?? undefined);
};

export default function Vectors({
                                  vectors,
                                  categories,
                                  spotlights,
                                  page: pageNumber,
                                  pages: totalPages,
                                  filters: initialFilters,
                                  meta
                                }) {
  const { props } = usePage();
  const [selectedCategory, setSelectedCategory] = useState(initialFilters?.category || null);
  const [filters, setFilters] = useState(null);
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [slide, isSlideOpen, setSlide] = useModal(undefined);
  const [pages, setPages] = useState([{ page: pageNumber, vectors: vectors }]);
  const [paginator, setPaginator] = useState({ page: pageNumber, total: totalPages });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(!!props.showVector);
  const [currentPost, setCurrentPost] = useState(props.showVector || null);

  const visitedPages = pages.map((p) => p.page).sort((a, b) => a - b);
  const prevNotVisitedPage = Math.min(...visitedPages) > 1 ? Math.min(...visitedPages) - 1 : null;
  const nextNotVisitedPage = Math.max(...visitedPages) < paginator.total ? Math.max(...visitedPages) + 1 : null;

  const scrollPositionRef = useRef(0);
  const currentPageRef = useRef(pageNumber);

  // Обработчик изменения категории
  const onCategorySwitch = useCallback((categoryId) => {
    const newCategory = categoryId !== null ? String(categoryId) : null;
    setSelectedCategory(newCategory);

    // Сбрасываем страницы и загружаем первую страницу с новой категорией
    setIsLoading(true);
    setPages([]);

    router.reload({
      method: 'get',
      data: { page: 1, category: newCategory, ...filters },
      preserveScroll: true,
      onSuccess: ({ props: data }) => {
        setPages([{ page: data.page, vectors: data.vectors }]);
        setPaginator({ page: data.page, total: data.pages });
        currentPageRef.current = data.page;

        // Обновляем URL
        const searchParams = new URLSearchParams();
        if (newCategory) searchParams.set('category', newCategory);
        if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
        if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
        window.history.pushState({}, "", `/vectors?${searchParams.toString()}`);
      },
      onFinish: () => setIsLoading(false),
    });
  }, [filters]);

  const handlePost = (post) => {
    scrollPositionRef.current = window.scrollY;
    currentPageRef.current = paginator.page;

    router.get(`/vectors/${post.url}`, {}, {
      preserveScroll: true,
      only: ['showVector', 'spotlights'],
      onSuccess: (page) => {
        setCurrentPost(page.props.showVector);
        setIsModalOpen(true);
      }
    });
  };

  const handlePopularPost = (id) => {
    const post = spotlights.find(item => item.id === id);
    if (post) {
      handlePost(post);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);

    const searchParams = new URLSearchParams();
    if (selectedCategory) searchParams.set('category', selectedCategory);
    if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
    if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
    searchParams.set('page', currentPageRef.current);

    const newUrl = `/vectors?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);

    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  useEffect(() => {
    if (props.showVector) {
      setCurrentPost(props.showVector);
      setIsModalOpen(true);
    }
  }, [props.showVector]);

  const loadPage = useCallback((page, direction) => {
    if (isLoading) return;

    const currentScroll = window.scrollY;
    setIsLoading(true);
    currentPageRef.current = page;

    router.reload({
      method: 'get',
      data: {
        page,
        category: selectedCategory,
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo
      },
      preserveScroll: true,
      onSuccess: ({ props: data }) => {
        const currentPage = { page: data.page, vectors: data.vectors };
        setPaginator({ page: data.page, total: data.pages });

        if (direction === 'prev') {
          setPages((prev) => [currentPage, ...prev]);
          const offset = document.getElementById('vectors-feed-container')?.offsetHeight || 0;
          setTimeout(() => window.scrollTo(0, offset + currentScroll), 0);
        } else {
          setPages((prev) => [...prev, currentPage]);
          setTimeout(() => window.scrollTo(0, currentScroll), 0);
        }

        // Обновляем URL с текущими параметрами
        const searchParams = new URLSearchParams();
        if (selectedCategory) searchParams.set('category', selectedCategory);
        if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
        if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
        searchParams.set('page', data.page);
        window.history.replaceState({}, "", `/vectors?${searchParams.toString()}`);
      },
      onFinish: () => setIsLoading(false),
    });
  }, [isLoading, selectedCategory, filters]);

  const BackToTopFixed = React.useMemo(() => {
    return () => <BackToTop key={currentPageRef.current} />;
  }, [currentPageRef.current]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 500 && nextNotVisitedPage && !isLoading) {
        loadPage(nextNotVisitedPage, 'next');
      }

      if (scrollTop <= 500 && prevNotVisitedPage && !isLoading) {
        loadPage(prevNotVisitedPage, 'prev');
      }

      if (scrollTop <= 100 && paginator.page !== 1) {
        const searchParams = new URLSearchParams();
        if (selectedCategory) searchParams.set('category', selectedCategory);
        if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
        if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
        window.history.replaceState({}, "", `/vectors?${searchParams.toString()}`);

        setPages((prev) => prev.slice(0, 1));
        setPaginator((prev) => ({ ...prev, page: 1 }));
        currentPageRef.current = 1;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadPage, nextNotVisitedPage, prevNotVisitedPage, isLoading, paginator.page, selectedCategory, filters]);

  const onFilters = (dateFrom, dateTo, selected) => {
    const newCategory = selected !== null ? String(selected) : null;
    const newFilters = { dateFrom, dateTo };

    setIsLoading(true);
    setSelectedCategory(newCategory);
    setFilters(newFilters);
    setPages([]);

    router.reload({
      method: 'get',
      data: { page: 1, category: newCategory, ...newFilters },
      onSuccess: ({ props: data }) => {
        setPages([{ page: data.page, vectors: data.vectors }]);
        setPaginator({ page: data.page, total: data.pages });
        currentPageRef.current = data.page;

        // Обновляем URL
        const searchParams = new URLSearchParams();
        if (newCategory) searchParams.set('category', newCategory);
        if (dateFrom) searchParams.set('dateFrom', dateFrom);
        if (dateTo) searchParams.set('dateTo', dateTo);
        window.history.pushState({}, "", `/vectors?${searchParams.toString()}`);
      },
      onFinish: () => {
        setIsLoading(false);
        setFiltersOpened(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader />
      <div className={'vectors-hero__vectors-wrapper vectors-page-title'}>
        <PageTitle title="Векторы" />
        <div>
          <FilterButton isActive={isFiltersOpened} onChange={setFiltersOpened} />
        </div>
      </div>
      <div className="vectors-hero">
        <div className="vectors-hero__slider-wrapper">
          <div className="vectors-hero__vectors-wrapper">
            <div className="vectors-wrapper">
              <div className={'tab-row'}>
                <Tabs
                  tabs={categories}
                  onTab={onCategorySwitch}
                  selected={selectedCategory}
                />
              </div>
            </div>
            <Filters
              isActive={isFiltersOpened}
              onChange={(dateFrom, dateTo) => onFilters(dateFrom, dateTo, selectedCategory)}
              onClose={() => setFiltersOpened(false)}
              initialCategory={selectedCategory}
            />
            <div id="vectors-feed-container">
              {pages.map((page, index) => (
                <React.Fragment key={page.page}>
                  <div className="vectors-feed__wrapper">
                    <div className="vectors-feed">
                      {page.vectors.map((item) => (
                        <VectorItem
                          key={item.id}
                          id={item.id}
                          category={item.category?.title}
                          date={item?.published_at}
                          title={item.title}
                          image={item.image_main}
                          onPost={() => handlePost(item)}
                        />
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            {isLoading && <div className="loading-indicator">Загрузка...</div>}
          </div>
        </div>
        <div className="hero-announce-wrapper">
          <div className={'filter-button-row'}>
            <FilterButton isActive={isFiltersOpened} onChange={setFiltersOpened} />
          </div>
          <PopularVectors
            vectors={spotlights}
            className="vectors-spotlight-sidebar--desktop"
            onPost={handlePopularPost}
          />
        </div>
      </div>

      <Modal
        breadcrumbs={[{ title: 'Векторы' }, { title: slide?.title }]}
        isOpen={isSlideOpen}
        handleClose={() => setSlide(undefined)}
      >
        <VectorContent vector={slide} />
      </Modal>

      <Modal
        breadcrumbs={[{ title: "Главная" }, { title: "Векторы" }, { title: currentPost?.title }]}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      >
        {currentPost ? <VectorContent vector={currentPost} /> : <div>Загрузка...</div>}
      </Modal>

      <AppFooter />
      <BackToTop />
    </>
  );
}
