import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Accordion from "#/molecules/accordion/Accordion.jsx";
import './region.css'
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import { usePage } from "@inertiajs/react";
import BackToTop from "#/atoms/topButton/BackToTop.jsx";


export default function Region() {

  const { props } = usePage();
  const { region, sections } = props;


  console.log(region)

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="О республике Ингушетия"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="post__image">
            <img
              src={`/storage/${region.image_main}`}
              alt={region.name}
            />
            <span className="img__description">Центр города Магас, Республика Ингушетия</span>
          </div>

          <div dangerouslySetInnerHTML={{ __html: section.content }} className={mb-2}>

          </div>

          <div className="accordion__items">
            {sections?.map(section => (
              <Accordion title={section.title} key={section.id}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </Accordion>
            ))}
          </div>
        </div>
        <div className="page-content__navigation">
          <RegionsNavigation />
        </div>
      </div>
      <AppFooter/>
      <BackToTop />

    </>
  )
}
