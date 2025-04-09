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
import { Link, router } from "@inertiajs/react";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import PopularSpotlights from "#/molecules/spotlights/popular-spotlights.jsx";
import MediaNews from "#/atoms/news/media.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import ReportageContent from "#/atoms/modal/reportage-content.jsx";
import useModal from "#/hooks/useModal.js";

const handleSlide = (id, slides, setSlide) => {
  const cur = slides.find(s => s.id === id);
  setSlide(cur ?? undefined);
};

const handleSpotlight = (id, spotlights, setSlide) => {
  const cur = spotlights.find(s => s.id === id);
  setSlide(cur ?? undefined);
};

const getSlidesCount = (slides) => {
  if (!slides) return null;

  const arr = JSON.parse(slides);
  const length = arr.length;
  if (!length) return null;

  return length + ' фото';
};

export default function News({
                               news,
                               categories,
                               media,
                               spotlights,
                               page: pageNumber,
                               pages: totalPages,
                               filters: initialFilters
                             }) {
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category);
  const [filters, setFilters] = useState(null);
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [slide, isSlideOpen, setSlide] = useModal(undefined);
  const [pages, setPages] = useState([{ page: pageNumber, news: news, media: media }]);
  const [paginator, setPaginator] = useState({ page: pageNumber, total: totalPages });
  const [reportage, isReportageOpen, setReportage] = useModal(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  const visitedPages = pages.map((page) => page.page).sort();
  const prevNotVisitedPage = Math.min(visitedPages[0] - 1, paginator.page - 1) > 0
    ? Math.min(visitedPages[0] - 1, paginator.page - 1)
    : null;
  const nextNotVisitedPage = Math.max(visitedPages[visitedPages.length - 1] + 1, paginator.page + 1) <= paginator.total
    ? Math.max(visitedPages[visitedPages.length - 1] + 1, paginator.page + 1)
    : null;

  const loadPage = useCallback((page, direction) => {
    if (isLoading) return;

    setIsLoading(true);
    router.reload({
      method: 'get',
      data: { page: page, category: selectedCategory, ...filters },
      preserveScroll: true,
      onSuccess: ({ props: data }) => {
        setPaginator({ page: data.page, total: data.pages });
        const currentPage = { page: data.page, news: data.news, media: data.media };

        setPages(prevPages => {
          if (direction === 'prev') {
            return [currentPage, ...prevPages];
          } else {
            return [...prevPages, currentPage];
          }
        });

        window.history.replaceState(
          null,
          '',
          `?page=${data.page}${selectedCategory ? `&category=${selectedCategory}` : ''}`
        );
      },
      onFinish: () => {
        setIsLoading(false);
      }
    });
  }, [isLoading, selectedCategory, filters]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      const currentY = window.scrollY;
      setScrollDirection(currentY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentY;

      if (scrollTop + clientHeight >= scrollHeight - 500 && nextNotVisitedPage && !isLoading) {
        loadPage(nextNotVisitedPage, 'next');
      }

      if (scrollTop <= 500 && prevNotVisitedPage && !isLoading) {
        loadPage(prevNotVisitedPage, 'prev');
      }

      if (scrollTop > 1000 && scrollDirection === 'down' && pages.length > 2) {
        setPages(prev => prev.slice(1));
      }

      if (scrollTop < 300 && scrollDirection === 'up' && pages.length > 2) {
        setPages(prev => prev.slice(0, -1));
      }

      // Самый верх — полный сброс
      if (currentY <= 50 && paginator.page !== 1) {
        router.reload({
          method: 'get',
          data: { page: 1, category: selectedCategory, ...filters },
          preserveScroll: true,
          onSuccess: ({ props: data }) => {
            setPaginator({ page: data.page, total: data.pages });
            const currentPage = { page: data.page, news: data.news, media: data.media };
            setPages([currentPage]);
            window.history.replaceState(
              null,
              '',
              `?${selectedCategory ? `category=${selectedCategory}` : ''}`
            );
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextNotVisitedPage, prevNotVisitedPage, isLoading, loadPage, paginator.page, selectedCategory, scrollDirection, pages, filters]);

  const onFilters = (dateFrom, dateTo, selected) => {
    router.reload({
      method: 'get',
      data: { page: 1, category: selected, dateFrom, dateTo },
      onSuccess: ({ props: data }) => {
        setPaginator({ page: data.page, total: data.pages });
        const currentPage = { page: data.page, news: data.news, media: data.media };
        setPages([currentPage]);
        setFilters({ dateFrom, dateTo });
        setSelectedCategory(selected);
      }
    });
  };

  const filteredArticles = selectedCategory !== null
    ? news.filter(post => post.category_id === selectedCategory)
    : news;

  const onCategorySwitch = (categoryId) => {
    setSelectedCategory(categoryId !== null ? Number(categoryId) : null);
  };

  return (
    <>
      <AppHeader />
      <PageTitle title="Новости" />
      <div className="news-hero">
        <div className="news-hero__slider-wrapper">
          <div className="news-hero__news-wrapper">
            <div className="news-wrapper">
              <Tabs
                tabs={categories}
                onTab={onCategorySwitch}
                selected={selectedCategory}
              />
              <FilterButton isActive={isFiltersOpened} onChange={setFiltersOpened} />
            </div>
            <Filters
              isActive={isFiltersOpened}
              onChange={(dateFrom, dateTo) => onFilters(dateFrom, dateTo, selectedCategory)}
              onClose={() => setFiltersOpened(false)}
            />
            <div id="news-feed-container">
              {pages.map((page, index) => (
                <React.Fragment key={page.page}>
                  {index === 0 && (
                    <div className="news-feed">
                      {page.news && page.news.map((item) =>
                        <AgencyNewsItem
                          key={item.id}
                          id={item.id}
                          category={item.category?.title}
                          date={item?.published_at}
                          title={item.title}
                          image={item.image_main}
                          onPost={() => setSlide(item)}
                        />
                      )}
                    </div>
                  )}

                  {index > 0 && (
                    <>
                      {page.media && (
                        <div className="media-feed__wrapper">
                          <div className="media-feed">
                            {page.media.map((item) => {
                              const isVideo = item.hasOwnProperty('video');
                              const slides = isVideo ? null : getSlidesCount(item?.slides);
                              return <MediaNews
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
                            })}
                          </div>
                          {index === pages.length - 1 && (
                            <div className="media-link__wrapper">
                              <AppLink to="/media" title="Все репортажи" />
                            </div>
                          )}
                        </div>
                      )}
                      <div className="news-feed__next-wrapper">
                        <div className="news-feed">
                          {page.news && page.news.map((item) =>
                            <AgencyNewsItem
                              key={item.id}
                              id={item.id}
                              category={item.category?.title}
                              date={item?.published_at}
                              title={item.title}
                              image={item.image_main}
                              onPost={() => setSlide(item)}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
            {isLoading && <div className="loading-indicator">Загрузка...</div>}
          </div>
        </div>
        <div className="hero-announce-wrapper">
          <PopularSpotlights
            news={spotlights}
            className="spotlight-sidebar--desktop"
            onPost={(id) => handleSpotlight(id, spotlights, setSlide)}
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

      <AppFooter />
    </>
  );
}
