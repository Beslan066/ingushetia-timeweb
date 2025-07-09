import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import {Head, Link} from '@inertiajs/react';
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './judicial-authority.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";
import ExternalLinkIcon from "#/atoms/icons/external-link.jsx";


export default function JudicialAuthority({meta = {}}) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Органы судебной системы Республики Ингушетия"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="external-resource__wrapper external-resource__wrapper--inline" style={{marginBottom: '20px'}}>
            <div className="external-resource__info">
              <div className="external-resource__title">
                <h3 style={{fontWeight: '400'}}>
                  Конституционный Суд Республики Ингушетия
                </h3>
              </div>
            </div>
          <div className="external-resource__footer">
            <a href={'http://ks-ri.ru/'} target={'_blank'} style={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center'}}>http://ks-ri.ru/<ExternalLinkIcon color="neutral-darkest"/></a>
            </div>
        </div>

        <div className="external-resource__wrapper external-resource__wrapper--inline" style={{marginBottom: '20px'}}>
            <div className="external-resource__info">
              <div className="external-resource__title">
                <h3 style={{fontWeight: '400'}}>
                Мировые судьи Республики Ингушетия
                </h3>
              </div>
            </div>
          <div className="external-resource__footer">
            <a href={'https://nazran.ing.sudrf.ru/'} target={'_blank'} style={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center'}}>https://nazran.ing.sudrf.ru/<ExternalLinkIcon color="neutral-darkest"/></a>
            </div>
        </div>
      </div>
      </div>
      <AppFooter/>
    </>
  )
}
