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
import { Head, Link, router, usePage } from "@inertiajs/react";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import PopularSpotlights from "#/molecules/spotlights/popular-spotlights.jsx";
import MediaNews from "#/atoms/news/media.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import ReportageContent from "#/atoms/modal/reportage-content.jsx";
import useModal from "#/hooks/useModal.js";
import BackToTop from "#/atoms/topButton/BackToTop.jsx";
import Pagination from "#/atoms/pagination/pagination.jsx";
import NewsNavigation from "#/molecules/navigation/news-navigation.jsx";

const handleSpotlight = (id, spotlights, setSlide) => {
  const cur = spotlights.find(s => s.id === id);
  setSlide(cur ?? undefined);
};

const getSlidesCount = (slides) => {
  if (!slides) return null;
  const arr = JSON.parse(slides);
  return arr.length ? arr.length + ' фото' : null;
};

export default function News({
                               news,
                               categories,
                               spotlights,
                               page: pageNumber,
                               pages: totalPages,
                               filters: initialFilters,
                               meta,
                               total: totalItems = 0
                             }) {
  const { props } = usePage();

  // Инициализируем фильтры из initialFilters, чтобы при загрузке с URL фильтры не терялись
  const [selectedCategory, setSelectedCategory] = useState(initialFilters?.category || null);
  const [filters, setFilters] = useState(
    initialFilters?.dateFrom || initialFilters?.dateTo
      ? { dateFrom: initialFilters.dateFrom || null, dateTo: initialFilters.dateTo || null }
      : null
  );

  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [slide, isSlideOpen, setSlide] = useModal(undefined);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [currentNews, setCurrentNews] = useState(news);
  const [reportage, isReportageOpen, setReportage] = useModal(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(!!props.showNews);
  const [currentPost, setCurrentPost] = useState(props.showNews || null);

  const scrollPositionRef = useRef(0);
  const currentPageRef = useRef(pageNumber);

  const itemsPerPage = 12;

  // Вспомогательная функция: собирает все query-параметры в один объект
  const buildQueryParams = useCallback((overrides = {}) => {
    const params = {};

    const category = overrides.category !== undefined ? overrides.category : selectedCategory;
    const dateFrom = overrides.dateFrom !== undefined ? overrides.dateFrom : filters?.dateFrom;
    const dateTo = overrides.dateTo !== undefined ? overrides.dateTo : filters?.dateTo;

    if (overrides.page !== undefined) params.page = overrides.page;
    if (category) params.category = category;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;

    return params;
  }, [selectedCategory, filters]);

  // Обновление title
  useEffect(() => {
    const title = currentPage > 1
      ? `Новости Ингушетии - страница ${currentPage}`
      : 'Новости Ингушетии';
    document.title = title;
  }, [currentPage]);

  // Синхронизация с пропсами, если пользователь перешел по URL с другими фильтрами
  useEffect(() => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      currentPageRef.current = pageNumber;
    }
    setCurrentNews(news);
  }, [pageNumber, news]);

  // Синхронизация фильтров при изменении initialFilters (например, прямой заход по ссылке)
  useEffect(() => {
    setSelectedCategory(initialFilters?.category || null);
    setFilters(
      initialFilters?.dateFrom || initialFilters?.dateTo
        ? { dateFrom: initialFilters.dateFrom || null, dateTo: initialFilters.dateTo || null }
        : null
    );
  }, [initialFilters?.category, initialFilters?.dateFrom, initialFilters?.dateTo]);

  // Обработчик изменения категории
  const onCategorySwitch = useCallback((categoryId) => {
    const newCategory = categoryId !== null ? String(categoryId) : null;
    setSelectedCategory(newCategory);
    setIsLoading(true);

    const requestData = buildQueryParams({ page: 1, category: newCategory });

    router.visit('/news', {
      method: 'get',
      data: requestData,
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);
        currentPageRef.current = data.page;
      },
      onFinish: () => setIsLoading(false),
    });
  }, [buildQueryParams]);

  const handlePost = (post) => {
    scrollPositionRef.current = window.scrollY;
    currentPageRef.current = currentPage;

    router.get(`/news/${post.url}`, {}, {
      preserveScroll: true,
      only: ['showNews', 'spotlights'],
      onSuccess: (page) => {
        setCurrentPost(page.props.showNews);
        setIsModalOpen(true);
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
    setIsModalOpen(false);
    setCurrentPost(null);

    const params = buildQueryParams({ page: currentPageRef.current });
    const newUrl = `/news?${new URLSearchParams(params).toString()}`;
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

  // Обработчик смены страницы через пагинацию
  const handlePageChange = useCallback((page) => {
    if (isLoading || page === currentPage) {
      return;
    }

    setIsLoading(true);
    currentPageRef.current = page;

    // buildQueryParams автоматически возьмет актуальные selectedCategory и filters
    const requestData = buildQueryParams({ page });

    router.visit('/news', {
      method: 'get',
      data: requestData,
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);
        currentPageRef.current = data.page;

        // Скролл к началу новостей (при желании можно закомментировать)
        setTimeout(() => {
          document.getElementById('news-feed-start')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      onError: (errors) => {
        console.error('Page change error:', errors);
      },
      onFinish: () => setIsLoading(false),
    });
  }, [isLoading, currentPage, buildQueryParams]);

  const onFilters = (dateFrom, dateTo, selected) => {
    const newCategory = selected !== null ? String(selected) : null;
    const newFilters = { dateFrom: dateFrom || null, dateTo: dateTo || null };

    setIsLoading(true);
    setSelectedCategory(newCategory);
    setFilters(newFilters);

    const requestData = buildQueryParams({
      page: 1,
      category: newCategory,
      dateFrom: newFilters.dateFrom,
      dateTo: newFilters.dateTo,
    });

    router.visit('/news', {
      method: 'get',
      data: requestData,
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);
        currentPageRef.current = data.page;
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
        <title>{currentPage > 1 ? `Новости Ингушетии - страница ${currentPage}` : meta.title}</title>
        <meta name="description" content={meta.description} />
        {currentPage > 1 && (
          <link rel="canonical" href={`${window.location.origin}/news?page=${currentPage}`} />
        )}
      </Head>
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
              {/* Переключатель между агентствами */}
              <div className="agency-switcher">
                <Link href={'/news'} className={`agency-switcher__btn active`}>
                  Администрация Главы
                </Link>
                <Link href={route('government.news.index')} className={`agency-switcher__btn`}>
                  Правительство
                </Link>
              </div>
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

            {/* Якорь для прокрутки к началу новостей */}
            <div id="news-feed-start"></div>

            <div id="news-feed-container">
              <div className="news-feed__wrapper">
                <div className="news-feed">
                  {currentNews.map((item) => (
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
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
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