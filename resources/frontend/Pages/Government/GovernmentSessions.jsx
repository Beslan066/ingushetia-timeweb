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

export default function GovernmentSessions({sessions}) {

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Заседания правительства"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="downloadable__documents">
            {
              sessions && sessions.map((session) =>
                <Downloadable title={ session.title }   key={ session.id } link={ `/storage/${ session  .file }` }/>)
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
