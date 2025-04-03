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
  const sessions = []

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
