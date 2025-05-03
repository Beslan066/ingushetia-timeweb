import React from 'react';
import AppHeader from "#/molecules/header/header.jsx";
import Hero from "#/organisms/hero/hero.jsx";
import Vectors from "#/organisms/vectors/vectors.jsx";
import Districts from "#/organisms/districts/districts.jsx";
import MediaCollection from "#/molecules/news/mediaCollection.jsx";
import Mountains from "#/molecules/mountains/mountains.jsx";
import ExternalResources from "#/organisms/documents/external-resources.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import AnniversaryBanner from "#/atoms/anniversary-banner/banner.jsx";
import './index.css';

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

      <Vectors vectors={vectors} />
      <Districts settlements={settlements} districts={districts} />
      <MediaCollection media={media} />
      {anniversary && <AnniversaryBanner />}
      <Mountains mountains={mountains} />
      <ExternalResources resources={resources} />
      <AppFooter />
    </>
  );
}
