import './government.css'
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import React from "react";
import AppFooter from "#/organisms/footer/footer.jsx";
import Accordion from "#/molecules/accordion/Accordion.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import GovernmentNavigation from "#/molecules/navigation/government-navigation.jsx";
import {usePage} from "@inertiajs/react";

export default function Government() {

  const { props } = usePage();
  const { government, sections } = props;

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title={government.name}/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="post__image">
            <img
              src={`/storage/${government.image_main}`}
              alt={government.name}
            />
          </div>

          <div dangerouslySetInnerHTML={{ __html: government.description }} className={'mb-2'}>

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
          <GovernmentNavigation />
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
