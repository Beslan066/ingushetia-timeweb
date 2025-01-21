import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './manreserves.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";

export default function ManagmentReserve({ documents }) {


  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Резерв управленческих кадров"/>
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
