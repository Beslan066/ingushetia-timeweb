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
import CookieConsent from "#/molecules/CookieConsent.jsx";
import { Head } from "@inertiajs/react";

export default function Index({
                                mainPosts: slides,
                                categories,
                                news: news,
                                cities: settlements,
                                districts,
                                media,
                                mountains,
                                resources,
                                showNews: openedNews,
                                anniversary,
                                vectors,
                                spotlights,
                                meta
                              }) {

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.og_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.canonical} />
        <link rel="canonical" href={meta.canonical} />
      </Head>

      <AppHeader anniversary={anniversary} />
      <Hero
        categories={categories}
        slides={slides}
        news={news}
        showNews={openedNews}
        spotlights={spotlights}
      />

      <Vectors vectors={vectors} />
      <Districts settlements={settlements} districts={districts} />
      <MediaCollection media={media} />
      {anniversary && <AnniversaryBanner />}
      <Mountains mountains={mountains} />
      <ExternalResources resources={resources} />
      <AppFooter />
      <CookieConsent />
    </>
  );
}
