import AppHeader from "#/molecules/header/header.jsx";
import Hero from "#/organisms/hero/hero.jsx";
import './index.css';
import React from "react";
import Vectors from "#/organisms/vectors/vectors.jsx";
import Districts from "#/organisms/districts/districts.jsx";
import MediaCollection from "#/molecules/news/mediaCollection.jsx";
import Mountains from "#/molecules/mountains/mountains.jsx";
import Documents from "#/organisms/documents/documents.jsx";
import ExternalResources from "#/organisms/documents/external-resources.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import AnniversaryBanner from "#/atoms/anniversary-banner/banner.jsx";
import AgencyNews from "#/molecules/news/agency-news.jsx";

import { usePage } from '@inertiajs/inertia-react';

export default function Index({
                                mainPosts: slides,
                                categories,
                                posts: news,
                                cities: settlements,
                                districts,
                                media,
                                mountains,
                                resources,
                                agencies,
                                agencyNews,
                                anniversary,
                                showNews: openedNews, // Данные о новости, переданные из контроллера
                              }) {
  const url = new URL(window.location.href);
  if (url.searchParams.has('anniversary')) {
    localStorage.setItem('anniversary', JSON.stringify(!anniversary));
  }
  const vectors = [
    {
      image: '/img/content/vectors/image7.webp',
      route: '',
      title: 'Сельское хозяйство',
      profits: ['Создано более 1000 рабочих мест', 'На 18% увеличен сбор с/х продуктов', '145 гектаров новых пахатных земель']
    },
    {
      image: '/img/content/vectors/image7(1).webp',
      route: '',
      title: 'Цифровая сфера',
      profits: ['Открыт IT-университет “Школа 21”', 'Выпущено более 400 IT-специалистов']
    },
    {
      image: '/img/content/vectors/image7(2).webp',
      route: '',
      title: 'Промышленность',
      profits: ['Запущено 3 новых предприятия', 'Создано более 2000 новых рабочих мест']
    },
    {
      image: '/img/content/vectors/image7(3).webp',
      route: '',
      title: 'Туризм',
      profits: ['На 20% больше туристов', 'Более 2 новых туристических зон']
    },
  ]

  return (
    <>
      <AppHeader anniversary={anniversary} />
      <Hero
        categories={categories}
        slides={slides}
        news={news}
        openedNews={openedNews} // Передаем данные о новости в Hero
      />
      <Vectors vectors={vectors} />
      <Districts settlements={settlements} districts={districts} />
      <MediaCollection media={media} />
      {anniversary ? <AnniversaryBanner /> : ''}
      <Mountains mountains={mountains} />
      <ExternalResources resources={resources} />
      <AppFooter />
    </>
  );
}
