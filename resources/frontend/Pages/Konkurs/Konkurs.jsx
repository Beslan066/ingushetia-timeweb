import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './konkurs.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";

export default function Konkurs({ konkurses }) {
  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Конкурсы в органах исполнительной власти Республики Ингушетия"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="downloadable__documents">
            {
              konkurses && konkurses.map((document) =>
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
