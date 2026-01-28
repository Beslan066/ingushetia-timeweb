import './mountains.css'
import AppLink from "#/atoms/buttons/link.jsx";
import React, { useState } from "react";
import RightArrowIcon from "#/atoms/icons/right-arrow-icon.jsx";
import LeftArrowIcon from "#/atoms/icons/left-arrow-icon.jsx";
import { useSwipeable } from "react-swipeable";
import Modal from "#/atoms/modal/modal.jsx";
import MountainContent from "#/atoms/modal/mountain-content.jsx";

export default function Mountains({ mountains }) {
  if (!mountains) {
    return null;
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % mountains.length);
  };

  const handlePrevious = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + mountains.length) % mountains.length);
  };

  const swipeHandlers = useSwipeable({
    onSwiped: ({ dir }) => {
      switch (dir) {
        case 'Left':
          handleNext();
          break;
        case 'Right':
          handlePrevious();
          break;
        default:
          return;
      }
    }
  })

  const [slide, setSlide] = useState(null);

  return (
    <div className="mountains__wrapper">
      <h2 className="mountains__title">Родина башен</h2>
      <div className="mountains__slider" { ...swipeHandlers }>
        {mountains.map((mountain) => {
          return (
            <div key={ mountain.id } className="mountain__slide" style={ {
              transform: `translateX(-${ currentSlide * 100 }%)`,
              transition: 'transform 0.3s ease-in-out'
            } }>
              {mountain.image_main &&
                <div className="mountain__image">
                  <img src={ `/storage/${ mountain.image_main }` } alt={ `Изображение ${ mountain.title }` }/>
                </div>
              }

              <div className="mountain__body">
                <div>
                  <h3 className="mountain__title">{ mountain.title }</h3>
                  <div className="mountain__text" dangerouslySetInnerHTML={{ __html: mountain.lead }} />
                </div>
                <AppLink className="mountain__link" handleClick={ () => setSlide(mountain) } title="Подробнее"/>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mountain-slider__pagination">
        <button onClick={ handlePrevious }>
          <LeftArrowIcon color={ currentSlide === 0 ? 'neutral-medium' : 'neutral-black' }/>
        </button>
        <div className="page-counter">
          <span>{ currentSlide + 1 }</span>
          <span> / </span>
          <span>{ mountains.length }</span>
        </div>
        <button onClick={ handleNext }>
          <RightArrowIcon color={ currentSlide + 1 === mountains.length ? 'neutral-medium' : 'neutral-black' }/>
        </button>
      </div>

      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Родина башен' }, { title: slide?.title }] } isOpen={ slide } handleClose={ () => setSlide(null) }>
        <MountainContent mountain={ slide }/>
      </Modal>
    </div>
  );
}
