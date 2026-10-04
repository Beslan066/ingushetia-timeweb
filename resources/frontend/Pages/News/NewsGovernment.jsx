import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import './news.css';
import Tabs from "#/atoms/tabs/tabs.jsx";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Filters from "#/molecules/filters/filters.jsx";
import FilterButton from "#/atoms/filters/filter-button.jsx";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import {Head, Link, router, usePage} from "@inertiajs/react";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import PopularSpotlights from "#/molecules/spotlights/popular-spotlights.jsx";
import ReportageContent from "#/atoms/modal/reportage-content.jsx";
import useModal from "#/hooks/useModal.js";
import BackToTop from "#/atoms/topButton/BackToTop.jsx";
import Pagination from "#/atoms/pagination/pagination.jsx";
import MainSlider from "#/molecules/slider/slider.jsx";
import MediaNews from "#/atoms/news/media.jsx";
import AppLink from "#/atoms/buttons/link.jsx";

const handleSpotlight = (id, spotlights, setSlide) => {
  const cur = spotlights.find(s => s.id === id);
  setSlide(cur ?? undefined);
};

const getSlidesCount = (slides) => {
  if (!slides) return null;
  try {
    const arr = JSON.parse(slides);
    return arr.length ? arr.length + ' фото' : null;
  } catch (e) {
    return null;
  }
}

