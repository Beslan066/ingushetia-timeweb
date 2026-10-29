import React from "react";
import AppHeader from "#/molecules/header/header.jsx";
import Hero from "#/organisms/hero/hero.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import Activities from "#/atoms/agency/activities.jsx";
import MediaCollection from "#/molecules/news/mediaCollection.jsx";
import Documents from "#/organisms/documents/documents.jsx";
import ExternalResources from "#/organisms/documents/external-resources.jsx";

export default function Agency({
                                 agency,
                                 mainPosts: slides,
                                 categories,
                                 news,
                                 activities,
                                 media,
                                 resources,
                                 documents,
                                 spotlights,
                                 slug,
                                 sidebarPages
                               }) {
  const logo = agency.logo ? '/storage/' + agency.logo : null;

  return (
    <>
      <AppHeader logo={logo} title={agency.full_title} sidebarPages={sidebarPages}/>

      <Hero categories={categories} slides={slides} news={news} spotlights={spotlights} />

      <Activities activities={activities} />

      <MediaCollection media={media} allLink="/pravitelstvo/media"/>

      {/* Передаем массив документов и слаг агентства */}
      <Documents documents={documents} agencySlug={slug} />

      <ExternalResources resources={resources} />

      <AppFooter />
    </>
  );
}
