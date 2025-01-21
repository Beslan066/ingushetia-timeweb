import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import {Link, usePage} from '@inertiajs/react';
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './federal-authority.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";
import ExternalLinkIcon from "#/atoms/icons/external-link.jsx";


export default function FederalAuthority() {

  let {federalAuthorities} = usePage().props;

  console.log(federalAuthorities);


  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Территориальные органы федеральных органов власти"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">

          {federalAuthorities &&


          federalAuthorities.map((item) => (
            <div className="external-resource__wrapper external-resource__wrapper--inline" style={{marginBottom: '20px'}}>
            <div className="external-resource__info">
              <div className="external-resource__title">
                <h3 style={{fontWeight: '400'}}>
                  {item.title}
                </h3>
              </div>
            </div>
          <div className="external-resource__footer">
            <a href={item.link} target={'_blank'} style={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center'}}>{item.link}<ExternalLinkIcon color="neutral-darkest"/></a>
            </div>
        </div>
          ))

          }

      </div>
      </div>
      <AppFooter/>
    </>
  )
}