export default function NewsGovernment({
                                         news,
                                         categories,
                                         spotlights,
                                         page: pageNumber,
                                         pages: totalPages,
                                         filters: initialFilters,
                                         meta,
                                         total: totalItems = 0,
                                         currentAgency = 6
                                       }) {
  const { props } = usePage();
  const [selectedCategory, setSelectedCategory] = useState(initialFilters?.category || null);
  const [filters, setFilters] = useState(null);
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [slide, isSlideOpen, setSlide] = useModal(undefined);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [currentNews, setCurrentNews] = useState(news);
  const [reportage, isReportageOpen, setReportage] = useModal(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const scrollPositionRef = useRef(0);
  const currentPageRef = useRef(pageNumber);
  const newsRef = useRef(news);
  const filtersRef = useRef(filters);
  const categoryRef = useRef(selectedCategory);

  // Базовый URL для правительства
  const baseUrl = '/government-news';

  // Обновление мета-тегов
  useEffect(() => {
    const title = currentPage > 1
      ? `Новости Правительства - страница ${currentPage}`
      : 'Новости Правительства';
    document.title = title;
  }, [currentPage]);

  // Синхронизация рефов с состоянием
  useEffect(() => {
    newsRef.current = currentNews;
    filtersRef.current = filters;
    categoryRef.current = selectedCategory;
    currentPageRef.current = currentPage;
  }, [currentNews, filters, selectedCategory, currentPage]);

  // Обработка showNews из пропсов
  useEffect(() => {
    if (props.showNews) {
      console.log('showNews received:', props.showNews);
      if (props.showNews && typeof props.showNews === 'object') {
        setCurrentPost(props.showNews);
        setIsModalOpen(true);
      }
    } else {
      // Если нет showNews, закрываем модалку
      setIsModalOpen(false);
      setCurrentPost(null);
    }
  }, [props.showNews]);

  // Синхронизация с пропсами
  useEffect(() => {
    setCurrentNews(news);
    setCurrentPage(pageNumber);
    // Обновляем рефы при получении новых пропсов
    newsRef.current = news;
    currentPageRef.current = pageNumber;
  }, [news, pageNumber]);

  const handlePost = (post) => {
    scrollPositionRef.current = window.scrollY;

    // Сохраняем текущее состояние
    newsRef.current = currentNews;
    filtersRef.current = filters;
    categoryRef.current = selectedCategory;
    currentPageRef.current = currentPage;

    // Извлекаем только slug из URL если пришел полный URL
    let postSlug = post.url;
    if (postSlug && postSlug.includes('/')) {
      postSlug = postSlug.split('/').pop();
    }

    // Используем правильный URL для новости правительства
    router.visit(`/government-news/${postSlug}`, {
      preserveScroll: true,
      preserveState: true,
      only: ['showNews'],
      onError: (errors) => {
        console.error('Error loading post:', errors);
      }
    });
  };

  const handlePopularPost = (postData) => {
    const postId = typeof postData === 'object' ? postData.id : postData;
    const post = spotlights.find(item => item.id === postId);
    if (post) {
      handlePost(post);
    }
  };

  const handleCloseModal = () => {
    // Просто закрываем модалку, данные уже есть в newsRef
    setIsModalOpen(false);
    setCurrentPost(null);

    // Восстанавливаем позицию скролла
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);

    // Возвращаемся к списку новостей без перезагрузки
    const searchParams = new URLSearchParams();
    if (categoryRef.current) searchParams.set('category', categoryRef.current);
    if (filtersRef.current?.dateFrom) searchParams.set('dateFrom', filtersRef.current.dateFrom);
    if (filtersRef.current?.dateTo) searchParams.set('dateTo', filtersRef.current.dateTo);
    if (currentPageRef.current > 1) searchParams.set('page', currentPageRef.current);

    const newUrl = searchParams.toString() ? `${baseUrl}?${searchParams.toString()}` : baseUrl;
    window.history.replaceState({}, "", newUrl);
  };

  const onCategorySwitch = useCallback((categoryId) => {
    const newCategory = categoryId !== null ? String(categoryId) : null;
    setSelectedCategory(newCategory);
    setIsLoading(true);

    const searchParams = new URLSearchParams();
    if (newCategory) searchParams.set('category', newCategory);
    if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
    if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);

    router.visit(`${baseUrl}?${searchParams.toString()}`, {
      method: 'get',
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);
        currentPageRef.current = data.page;
        newsRef.current = data.news;
      },
      onFinish: () => setIsLoading(false),
    });
  }, [filters]);

  const handlePageChange = useCallback((page) => {
    if (isLoading || page === currentPage) return;

    setIsLoading(true);
    currentPageRef.current = page;

    const searchParams = new URLSearchParams();
    if (selectedCategory) searchParams.set('category', selectedCategory);
    if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
    if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
    searchParams.set('page', page);

    router.visit(`${baseUrl}?${searchParams.toString()}`, {
      method: 'get',
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);
        newsRef.current = data.news;

        setTimeout(() => {
          document.getElementById('news-feed-start')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      onFinish: () => setIsLoading(false),
    });
  }, [isLoading, currentPage, selectedCategory, filters]);

  const onFilters = (dateFrom, dateTo, selected) => {
    const newCategory = selected !== null ? String(selected) : null;
    const newFilters = { dateFrom, dateTo };

    setIsLoading(true);
    setSelectedCategory(newCategory);
    setFilters(newFilters);

    const searchParams = new URLSearchParams();
    if (newCategory) searchParams.set('category', newCategory);
    if (dateFrom) searchParams.set('dateFrom', dateFrom);
    if (dateTo) searchParams.set('dateTo', dateTo);

    router.visit(`${baseUrl}?${searchParams.toString()}`, {
      method: 'get',
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);
        currentPageRef.current = data.page;
        newsRef.current = data.news;
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
        <title>{currentPage > 1 ? `Новости Правительства - страница ${currentPage}` : meta.title}</title>
        <meta name="description" content={meta.description} />
        {currentPage > 1 && (
          <link rel="canonical" href={`${window.location.origin}${baseUrl}?page=${currentPage}`} />
        )}
      </Head>

      <AppHeader />

      <div className="news-hero__news-wrapper news-page-title">
        <PageTitle title="Новости Правительства" />
        <div>
          <FilterButton isActive={isFiltersOpened} onChange={setFiltersOpened} />
        </div>
      </div>

      <div className="news-hero">
        <div className="news-hero__slider-wrapper">
          <div className="news-hero__news-wrapper">
            <div className="news-wrapper">
              <div className="agency-switcher">
                <Link
                  href="/news"
                  className="agency-switcher__btn"
                >
                  Администрация Главы
                </Link>
                <Link
                  href="/government-news"
                  className="agency-switcher__btn active"
                >
                  Правительство
                </Link>
              </div>

              <div className="tab-row">
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

            <div id="news-feed-start"></div>

            <div className="news-feed__wrapper">
              <div className="news-feed">
                {currentNews && currentNews.length > 0 ? (
                  currentNews.map((item) => (
                    <AgencyNewsItem
                      key={item.id}
                      id={item.id}
                      category={item.category?.title}
                      date={item?.published_at}
                      title={item.title}
                      image={item.image_main}
                      onPost={() => handlePost(item)}
                    />
                  ))
                ) : (
                  <div className="no-news">Новости не найдены</div>
                )}
              </div>
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                totalItems={totalItems}
                itemsPerPage={12}
              />
            )}

            {isLoading && (
              <div className="loading-indicator">
                <div className="loading-spinner"></div>
                <span>Загрузка...</span>
              </div>
            )}
          </div>
        </div>

        <div className="hero-announce-wrapper">
          <div className="filter-button-row">
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
        breadcrumbs={[{ title: "Новости Правительства" }, { title: currentPost?.title }]}
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
