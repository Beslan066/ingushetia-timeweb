import './administration.css'
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import React, { useState } from "react";
import AppFooter from "#/organisms/footer/footer.jsx";
import GovernmentNavigation from "#/molecules/navigation/government-navigation.jsx";
import GovernmentMember from "#/atoms/government/Member.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import MilitaryContent from "#/atoms/modal/military-content.jsx";
import MemberContent from "#/atoms/modal/member-content.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";

export default function GovernmentPlan() {
  const documents = [
    {title: 'Информация о социально значимых мероприятиях, планируемых к проведению в Республики Ингушетия во II квартале 2019 года', document_type: 'PDF', document_size: '221 КБ', document_path: ''},
    {title: 'Информация о социально значимых мероприятиях, планируемых к проведению в Республики Ингушетия в I квартале 2019 года', document_type: 'PDF', document_size: '2 499 КБ', document_path: ''},
    {title: 'Информация о социально значимых мероприятиях, планируемых к проведению вРеспублики Ингушетия в IV квартале 2018 года', document_type: 'PDF', document_size: '63 КБ', document_path: ''},
    {title: 'Информация о социально значимых мероприятиях, планируемых к проведению в Республики Ингушетия в III квартале 2018 года', document_type: 'PDF', document_size: '63 КБ', document_path: ''},
  ]

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Полномочия правительства"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <p>В мае 2012 года Президентом Российской Федерации был подписан ряд указов, закрепляющих основные направления развития России в экономике, социальной сфере, внутренней политике, международных делах и вопросах безопасности.</p>
          <div className="downloadable__documents">
            {
              documents && documents.map((document) =>
                <Downloadable title={ document.title } description={ `${ document.document_type }, ${ document.document_size }` } key={ document.id } link={ `/storage/${ document.document_path }` }/>)
            }
          </div>
        </div>
        <div className="page-content__navigation">
          <GovernmentNavigation/>
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
