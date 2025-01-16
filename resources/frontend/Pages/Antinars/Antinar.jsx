import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './antinar.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";

export default function Antinar({ documents }) {
  
  return (
    <>
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
        <div>
          <DocumentsNavigation />
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
