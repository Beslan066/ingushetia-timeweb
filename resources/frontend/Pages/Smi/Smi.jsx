import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import {Link} from '@inertiajs/react';
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './smi.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";
import ExternalLinkIcon from "#/atoms/icons/external-link.jsx";


export default function Smi() {
  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Республиканские СМИ"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="external-resource__wrapper external-resource__wrapper--inline" style={{marginBottom: '20px'}}>
            <div className="external-resource__info">
              <div className="external-resource__title">
                <h3 style={{fontWeight: '400'}}>
                Газета «Сердало»
                </h3>
              </div>
            </div>
          <div className="external-resource__footer">
            <a href={'http://www.serdalo.ru/'} target={'_blank'} style={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center'}}>http://www.serdalo.ru/<ExternalLinkIcon color="neutral-darkest"/></a>
            </div>
          </div>

        <div className="external-resource__wrapper external-resource__wrapper--inline" style={{marginBottom: '20px'}}>
            <div className="external-resource__info">
              <div className="external-resource__title">
                <h3 style={{fontWeight: '400'}}>
                Газета «Ингушетия»
                </h3>
              </div>
            </div>
          <div className="external-resource__footer">
            <a href={'http://gazetaingush.ru/'} target={'_blank'} style={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center'}}>http://gazetaingush.ru/<ExternalLinkIcon color="neutral-darkest"/></a>
            </div>
        </div>

        <div className="external-resource__wrapper external-resource__wrapper--inline" style={{marginBottom: '20px'}}>
            <div className="external-resource__info">
              <div className="external-resource__title">
                <h3 style={{fontWeight: '400'}}>
                ГТРК «Ингушетия»
                </h3>
              </div>
            </div>
          <div className="external-resource__footer">
            <a href={'http://ingushetiatv.ru/'} target={'_blank'} style={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center'}}>http://ingushetiatv.ru/<ExternalLinkIcon color="neutral-darkest"/></a>
            </div>
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
