import AppHeader from "#/molecules/header/header.jsx";
import Hero from "#/organisms/hero/hero.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import Activities from "#/atoms/agency/activities.jsx";
import MediaCollection from "#/molecules/news/mediaCollection.jsx";
import Documents from "#/organisms/documents/documents.jsx";
import ExternalResources from "#/organisms/documents/external-resources.jsx";

export default function Agency({ agency, mainPosts: slides, categories, posts: news, activities, media, resources, documents}) {
  const logo = '/storage/' + agency.logo;
  return (
    <>
      <AppHeader logo={ logo } title={ agency.full_title }/>
      <Hero categories={ categories } slides={ slides } news={news} />
      <Activities activities={activities}/>
      <MediaCollection media={ media }/>
      <Documents documents={ documents }/>
      <ExternalResources resources={ resources }/>
      <AppFooter/>
    </>
  )
}
