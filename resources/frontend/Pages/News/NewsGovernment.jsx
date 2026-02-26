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
import NewsNavigation from "#/molecules/navigation/news-navigation.jsx";

const handleSpotlight = (id, spotlights, setSlide) => {
  const cur = spotlights.find(s => s.id === id);
  setSlide(cur ?? undefined);
};

const getSlidesCount = (slides) => {
  if (!slides) return null;
  const arr = JSON.parse(slides);
  return arr.length ? arr.length + ' фото' : null;
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
                                         currentAgency // Добавляем параметр для определения текущего агентства
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
  const [isModalOpen, setIsModalOpen] = useState(!!props.showNews);
  const [currentPost, setCurrentPost] = useState(props.showNews || null);

  const scrollPositionRef = useRef(0);
  const currentPageRef = useRef(pageNumber);

  // Определяем базовый путь в зависимости от агентства
  const basePath = currentAgency === 5 ? '/news/administration' : '/news/government';

  // Количество записей на странице
  const itemsPerPage = 12;

  // Обновление мета-тегов
  useEffect(() => {
    const agencyName = currentAgency === 5 ? 'Администрации Главы' : 'Правительства';
    const title = currentPage > 1
      ? `Новости ${agencyName} - страница ${currentPage}`
      : `Новости ${agencyName}`;

    document.title = title;
  }, [currentPage, currentAgency]);

  // Переключение между агентствами
  const switchAgency = (agencyId) => {
    const path = agencyId === 5 ? '/news/administration' : '/news/government';
    router.visit(path, {
      preserveScroll: false,
      preserveState: false,
    });
  };

  // Обработчик изменения категории
  const onCategorySwitch = useCallback((categoryId) => {
    const newCategory = categoryId !== null ? String(categoryId) : null;
    setSelectedCategory(newCategory);

    setIsLoading(true);

    router.visit(basePath, {
      method: 'get',
      data: {
        page: 1,
        category: newCategory,
        ...filters
      },
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);
        currentPageRef.current = data.page;

        const searchParams = new URLSearchParams();
        if (newCategory) searchParams.set('category', newCategory);
        if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
        if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
        window.history.pushState({}, "", `${basePath}?${searchParams.toString()}`);
      },
      onFinish: () => setIsLoading(false),
    });
  }, [filters, basePath]);

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

    const searchParams = new URLSearchParams();
    if (selectedCategory) searchParams.set('category', selectedCategory);
    if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
    if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
    searchParams.set('page', currentPageRef.current);

    const newUrl = `${basePath}?${searchParams.toString()}`;
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

  const handlePageChange = useCallback((page) => {
    if (isLoading || page === currentPage) return;

    setIsLoading(true);
    currentPageRef.current = page;

    const requestData = { page };

    if (selectedCategory) requestData.category = selectedCategory;
    if (filters?.dateFrom) requestData.dateFrom = filters.dateFrom;
    if (filters?.dateTo) requestData.dateTo = filters.dateTo;

    router.visit(basePath, {
      method: 'get',
      data: requestData,
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);

        const searchParams = new URLSearchParams();
        if (selectedCategory) searchParams.set('category', selectedCategory);
        if (filters?.dateFrom) searchParams.set('dateFrom', filters.dateFrom);
        if (filters?.dateTo) searchParams.set('dateTo', filters.dateTo);
        searchParams.set('page', data.page);
        window.history.replaceState({}, "", `${basePath}?${searchParams.toString()}`);

        setTimeout(() => {
          document.getElementById('news-feed-start')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      onError: (errors) => {
        console.error('Page change error:', errors);
        setIsLoading(false);
      },
      onFinish: () => setIsLoading(false),
    });
  }, [isLoading, currentPage, selectedCategory, filters, basePath]);

  useEffect(() => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      setCurrentNews(news);
    }
  }, [pageNumber, news]);

  const onFilters = (dateFrom, dateTo, selected) => {
    const newCategory = selected !== null ? String(selected) : null;
    const newFilters = { dateFrom, dateTo };

    setIsLoading(true);
    setSelectedCategory(newCategory);
    setFilters(newFilters);

    router.visit(basePath, {
      method: 'get',
      data: {
        page: 1,
        category: newCategory,
        ...newFilters
      },
      preserveScroll: true,
      preserveState: false,
      onSuccess: ({ props: data }) => {
        setCurrentNews(data.news);
        setCurrentPage(data.page);
        currentPageRef.current = data.page;

        const searchParams = new URLSearchParams();
        if (newCategory) searchParams.set('category', newCategory);
        if (dateFrom) searchParams.set('dateFrom', dateFrom);
        if (dateTo) searchParams.set('dateTo', dateTo);
        window.history.pushState({}, "", `${basePath}?${searchParams.toString()}`);
      },
      onFinish: () => {
        setIsLoading(false);
        setFiltersOpened(false);
      }
    });
  };

  const agencyName = currentAgency === 5 ? 'Администрация Главы' : 'Правительство';

  return (
    <>
      <Head>
        <title>{currentPage > 1 ? `Новости ${agencyName} - страница ${currentPage}` : meta.title}</title>
        <meta name="description" content={meta.description} />
        {currentPage > 1 && (
          <link rel="canonical" href={`${window.location.origin}${basePath}?page=${currentPage}`} />
        )}
      </Head>
      <AppHeader />
      <div className={'news-hero__news-wrapper news-page-title'}>
        <PageTitle title={`Новости`} />
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
                <Link href={route('news.index')}
                  className={`agency-switcher__btn`}

                >
                  Администрация Главы
                </Link>
                <Link href={route('government.news.index')}
                  className={`agency-switcher__btn active`}
                >
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
