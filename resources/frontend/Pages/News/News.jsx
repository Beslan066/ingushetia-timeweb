import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import MainSlider from "#/molecules/slider/slider.jsx";
import './news.css';
import Tabs from "#/atoms/tabs/tabs.jsx";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Filters from "#/molecules/filters/filters.jsx";
import FilterButton from "#/atoms/filters/filter-button.jsx";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import { Link, router, usePage } from "@inertiajs/react";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import PopularSpotlights from "#/molecules/spotlights/popular-spotlights.jsx";
import MediaNews from "#/atoms/news/media.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import ReportageContent from "#/atoms/modal/reportage-content.jsx";
import useModal from "#/hooks/useModal.js";
import BackToTop from "#/atoms/topButton/BackToTop.jsx";

const handleSpotlight = (id, spotlights, setSlide) => {
  const cur = spotlights.find(s => s.id === id);
  setSlide(cur ?? undefined);
};

const getSlidesCount = (slides) => {
  if (!slides) return null;
  const arr = JSON.parse(slides);
  return arr.length ? arr.length + ' фото' : null;
}

export default function News({
                               news,
                               categories,
                               media,
                               spotlights,
                               page: pageNumber,
                               pages: totalPages,
                               filters: initialFilters
                             }) {
  const { props } = usePage();
  const [selectedCategory, setSelectedCategory] = useState(initialFilters?.category || null);
  const [filters, setFilters] = useState(null);
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [slide, isSlideOpen, setSlide] = useModal(undefined);
  const [pages, setPages] = useState([{ page: pageNumber, news: news, media: media }]);
  const [paginator, setPaginator] = useState({ page: pageNumber, total: totalPages });
  const [reportage, isReportageOpen, setReportage] = useModal(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(!!props.showNews);
  const [currentPost, setCurrentPost] = useState(props.showNews || null);

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
        setPages([{ page: data.page, news: data.news, media: data.media }]);
        setPaginator({ page: data.page, total: data.pages });
        currentPageRef.current = data.page;

        // Обновляем URL
        const searchParams = new URLSearchParams();
        if (newCategory) searchParams.set('category', newCategory);
        if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
        if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
        window.history.pushState({}, "", `/news?${searchParams.toString()}`);
      },
      onFinish: () => setIsLoading(false),
    });
  }, [filters]);

  const handlePost = (post) => {
    scrollPositionRef.current = window.scrollY;
    currentPageRef.current = paginator.page;

    router.get(`/news/${post.url}`, {}, {
      preserveScroll: true,
      only: ['showNews', 'spotlights'],
      onSuccess: (page) => {
        setCurrentPost(page.props.showNews);
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

    const newUrl = `/news?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);

    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  useEffect(() => {
    if (props.showNews) {
      setCurrentPost(props.showNews);
      setIsModalOpen(true);
    }
  }, [props.showNews]);

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
        const currentPage = { page: data.page, news: data.news, media: data.media };
        setPaginator({ page: data.page, total: data.pages });

        if (direction === 'prev') {
          setPages((prev) => [currentPage, ...prev]);
          const offset = document.getElementById('news-feed-container')?.offsetHeight || 0;
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
        window.history.replaceState({}, "", `/news?${searchParams.toString()}`);
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
        window.history.replaceState({}, "", `/news?${searchParams.toString()}`);

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
        setPages([{ page: data.page, news: data.news, media: data.media }]);
        setPaginator({ page: data.page, total: data.pages });
        currentPageRef.current = data.page;

        // Обновляем URL
        const searchParams = new URLSearchParams();
        if (newCategory) searchParams.set('category', newCategory);
        if (dateFrom) searchParams.set('dateFrom', dateFrom);
        if (dateTo) searchParams.set('dateTo', dateTo);
        window.history.pushState({}, "", `/news?${searchParams.toString()}`);
      },
      onFinish: () => {
        setIsLoading(false);
        setFiltersOpened(false);
      }
    });
  };

  return (
    <>
      <AppHeader />
      <div className={'news-hero__news-wrapper news-page-title'}>
        <PageTitle title="Новости" />
        <div>
          <FilterButton isActive={isFiltersOpened} onChange={setFiltersOpened} />
        </div>
      </div>
      <div className="news-hero">
        <div className="news-hero__slider-wrapper">
          <div className="news-hero__news-wrapper">
            <div className="news-wrapper">
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
            <div id="news-feed-container">
              {pages.map((page, index) => (
                <React.Fragment key={page.page}>
                  {(index === 0 && page.media?.length > 0) && (
                    <div className="media-feed__wrapper">
                      <div className="media-feed">
                        {page.media.map((item) => {
                          const isVideo = !!item.video;
                          const slides = isVideo ? null : getSlidesCount(item?.slides);
                          return (
                            <MediaNews
                              key={item.id}
                              id={item.id}
                              type={isVideo ? 'video' : 'gallery'}
                              title={item.title}
                              count={slides}
                              date={item.published_at}
                              image={item.image_main}
                              video={item.video}
                              handleOpen={() => setReportage(item)}
                            />
                          );
                        })}
                      </div>
                      <div className="media-link__wrapper">
                        <AppLink to="/media" title="Все репортажи" />
                      </div>
                    </div>
                  )}
                  <div className="news-feed__wrapper">
                    <div className="news-feed">
                      {page.news.map((item) => (
                        <AgencyNewsItem
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
          <PopularSpotlights
            news={spotlights}
            className="spotlight-sidebar--desktop"
            onPost={handlePopularPost}
          />
        </div>
      </div>

      <Modal
        breadcrumbs={[{ title: 'Новости' }, { title: slide?.title }]}
        isOpen={isSlideOpen}
        handleClose={() => setSlide(undefined)}
      >
        <PostContent post={slide} />
      </Modal>

      <Modal
        breadcrumbs={[{ title: 'Новости' }, { title: reportage?.title }]}
        isOpen={isReportageOpen}
        handleClose={() => setReportage(undefined)}
      >
        <ReportageContent reportage={reportage} />
      </Modal>

      <Modal
        breadcrumbs={[{ title: "Главная" }, { title: "Новости" }, { title: currentPost?.title }]}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      >
        {currentPost ? <PostContent post={currentPost} /> : <div>Загрузка...</div>}
      </Modal>

      <AppFooter />
      <BackToTop />
    </>
  );
}