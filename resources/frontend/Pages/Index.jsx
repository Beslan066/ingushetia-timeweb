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
                              }) {
  const vectors = [
    {
      image: '/img/content/vectors/image 7.png',
      route: '',
      title: 'АПК',
      profits: ['Создано более 1000 рабочих мест', 'На 18% увеличен сбор с/х продуктов', '145 гектаров новых пахатных земель']
    },
    {
      image: '/img/content/vectors/image 7 (1).png',
      route: '',
      title: 'Цифровая сфера',
      profits: ['Открыт IT-университет “Школа 21”', 'Выпущено более 400 IT-специалистов']
    },
    {
      image: '/img/content/vectors/image 7 (2).png',
      route: '',
      title: 'Промышленность',
      profits: ['Запущено 3 новых предприятия', 'Создано более 2000 новых рабочих мест']
    },
    {
      image: '/img/content/vectors/image 7 (3).png',
      route: '',
      title: 'Туризм',
      profits: ['На 20% больше туристов', 'Более 2 новых туристических зон']
    },
  ]

  const url = new URL(window.location.href);
  if (url.searchParams.has('anniversary')) {
    localStorage.setItem('anniversary', JSON.stringify(!anniversary));
  }

  return (
    <>
      <AppHeader anniversary={ anniversary }/>
      <Hero categories={ categories } slides={ slides } news={ news }/>
      <Vectors vectors={ vectors }/>
      <AgencyNews agencies={ agencies } posts={ agencyNews }/>
      <Districts settlements={ settlements } districts={ districts }/>
      <MediaCollection media={ media }/>
      { anniversary ? <AnniversaryBanner/> : '' }
      <Mountains mountains={ mountains }/>
      <ExternalResources resources={ resources }/>
      <AppFooter/>
    </>
  )
}
