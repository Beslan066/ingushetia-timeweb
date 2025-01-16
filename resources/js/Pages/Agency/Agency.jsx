import Slider from "@/Components/Home/Slider.jsx";
import LimitedPosts from "@/Components/Home/LimitedPosts.jsx";
import {Link} from "@inertiajs/react";
import HomeNewsSidebar from "@/Components/Home/HomeNewsSidebar.jsx";
import MailIcon from "@/Components/Home/MailIcon.jsx";
import React from 'react';
import { useEffect, useState } from 'react';
import Agencies from "@/Layouts/AgenciesLayout.jsx";
import {format, parseISO} from "date-fns";
import {ru} from "date-fns/locale";
import Activities from "@/Components/Agency/Activities.jsx";
import Documents from "@/Components/Documents.jsx";
import PhotoReportageItem from "@/Components/Home/PhotoReportageItem.jsx";
import VideoPlayer from "@/Components/Home/VideoPlayer.jsx";

export default function Agency({search, mainPosts, posts, categories, resources, videos, activities, agency, photoReportages}) {

    const [selectedCategory, setSelectedCategory] = useState(null);

    // Функция для обработки клика по категории
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // Функция для обработки клика по кнопке "Все новости"
    const handleAllNewsClick = () => {
        setSelectedCategory(null);
    };

    // Фильтрация постов по выбранной категории
    const filteredPosts = selectedCategory
        ? posts.filter(post => post.category_id === selectedCategory.id)
        : posts;


    // Ограничение вывода новостей до 3 постов
    const limitedPosts = filteredPosts.slice(0, 3);

    // Функция для форматирования даты
    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'HH:mm, d MMMM', { locale: ru });
    };


    const baseUrl = import.meta.env.VITE_APP_URL;
    return (
        <Agencies
            baseUrl={baseUrl}
            agency={agency}
        >
            <div>
                <main className={`${!search ? 'mt-xl-40' : ''}`}>
                    <div className="container main-materials-section">
                        <div className="main-left col-xxl-9 ">
                            <div className="main-materials ">
                                {mainPosts && <Slider

                                    baseUrl={baseUrl}
                                    mainPosts={mainPosts}
                                />
                                }

                                <div className="filtered-news w-full d-flex mt-xl-40 flex-column">
                                    <div className="filter-items">
                                        <button
                                            className={`filter-button ${selectedCategory === null ? 'active' : ''}`}
                                            onClick={handleAllNewsClick}
                                        >
                                            Все
                                        </button>
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                className={`filter-button ${selectedCategory && selectedCategory.id === category.id ? 'active' : ''}`}
                                                onClick={() => handleCategoryClick(category)}
                                            >
                                                {category.title}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="limited-posts">
                                        {limitedPosts.map((post) => (
                                            <LimitedPosts
                                                key={post.id}
                                                title={post.title}
                                                video={post.video}
                                                reportages={post.reportage}
                                                image={post.image_main}
                                                lead={post.lead}
                                                content={post.content}
                                                user={post.user}
                                                agency={post.agency}
                                                category={post.category.title}
                                                categoryId={post.category.id}
                                                published={post.published_at}
                                                baseUrl={baseUrl}
                                            />
                                        ))}
                                    </div>

                                    <div className="more-news">
                                        <Link href={route('news.index')} className={'d-flex'}>
                                            <span>Больше новостей</span>
                                            <img src="/img/icons/longarrow.svg" alt="" className={'pl-3'}/>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="main-right">
                            <div className="d-flex flex-column mb-32 news-sidebar">

                                {posts.map((post) => {
                                    return (
                                        <HomeNewsSidebar
                                            key={post.id}
                                            title={post.title}
                                            video={post.video}
                                            reportages={post.reportage}
                                            image={post.image_main}
                                            lead={post.lead}
                                            content={post.content}
                                            user={post.user}
                                            agency={post.agency}
                                            category={post.category.title}
                                            categoryId={post.category.id}
                                            published={post.published_at}
                                        />
                                    );
                                })}

                                <div className="more-news">
                                    <Link className={'d-flex'} href={route('news.index')}>
                                        <span>Смотреть все</span>
                                        <img src="/img/icons/longarrow.svg" alt="" className={'pl-3'}/>
                                    </Link>
                                </div>
                            </div>

                            <div className="important p-24">
                                <div className="important-title">
                                    <h2>Важное</h2>
                                </div>
                                <ul>
                                    <li>
                                        <Link href={route('natProjects')}>Нац. проекты</Link>
                                    </li>
                                    <li>
                                        <Link href={route('svoSupport')}>Поддержка семей участников СВО</Link>
                                    </li>
                                    <li>
                                        <Link href="">Инвестиции</Link>
                                    </li>
                                    <li>
                                        <Link href="">Противодействие коррупции</Link>
                                    </li>
                                    <li>
                                        <Link href="">Помощь нуждающимся</Link>
                                    </li>
                                </ul>
                                <div className="important-application d-flex align-items-center">
                                    <MailIcon/>
                                    <span className={'ml-2'}>
                                        Написать обращение
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Activities activities={activities}/>

                <Documents/>

                <section className="home-media">
                    <div className="container d-flex flex-column">
                        <h3 className={'mb-24'}>Фото и видеорепортажи</h3>
                        <div className="d-flex justify-content-between flex-wrap">
                            {photoReportages.map((reportage) => (
                                <PhotoReportageItem className={'d-flex'}
                                                    baseUrl={baseUrl}
                                                    reportage={reportage}
                                                    formatDate={formatDate(reportage.published_at)}

                                />
                            ))
                            }

                            {videos.map((video) => (
                                <VideoPlayer
                                    key={video.id}
                                    video={video}
                                    baseUrl={baseUrl}
                                    date={formatDate(video.published_at)}
                                />
                            ))}

                        </div>
                    </div>
                </section>

                {resources &&
                    <section className="other-resources mb-32">
                        <div className="container">
                            <h3 className="section-title">Полезные ресурсы</h3>
                        </div>
                        <div className="container d-flex justify-content-between align-items-center ">
                            {resources.map((resource) => (
                                <div className="resource-item col-3 p-25 d-flex justify-content-between flex-column">
                                    <h3>{resource.title}</h3>
                                    <div className="d-flex justify-content-between">
                                        <Link href={resource.link}>{resource.link}</Link>
                                        <Link href="">
                                            <img src="/img/icons/external link.svg" alt=""/>
                                        </Link>
                                    </div>
                                </div>
                            ))
                            }

                        </div>

                        <div className="container mt-xl-40">
                            <div className="resource-arrows d-flex align-items-center">
                                <button><img src="../../img/icons/arrow back.svg" alt=""/></button>
                                <button className={'pl-20'}><img src="../../img/icons/arrow next .svg" alt=""/></button>
                            </div>
                        </div>
                    </section>
                }

            </div>
        </Agencies>
    )
}
