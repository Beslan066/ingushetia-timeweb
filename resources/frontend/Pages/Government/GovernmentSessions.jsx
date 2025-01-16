import './government.css'
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

export default function GovernmentSessions() {
  const sessions = [
    { title: 'Заседание правительства Республики Ингушетия  28 октября 2021 года', date: '13:45 8 июня 2021', content: '<ol><li>Об областном бюджете на 2022 год и на плановый период 2023 и 2024 годов.</li></ol>' },
    { title: 'Заседание правительства Республики Ингушетия 6 ноября 2020 года', date: '22:25 6 ноября 2020', content: '<ol><li>Об областном бюджете на 2021 год и на плановый период 2022 и 2023 годов;</li><li>О ходе исполнения поручений по итогам отчета Губернатора Ивановской области о результатах деятельности Правительства Ивановской области Ивановской областной Думе.</li></ol>' },
    { title: 'Заседание правительства Республики Ингушетия 26 февраля 2020 года', date: '22:25 26 февраля 2020', content: '<ol><li>О ходе реализации национального проекта «Образование» в Ивановской области;</li><li>О проектах нормативных правовых актов.</li></ol>' },
  ]

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Заседания правительства"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="sessions">
            {
              sessions && sessions.map((session) => (
                <div className="session">
                  <div className="session__title">{ session.title }</div>
                  <div className="session__content" dangerouslySetInnerHTML={ { __html: session.content } }></div>
                  <div className="session__date">{ session.date }</div>
                </div>
              ))
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
