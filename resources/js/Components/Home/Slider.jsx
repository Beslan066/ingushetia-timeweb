import React, { useState, useEffect, useRef } from 'react';
import '../../../../public/css/slider.css';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Slider({ mainPosts, baseUrl }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const slideRef = useRef(null);

    // Функция для показа следующего слайда
    const nextSlide = () => {
        if (isTransitioning) return; // Предотвращаем переключение во время анимации
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mainPosts.length);
    };

    // Функция для показа предыдущего слайда
    const prevSlide = () => {
        if (isTransitioning) return; // Предотвращаем переключение во время анимации
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? mainPosts.length - 1 : prevIndex - 1
        );
    };

    // Сброс состояния перехода после завершения анимации
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 500); // Время должно совпадать с CSS transition
        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Автоматическое переключение слайдов каждые 6 секунд
    useEffect(() => {
        const intervalId = setInterval(nextSlide, 8000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="slider">
            <div className="slides" ref={slideRef}>
                {mainPosts.map((slide, index) => {
                    // Форматируем дату
                    const formattedDate = format(parseISO(slide.published_at), "HH:mm, d MMMM", { locale: ru });

                    return (
                        <div
                            className="slide"
                            key={index}
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                                opacity: isTransitioning ? 0.5 : 1,
                                transition: `transform 0.5s ease-in-out, opacity 0.5s ease-in-out`
                            }}
                        >
                            <img src={`${baseUrl}/storage/${slide.image_main}`} alt="Main material" className="w-100" />
                            <div className="info flex position-absolute w-100 flex-col bottom-0">
                                <p className="news-date">
                                    {formattedDate} <span className="news-category ml-4">{slide.category.title}</span>
                                </p>
                                <a href="#">
                                    <h2 className="main-material-title">{slide.title}</h2>
                                </a>
                                <div className="slider-buttons d-flex justify-content-center bottom-12">
                                    {mainPosts.map((_, i) => (
                                        <button
                                            key={i}
                                            className={i === currentIndex ? 'active' : ''}
                                            onClick={() => setCurrentIndex(i)}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="prev" onClick={prevSlide} style={{transform: "rotate(180deg)"}}
            >
                <svg width="32" height="32" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L9 9L1 17" stroke="white" strokeWidth="2"/>
                </svg>
            </button>
            <button className="next" onClick={nextSlide}>
                <svg width="32" height="32" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L9 9L1 17" stroke="white" strokeWidth="2" />
                </svg>
            </button>
        </div>
    );
};
