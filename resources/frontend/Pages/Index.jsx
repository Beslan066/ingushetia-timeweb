import React, { lazy, Suspense } from 'react';
import AppHeader from "#/molecules/header/header.jsx";
import Hero from "#/organisms/hero/hero.jsx";
import './index.css';

// Ленивая загрузка тяжелых компонентов
const Vectors = lazy(() => import("#/organisms/vectors/vectors.jsx"));
const Districts = lazy(() => import("#/organisms/districts/districts.jsx"));
const MediaCollection = lazy(() => import("#/molecules/news/mediaCollection.jsx"));
const Mountains = lazy(() => import("#/molecules/mountains/mountains.jsx"));
const ExternalResources = lazy(() => import("#/organisms/documents/external-resources.jsx"));
const AppFooter = lazy(() => import("#/organisms/footer/footer.jsx"));
const AnniversaryBanner = lazy(() => import("#/atoms/anniversary-banner/banner.jsx"));

export default function Index({
                                mainPosts: slides,
                                categories,
                                posts: news,
                                cities: settlements,
                                districts,
                                media,
                                mountains,
                                resources,
                                showNews: openedNews,
                                anniversary
                              }) {
  const vectors = [
    {
      image: '/img/content/vectors/vector1.webp',
      route: '',
      title: 'Сельское хозяйство',
      profits: ['Создано более 1000 рабочих мест', 'На 18% увеличен сбор с/х продуктов', '145 гектаров новых пахатных земель']
    },
    {
      image: '/img/content/vectors/vector2.webp',
      route: '',
      title: 'Цифровая сфера',
      profits: ['Открыт IT-университет “Школа 21”', 'Выпущено более 400 IT-специалистов']
    },
    {
      image: '/img/content/vectors/vector3.webp',
      route: '',
      title: 'Промышленность',
      profits: ['Запущено 3 новых предприятия', 'Создано более 2000 новых рабочих мест']
    },
    {
      image: '/img/content/vectors/vector4.webp',
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
        openedNews={openedNews}
      />

      <Suspense fallback={<div className="loader">Загрузка...</div>}>
        <Vectors vectors={vectors} />
        <Districts settlements={settlements} districts={districts} />
        <MediaCollection media={media} />
        {anniversary && <AnniversaryBanner />}
        <Mountains mountains={mountains} />
        <ExternalResources resources={resources} />
        <AppFooter />
      </Suspense>
    </>
  );
}
