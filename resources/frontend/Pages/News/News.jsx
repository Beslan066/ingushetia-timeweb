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
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category);
  const [filters, setFilters] = useState(null);
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [slide, isSlideOpen, setSlide] = useModal(undefined);
  const [pages, setPages] = useState([{ page: pageNumber, news: news, media: media }]);
  const [paginator, setPaginator] = useState({ page: pageNumber, total: totalPages });
  const [reportage, isReportageOpen, setReportage] = useModal(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const visitedPages = pages.map((p) => p.page).sort((a, b) => a - b);
  const prevNotVisitedPage = Math.min(...visitedPages) > 1 ? Math.min(...visitedPages) - 1 : null;
  const nextNotVisitedPage = Math.max(...visitedPages) < paginator.total ? Math.max(...visitedPages) + 1 : null;

  const loadPage = useCallback((page, direction) => {
    if (isLoading) return;

    setIsLoading(true);
    router.reload({
      method: 'get',
      data: { page, category: selectedCategory, ...filters },
      preserveScroll: true,
      onSuccess: ({ props: data }) => {
        const currentPage = { page: data.page, news: data.news, media: data.media };
        setPaginator({ page: data.page, total: data.pages });

        if (direction === 'prev') {
          setPages((prev) => [currentPage, ...prev]);
          const offset = document.getElementById('news-feed-container')?.offsetHeight || 0;
          setTimeout(() => window.scrollTo(0, offset), 0);
        } else {
          setPages((prev) => [...prev, currentPage]);
        }

        window.history.replaceState(
          null,
          '',
          `?page=${data.page}${selectedCategory ? `&category=${selectedCategory}` : ''}`
        );
      },
      onFinish: () => setIsLoading(false),
    });
  }, [isLoading, selectedCategory, filters]);

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
        window.history.replaceState(
          null,
          '',
          `?${selectedCategory ? `category=${selectedCategory}` : ''}`
        );
        setPages((prev) => prev.slice(0, 1));
        setPaginator((prev) => ({ ...prev, page: 1 }));
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadPage, nextNotVisitedPage, prevNotVisitedPage, isLoading, paginator.page, selectedCategory]);

  const onFilters = (dateFrom, dateTo, selected) => {
    router.reload({
      method: 'get',
      data: { page: 1, category: selected, dateFrom, dateTo },
      onSuccess: ({ props: data }) => {
        setPages([{ page: data.page, news: data.news, media: data.media }]);
        setPaginator({ page: data.page, total: data.pages });
        setFilters({ dateFrom, dateTo });
        setSelectedCategory(selected);
      }
    });
  };

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
              <Tabs tabs={categories} onTab={onCategorySwitch} selected={selectedCategory} />
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
                          onPost={() => setSlide(item)}
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
