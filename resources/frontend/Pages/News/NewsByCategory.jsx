import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Head, router, usePage } from "@inertiajs/react";
import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import './news.css';
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import PopularSpotlights from "#/molecules/spotlights/popular-spotlights.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import Pagination from "#/atoms/pagination/pagination.jsx";
import BackToTop from "#/atoms/topButton/BackToTop.jsx";

export default function NewsByCategory({
                                         spotlights,
                                         categories,
                                         page: pageNumber,
                                         pages: totalPages,
                                         total: totalItems = 0,
                                         meta
                                       }) {
  const { props } = usePage();
  const [currentNews, setCurrentNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const scrollPositionRef = useRef(0);
  const currentPageRef = useRef(1);

  // Инициализация данных из props
  useEffect(() => {
    console.log('Initializing with props:', props);
    setCurrentNews(props.news || []);
    setCurrentPage(props.page || 1);
    currentPageRef.current = props.page || 1;
  }, []);

  // Обработка showNews из пропсов
  useEffect(() => {
    console.log('Checking showNews:', props.showNews);
    if (props.showNews) {
      console.log('Opening modal with news:', props.showNews);
      setCurrentPost(props.showNews);
      setIsModalOpen(true);
    }
  }, [props.showNews]);

// Добавьте очистку при размонтировании
  useEffect(() => {
    return () => {
      // Очищаем все при размонтировании компонента
      setIsModalOpen(false);
      setCurrentPost(null);
    };
  }, []);

  // Обработчик клика на новость
  // Обработчик клика на новость
  const handlePost = (post) => {
    scrollPositionRef.current = window.scrollY;
    currentPageRef.current = currentPage;

    // Сохраняем текущую страницу
    sessionStorage.setItem('newsCategoryPage', currentPage);
    const categoryId = window.location.pathname.split('/').pop();
    sessionStorage.setItem('newsCategoryId', categoryId);

    // Используем /post/ в URL как в правительственных новостях
    router.get(`/news-by-category/post/${post.url}`, {}, {
      preserveScroll: true,
      preserveState: false,
      only: ['showNews', 'spotlights', 'news', 'page', 'categoryTitle'],
      onSuccess: (page) => {
        setCurrentPost(page.props.showNews);
        setCurrentNews(page.props.news || []);
        setCurrentPage(page.props.page);
        setIsModalOpen(true);
      }
    });
  };

  // Обработчик популярных новостей
  const handlePopularPost = (postData) => {
    console.log('Handling popular post:', postData);
    const postId = typeof postData === 'object' ? postData.id : postData;
    const post = spotlights.find(item => item.id === postId);
    if (post) {
      handlePost(post);
    }
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    console.log('Closing modal');

    // Сначала закрываем модальное окно
    setIsModalOpen(false);

    // Получаем сохраненные данные
    const savedPage = sessionStorage.getItem('newsCategoryPage') || 1;
    const categoryId = sessionStorage.getItem('newsCategoryId');

    // Очищаем sessionStorage сразу
    sessionStorage.removeItem('newsCategoryPage');
    sessionStorage.removeItem('newsCategoryId');

    if (categoryId && !isNaN(categoryId)) {
      // Используем replace вместо get, чтобы не создавать новую запись в истории
      router.replace(`/news-by-category/${categoryId}`, {
        page: savedPage
      }, {
        preserveScroll: true,
        preserveState: false,
        only: ['news', 'page', 'pages', 'total', 'spotlights', 'categoryTitle'],
        onSuccess: () => {
          // Очищаем пост после успешного возврата
          setCurrentPost(null);

          setTimeout(() => {
            window.scrollTo(0, scrollPositionRef.current);
          }, 0);
        }
      });
    } else {
      // Если нет categoryId, просто очищаем пост
      setCurrentPost(null);
      window.history.pushState({}, "", window.location.pathname);

      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current);
      }, 0);
    }
  };

  // Обработчик смены страницы
  const handlePageChange = useCallback((page) => {
    if (isLoading || page === currentPage) return;

    console.log('Changing page to:', page);
    setIsLoading(true);
    currentPageRef.current = page;

    const categoryId = window.location.pathname.split('/').pop();

    router.get(`/news-by-category/${categoryId}`, {
      page: page,
    }, {
      preserveScroll: true,
      preserveState: false,
      only: ['news', 'page', 'pages', 'total', 'spotlights'],
      onSuccess: ({ props: data }) => {
        console.log('Page change success:', data);
        setCurrentNews(data.news || []);
        setCurrentPage(data.page || 1);

        const url = `/news-by-category/${categoryId}?page=${data.page}`;
        window.history.replaceState({}, "", url);

        setTimeout(() => {
          document.getElementById('news-feed-start')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      onFinish: () => {
        setIsLoading(false);
      },
    });
  }, [isLoading, currentPage]);

  // Количество записей на странице
  const itemsPerPage = 12;

  return (
    <>
      <Head>
        <title>
          {currentPage > 1
            ? `${props.categoryTitle || 'Новости'} - страница ${currentPage}`
            : (meta?.title || props.categoryTitle || 'Новости')}
        </title>
        <meta name="description" content={meta?.description || ''} />
      </Head>

      <AppHeader anniversary={false} />

      <PageTitle title={props.categoryTitle || 'Новости'} />

      <div className="news-hero">
        <div className="news-hero__slider-wrapper">
          {/* Якорь для прокрутки */}
          <div id="news-feed-start"></div>

          {/* Табы категорий */}
          {categories && categories.length > 0 && (
            <div className="tab-row">
              <Tabs
                tabs={categories}
                selected={null}
                onTab={(categoryId) => {
                  if (categoryId) {
                    router.get(`/news-by-category/${categoryId}`);
                  }
                }}
              />
            </div>
          )}

          {/* Список новостей */}
          {currentNews && currentNews.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="news-empty">
              <p>Новости в этой категории отсутствуют</p>
            </div>
          )}

          {/* Индикатор загрузки */}
          {isLoading && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
              <span>Загрузка...</span>
            </div>
          )}
        </div>

        {/* Боковая панель с популярными новостями */}
        <div className="hero-announce-wrapper">
          <PopularSpotlights
            news={spotlights}
            className="spotlight-sidebar--desktop"
            onPost={handlePopularPost}
          />
        </div>
      </div>

      {/* Модальное окно для новости */}
      <Modal
        breadcrumbs={[
          { title: "Главная", href: "/" },
          { title: props.categoryTitle || "Новости", href: `/news-by-category/${window.location.pathname.split('/').pop()}` },
          { title: currentPost?.title || "" }
        ]}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      >
        {currentPost ? (
          <PostContent post={currentPost} />
        ) : (
          <div className="modal-loading">Загрузка...</div>
        )}
      </Modal>

      <AppFooter />
      <BackToTop />
    </>
  );
}
