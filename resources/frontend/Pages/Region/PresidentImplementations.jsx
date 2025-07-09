import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './region.css';
import {Head, usePage} from "@inertiajs/react";

export default function PresidentImplementations({implementations: documents}) {

  const { props } = usePage();
  const { meta = {} } = props;
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Реализация указов Президента РФ от 07.05.2012 № 596-606"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <p className="social-economics__block-name">В мае 2012 года Президентом Российской Федерации был подписан ряд указов, закрепляющих основные направления развития России в экономике, социальной сфере, внутренней политике, международных делах и вопросах безопасности.</p>
          <div className="president__documents">
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
