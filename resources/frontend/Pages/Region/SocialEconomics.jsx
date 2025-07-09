import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import MunicipalityElement from "#/atoms/municipality/element.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import './region.css'
import {Head} from "@inertiajs/react";

export default function SocialEconomics({ socialEconomicDevelopment: documents, meta = {} }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Социально-экономическое развитие"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <p className="social-economics__block-name">Стратегия социально-экономического развития Республики Ингушетия на долгосрочную перспективу</p>
          <div className="social-economics__documents">
            {
              documents && documents.map((document) => <Downloadable title={ document.title } description={ `${document.document_type}, ${document.document_size}` } key={document.id} link={ `/storage/${document.document_path}` } />)
            }
          </div>
        </div>
        <div className="page-content__navigation">
          <RegionsNavigation />
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
