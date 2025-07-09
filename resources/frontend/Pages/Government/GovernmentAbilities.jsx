import './government.css'
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import React from "react";
import AppFooter from "#/organisms/footer/footer.jsx";
import GovernmentNavigation from "#/molecules/navigation/government-navigation.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import {Head, usePage} from "@inertiajs/react";
import Accordion from "#/molecules/accordion/Accordion.jsx";

export default function GovernmentAbilities({meta = {}}) {

  const { props } = usePage();
  const { governmentAuthority, sections } = props;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title={governmentAuthority.name}/>
      <div className="page-content__wrapper">
        <div className="page-content__content">

          <div dangerouslySetInnerHTML={{ __html: governmentAuthority.description }} className={'mb-2'}>

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
