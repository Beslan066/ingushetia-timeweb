import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './antinar.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";
import {Head} from "@inertiajs/react";

export default function Antinar({ documents, meta = {} }) {

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Антинаркотическая комиссия в Республике Ингушетия"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="downloadable__documents">
            {
              documents && documents.map((document) =>
                <Downloadable title={ document.title } description={ document.type } key={ document.id } link={ `/storage/${ document.file }` }/>)
            }
          </div>
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
