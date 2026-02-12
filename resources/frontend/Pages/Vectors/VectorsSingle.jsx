import React, { useState, useRef } from "react";
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
import useModal from "#/hooks/useModal.js";
import { Head, router } from "@inertiajs/react";

export default function VectorSingle({ vector, news, spotlights, meta = {} }) {
  const [currentPost, setCurrentPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollPositionRef = useRef(0);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
  };

  const handlePost = (post) => {
    if (!post) return;

    scrollPositionRef.current = window.scrollY;

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
    // Используем news вместо spotlights
    const popularNews = news || [];
    const post = popularNews.find(item => item.id === id);
    if (post) {
      handlePost(post);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);

    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  const [modal, isOpen, setModal] = useModal(null);

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
            news={news || []}
            onPost={handlePopularPost}
            className="spotlight-sidebar--desktop"
          />
        </div>
      </div>

      <Modal
        breadcrumbs={[{ title: 'Векторы развития РИ' }, { title: vector.name }]}
        isOpen={isOpen}
        handleClose={() => setModal(null)}
      >
        <MilitaryContent document={modal} />
      </Modal>

      <Modal
        breadcrumbs={[
          { title: "Главная" },
          { title: "Векторы развития РИ" },
          { title: currentPost?.name || currentPost?.title || vector.name }
        ]}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      >
        {currentPost ? <MilitaryContent document={currentPost} /> : <div>Загрузка...</div>}
      </Modal>

      <AppFooter />
    </>
  );
}
