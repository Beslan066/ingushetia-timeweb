import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './glorytour.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";

export default function GloryTour() {
  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Виртуальный тур по Залу Славы Республики Ингушетия"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <iframe width="100%" src="http://openkavkaz.com/3d/?ing-magas-adm-head-gloryhall-4&iframe#,-153.4,-0.4,130.0"  style={{minHeight: '500px'}} frameborder="0" marginheight="0" marginwidth="0" scrolling="no" framespacing="0" allowfullscreen></iframe>        </div>
      </div>
      <AppFooter/>
    </>
  )
}
