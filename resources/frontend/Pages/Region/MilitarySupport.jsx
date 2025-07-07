import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React, { useState } from "react";
import './region.css'
import InternalTriggerLink from "#/atoms/links/internal-trigger-link.jsx";
import MunicipalityContent from "#/atoms/modal/municipality-content.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import MilitaryContent from "#/atoms/modal/military-content.jsx";
import useModal from "#/hooks/useModal.js";
import Accordion from "#/molecules/accordion/Accordion.jsx";

export default function MilitarySupport({ documents }) {
  const [modal, isOpen, setModal] = useModal(undefined);

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Поддержка семей военнослужащих"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <p>В Республике Ингушетия разработан комплекс мер социальной поддержки семей военнослужащих.</p>
          <p>Филиал государственного фонда «Защитники Отечества»: здесь участники СВО и члены их семей в режиме «одного
            окна» могут получить все меры социальной поддержки и услуги, в т.ч. бесплатные юридические консультации,
            психологическую помощь, направление на реабилитацию, помощь в трудоустройстве и пр.</p>
          <p>Обратиться в фонд можно:</p>
          <ul>
            <li>Лично по адресу: г. Магас (режим работы пн-пт с 09:00 до 18:00).</li>
            {/*<li>По телефону 8(4932) 52-81-08.</li>*/}
            <li>Написать на почту

            </li>
            <li>Во всех городах и районах региона работают социальные координаторы фонда – к ним можно обратиться через
              территориальные органы соцзащиты.
            </li>
          </ul>
          <p>По всем вопросам, касающимся помощи участникам СВО и их семьям, можно обращаться на «горячую линию» Центра
            социального сопровождения семей участников спецоперации (режим работы пн-пт с 09:00 до
            18:00).</p>

          <div className="accordion__items">
            {documents?.map(document => (
              <Accordion title={document.title} key={document.id}>
                <div dangerouslySetInnerHTML={{ __html: document.content }} />
              </Accordion>
            ))}
          </div>
        </div>
        <div className="page-content__navigation">
          <RegionsNavigation/>
        </div>
      </div>
      <AppFooter/>
      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Поддержка семей военнослужащих' }] } isOpen={ isOpen } handleClose={ () => setModal(null) }>
        <MilitaryContent document={ modal }/>
      </Modal>
    </>
  )
}
