import MediaNews from "#/atoms/news/media.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import './media.css'
import React, { useState } from "react";
import Modal from "#/atoms/modal/modal.jsx";
import ReportageContent from "#/atoms/modal/reportage-content.jsx";
import useModal from "#/hooks/useModal.js";

export default function MediaCollection({ media }) {
  if (!media?.length) {
    return null;
  }

  const getSlidesCount = (slides) => {
    if (!slides) {
      return null;
    }

    const arr = JSON.parse(slides);
    const length = arr.length;
    if (!length) {
      return null;
    }

    return length + ' фото'
  }

  const [slide, isOpen, setSlide] = useModal(null);

  return (
    <div className="media">
      <div className="media__wrapper">
        {
          media.map((item) => {
            const isVideo = item.hasOwnProperty('video');
            const slides = isVideo ? null : getSlidesCount(item?.slides);
            return <MediaNews key={ item.id }
                              id={ item.id }
                              type={ isVideo ? 'video' : 'gallery' }
                              title={ item.title }
                              count={ slides }
                              date={ item.published_at }
                              image={ item.image_main }
                              video={ item.video }
                              handleOpen={ () => setSlide(item) }/>
          })
        }
      </div>
      <AppLink to="/media" title="Все репортажи" className="media__details"/>

      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Репортажи и видео' }, { title: slide?.title }] } isOpen={ isOpen } handleClose={ () => setSlide(null) }>
        <ReportageContent reportage={ slide }/>
      </Modal>
    </div>
  )
}
