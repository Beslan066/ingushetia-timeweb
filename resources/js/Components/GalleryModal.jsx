import React, { useState } from 'react';
import CloseIcon from "@/Components/CloseIcon.jsx";

export default function GalleryModal({ active, onClose, title, slides, reportage }) {
    const baseUrl = import.meta.env.VITE_APP_URL;

    // Функция для очистки строки от HTML-сущностей и лишних символов
    const decodeHtmlEntities = (str) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    };

    // Очистка строки slides и преобразование в массив путей к изображениям
    const cleanSlidesString = decodeHtmlEntities(slides)
        .replace(/^\[\"|\"\]$/g, '')
        .replace(/\\\"/g, '"')
        .split('","');

    const [hoverModalActive, setHoverModalActive] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const openHoverModal = (index) => {
        setCurrentSlideIndex(index);
        setHoverModalActive(true);
    };

    const closeHoverModal = () => {
        setHoverModalActive(false);
    };

    const goToNextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % cleanSlidesString.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlideIndex((prevIndex) =>
            prevIndex === 0 ? cleanSlidesString.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className={`d-flex justify-content-center modal-section`}>
            <div className={`main-modal p-xl-32 ${active ? 'active' : ''}`} id="mainModal">
                <div className="modal-head w-100 d-flex align-items-center justify-content-between">
                    <p className="d-flex align-items-center">
                        <a href="/">Главная</a>
                        <span className="ml-12">
                            <img className="next-icon" src="../../img/icons/no.svg" alt=""/>
                        </span>
                        <a className="ml-12" href="/">Фоторепортаж</a>
                        <span className="ml-12">
                            <img className="next-icon" src="../../img/icons/no.svg" alt=""/>
                        </span>
                    </p>
                    <div>
                        <button onClick={onClose}>
                            <img src="/img/icons/Close.png" alt="Закрыть"/>
                        </button>
                    </div>
                </div>

                <div className="modal-news-content mt-xl-40 mb-24">
                    <div className="modal-news-title">
                        <h2>{title}</h2>
                    </div>

                    <div className="modal-news-images mt-4 d-flex flex-wrap">
                        {cleanSlidesString.map((slide, i) => (
                            <div key={i} className="slide_image position-relative d-flex align-items-center justify-content-center" onClick={() => openHoverModal(i)}>
                                <img src={'/img/icons/expand.png'} className={'position-absolute expand-arrows'}/>
                                <img className="modal-news-image" src={`${baseUrl}/storage/${slide}`} alt={`Slide ${i + 1}`}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-tags d-flex flex-column mb-24">
                    <span className="mb-2">Поделиться:</span>
                    <div className="share-buttons gap-2 d-flex align-items-center">
                        <a href="/" type="button">
                            <img src={ '/img/icons/social/telegram (1).png' } alt="Telegram"/>
                        </a>
                        <a href="/" type="button">
                            <img src="/img/icons/social/VK.png" alt="VK"/>
                        </a>
                        <a href="/" type="button">
                            <img src="/img/icons/social/ok.png" alt="Одноклассники"/>
                        </a>
                        <a href="/" type="button">
                            <img src="/img/icons/social/Whatsapp.png" alt="WhatsApp"/>
                        </a>
                        <a href="/" type="button">
                            <img src="/img/icons/social/Link.png" alt="Ссылка"/>
                        </a>
                    </div>
                </div>
            </div>

            { hoverModalActive && (
                <div className="hover-modal active">
                    <div className="slides-images position-relative d-flex">
                        <div className="gallery-slide d-flex align-items-center">
                            <img src={`${baseUrl}/storage/${cleanSlidesString[currentSlideIndex]}`}
                                 alt={`Slide ${currentSlideIndex + 1}`}/>

                            <div className={'w-100 d-flex justify-content-between align-items-center buttons-line position-absolute'}>
                                <button className="prev-slide" onClick={goToPrevSlide}
                                        style={{transform: "rotate(180deg)"}}>
                                    <svg width="32" height="32" viewBox="0 0 11 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L9 9L1 17" stroke="#fff" strokeWidth="2"/>
                                    </svg>
                                </button>
                                <button className="next-slide" onClick={goToNextSlide}>
                                    <svg width="32" height="32" viewBox="0 0 11 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L9 9L1 17" stroke="#fff" strokeWidth="2"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="gallery-slide-info">
                        <div className="gallery-slide-info-head d-flex justify-content-between align-items-center">
                            <span>{currentSlideIndex + 1} из {cleanSlidesString.length}</span>
                            <button onClick={closeHoverModal}>
                                <CloseIcon/>
                            </button>
                        </div>
                        <div>
                            <h3>{title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
