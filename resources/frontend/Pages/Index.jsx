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
                                anniversary,
                                vectors
                              }) {


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
