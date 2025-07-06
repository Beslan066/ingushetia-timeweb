import {Link, Head, usePage, router} from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout.jsx";
import Modal from "@/Components/Modal.jsx";
import React, { Fragment } from 'react'
import { useEffect, useState } from 'react';
import HomeNewsSidebar from "@/Components/Home/HomeNewsSidebar.jsx";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import Slider from "@/Components/Home/Slider.jsx";
import MailIcon from "@/Components/Home/MailIcon.jsx";
import VideoPlayer from "@/Components/Home/VideoPlayer.jsx";
import Municipality from "@/Components/Home/Municipality.jsx";
import PhotoReportageItem from "@/Components/Home/PhotoReportageItem.jsx";
import SupportModal from "@/Components/SupportModal.jsx";
import LimitedPosts from "@/Components/Home/LimitedPosts.jsx";
import YearBanner from "@/Components/Home/YearBanner.jsx";
import Mountains from "@/Components/Home/Mountains.jsx";
import AgencyNews from "@/Components/Home/AgencyNews.jsx";
import OtherResource from "@/Components/Home/OtherResource.jsx";
import VectorItem from "@/Components/VectorItem.jsx";

export default function Welcome() {


    let {posts, categories, mainPosts, resources, photoReportages, relatedAgencyNews, videos, cities, districts, search, setSearch, mountains, agencies, agencyNews, showNews} = usePage().props;

    const [modal, setModal] = useState(!!showNews);

// Состояние для выбранной категории
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
        const currentYear = new Date().getFullYear();
        const reportYear = date.getFullYear();

        let dateFormat = 'HH:mm, d MMMM';

        // Если год не текущий, добавляем год в форматирование
        if (reportYear !== currentYear) {
            dateFormat += ' yyyy';
        }

        return format(date, dateFormat, { locale: ru });
    };

    const baseUrl = import.meta.env.VITE_APP_URL;
    return (
        <Guest>
            <div>
                <main className={`${!search ? 'mt-xl-40' : ''}`}>
                    <div className="main-materials-section container">
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

                                    {
                                        showNews && <Modal
                                            title={showNews.title}
                                            reportages={showNews.cleanSlidesString}
                                            date={showNews.formattedDate}
                                            category={showNews.category}
                                            categoryId={showNews.categoryId}
                                            relatedPosts={showNews.relatedPosts}
                                            image={showNews?.image ?? showNews?.image_main}
                                            content={showNews.content}
                                            active={modal}
                                            onClose={() => setModal(false)}
                                        />
                                    }

                                    <div className="limited-posts">
                                    {limitedPosts.map((post) => (
                                        <Fragment key={post.id}>
                                        <LimitedPosts
                                            id={post.url}
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
                                            relatedPosts={post.relatedPosts}
                                        />
                                        </Fragment>
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
                            <div className="news-sidebar ">

                                {posts.map((post) => {
                                    return (
                                        <Fragment key={post.id}>
                                        <HomeNewsSidebar
                                            title={post.title}
                                            video={post.video}
                                            reportages={post.reportage}
                                            image={post.image_main}
                                            imageAuthor={post.image_author}
                                            imageDesc={post.image_description}
                                            lead={post.lead}
                                            content={post.content}
                                            user={post.user}
                                            agency={post.agency}
                                            category={post.category.title}
                                            categoryId={post.category.id}
                                            published={post.published_at}
                                            relatedPosts={post.relatedPosts}
                                            slug={post.url}
                                        />
                                        </Fragment>
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
                                        <Link href={route('implementations')}>Реализация указов Президента РФ</Link>
                                    </li>
                                    {/*<li>*/}
                                    {/*    <Link href={route('economicSupport')}>Поддержка экономики и граждан</Link>*/}
                                    {/*</li>*/}
                                    <li>
                                        <Link href={route('anticorruptions')}>Противодействие коррупции</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
                <section className="ingushetia-vectors mt-32">
                    <div className="d-flex flex-column">
                        <div className="container vectors-title">
                            <h3>Векторы развития республики</h3>
                        </div>
                        <div className="vector-items container">
                            <VectorItem image="/img/content/vectors/image 7.png" link="" title="АПК" profits={['Создано более 1000 рабочих мест', 'На 18% увеличен сбор с/х продуктов', '145 гектаров новых пахатных земель']}/>
                            <VectorItem image="/img/content/vectors/image 7 (1).png" link="" title="Цифровая сфера" profits={['Открыт IT-университет “Школа 21”', 'Выпущено более 400 IT-специалистов']}/>
                            <VectorItem image="/img/content/vectors/image 7 (2).png" link="" title="Промышленность" profits={['Запущено 3 новых предприятия', 'Создано более 2000 новых рабочих мест']}/>
                            <VectorItem image="/img/content/vectors/image 7 (3).png" link="" title="Туризм" profits={['На 20% больше туристов', 'Более 2 новых туристических зон']}/>
                        </div>
                    </div>
                </section>

                <YearBanner/>

                { AgencyNews &&
                    <AgencyNews
                        agencyNews={ agencyNews }
                        agencies={ agencies }
                        baseUrl={ baseUrl }
                    />
                }

                <Municipality cities={ cities } district={ districts } baseUrl={ baseUrl }/>

                <section className="home-media">
                    <div className="container d-flex flex-column">
                        <h3 className={ 'mb-24' }>Фото и видеорепортажи</h3>
                        <div className="agency-news">
                            { photoReportages.map((reportage) => (
                                <Fragment key={ reportage.id }>
                                    <PhotoReportageItem className={ 'd-flex' }
                                                        baseUrl={ baseUrl }
                                                        reportage={ reportage }
                                                        formatDate={ formatDate(reportage.published_at) }
                                    />
                                </Fragment>
                            ))

                            }

                            { videos.map((video) => (
                                <Fragment key={ video.id }>
                                    <VideoPlayer
                                        key={ video.id }
                                        video={ video }
                                        baseUrl={ baseUrl }
                                        date={ formatDate(video.published_at) }
                                    />
                                </Fragment>
                            )) }

                        </div>
                    </div>
                </section>

                <Mountains mountains={ mountains } baseUrl={ baseUrl }/>


                <OtherResource resources={ resources }/>

            </div>

        </Guest>
    );
}
