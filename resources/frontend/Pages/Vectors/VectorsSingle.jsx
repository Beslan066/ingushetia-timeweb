import React from "react";
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import './vectors.css';
import PopularSpotlights from "#/molecules/spotlights/popular-spotlights.jsx";
import DownloadIcon from "@/Components/DownloadIcon.jsx";
import Checkmark from "#/atoms/icons/checkmark.jsx";
import MilitaryContent from "#/atoms/modal/military-content.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import useModal from "#/hooks/useModal.js";
import { Head, router, usePage } from "@inertiajs/react";

export default function VectorSingle({ vector, news, spotlights, meta = {} }) {
  const { props } = usePage();
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
  };

  // Модальное окно для секций вектора
  const [modal, isModalOpen, setModal] = useModal(null);

  // Модальное окно для новостей из PopularSpotlights
  const [currentPost, setCurrentPost] = React.useState(props.showNews || null);
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(!!props.showNews);

  const scrollPositionRef = React.useRef(0);

  // Обработчик открытия модального окна новости
  const handlePost = (post) => {
    scrollPositionRef.current = window.scrollY;

    router.get(`/news/${post.url}`, {}, {
      preserveScroll: true,
      only: ['showNews', 'spotlights'],
      onSuccess: (page) => {
        setCurrentPost(page.props.showNews);
        setIsPostModalOpen(true);
      }
    });
  };

  // Обработчик клика по новости в PopularSpotlights
  const handlePopularPost = (id) => {
    const post = spotlights.find(item => item.id === id);
    if (post) {
      handlePost(post);
    }
  };

  // Закрытие модального окна новости
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
    setCurrentPost(null);

    // Возвращаем URL к исходному состоянию
    window.history.pushState({}, "", window.location.pathname);

    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  // Эффект для обработки прямой ссылки на новость
  React.useEffect(() => {
    if (props.showNews) {
      setCurrentPost(props.showNews);
      setIsPostModalOpen(true);
    }
  }, [props.showNews]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={false} />
      <PageTitle title={vector.name} />

      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="post__image">
            <img
              src={`/storage/${vector.image_main}`}
              alt={vector.name}
            />
          </div>

          {vector.description &&
            <div dangerouslySetInnerHTML={{ __html: vector.description }} className={'mb-2'}>
            </div>
          }

          <div className="downloadable__documents">
            {vector.sections && vector.sections.map((section) => (
              <div
                className="downloadable"
                style={{justifyContent: 'start'}}
                onClick={() => setModal({
                  title: section.title,
                  content: section.content,
                })}
                key={section.id}
              >
                <div className="vector__checkmark">
                  <Checkmark color="primary-medium" />
                </div>
                <div className="downloadable__info">
                  <div className="downloadable__title">{section.title}</div>
                  <div className="downloadable__description">{section.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-announce-wrapper">
          <PopularSpotlights
            news={spotlights}
            className="spotlight-sidebar--desktop"
            onPost={handlePopularPost}
          />
        </div>
      </div>

      <AppFooter />

      {/* Модальное окно для секций вектора */}
      <Modal
        breadcrumbs={[{ title: 'Векторы развития РИ' }, { title: vector.name }]}
        isOpen={isModalOpen}
        handleClose={() => setModal(null)}
      >
        <MilitaryContent document={modal} />
      </Modal>

      {/* Модальное окно для новостей из PopularSpotlights */}
      <Modal
        breadcrumbs={[
          { title: "Главная" },
          { title: "Новости" },
          { title: currentPost?.title }
        ]}
        isOpen={isPostModalOpen}
        handleClose={handleClosePostModal}  
      >
        {currentPost ? (
          <PostContent post={currentPost} />
        ) : (
          <div>Загрузка...</div>
        )}
      </Modal>
    </>
  );
}
