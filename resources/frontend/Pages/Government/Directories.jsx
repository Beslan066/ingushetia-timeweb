import './government.css'
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import React, { useState } from "react";
import AppFooter from "#/organisms/footer/footer.jsx";
import Accordion from "#/molecules/accordion/Accordion.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import GovernmentNavigation from "#/molecules/navigation/government-navigation.jsx";
import GovernmentMember from "#/atoms/government/Member.jsx";
import MemberContent from "#/atoms/modal/member-content.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import InternalTriggerLink from "#/atoms/links/internal-trigger-link.jsx";
import useModal from "#/hooks/useModal.js";

export default function Government() {
  const [modal, isOpen, setModal] = useModal(false)
  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Аппарат правительства"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="directory__head">
            <GovernmentMember isHead={true} name="Сластенин Владимир Владимирович" avatar="/img/man.png" position="Председатель правительства Республики Ингушетия" onClick={ () => setModal(true) } />
          </div>
          <div className="directory__items">
            <InternalTriggerLink title="Сагов Амирхан Юсупович" description="Первый заместитель руководителя аппарата Правительства Республики Ингушетия" key={ 1 } onClick={ () => setModal(true) }/>
            <InternalTriggerLink title="Евлоев Магомед Алиханович" description="Заместитель руководителя аппарата Правительства Республики Ингушетия" key={ 2 } onClick={ () => setModal(true) }/>
            <InternalTriggerLink title="Белхороева Зина Даудовна" description="Заместитель руководителя аппарата Правительства Республики Ингушетия, начальник управления региональной безопасности Правительства Ингушетии" key={ 3 } onClick={ () => setModal(true) }/>
            <InternalTriggerLink title="Погоров Муса Андиевич" description="Заместитель руководителя аппарата Правительства Республики Ингушетия" key={ 4 } onClick={ () => setModal(true) }/>
          </div>
          <hr/>
          <div className="structure__tree">
            <h3 className="structure-tree__title">Структурные подразделения аппарата Правительства</h3>
            <div className="structure-tree__items">
              <h4>Главное правовое управление</h4>
              <h4>Управление государственной службы и кадров</h4>
              <h4>Управление документационного обеспечения</h4>
              <h4>Управление по противодействию коррупции</h4>
              <h4>Управление бюджетного планирования и учета</h4>
              <h4>Управление региональной безопасности</h4>
              <h4>Управление протокола</h4>
              <h4>Управление материально-технического обеспечения</h4>
              <h4>Управление пресс-службы</h4>
              <h4>Управление координации Комплекса первого заместителя Председателя Правительства </h4>
              <h4>Управление координации Комплекса развития инфраструктуры</h4>
              <h4>Управление координации Комплекса экономического развития</h4>
              <h4>Управление координации Комплекса строительства</h4>
              <h4>Управление по мобилизационной работе</h4>
              <h4>Отдел по обеспечению деятельности Уполномоченного по правам человека</h4>
              <h4>Отдел по обеспечению деятельности Уполномоченного по правам ребенка</h4>
            </div>
          </div>
        </div>
        <div className="page-content__navigation">
          <GovernmentNavigation/>
        </div>
      </div>
      <AppFooter/>
      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Органы власти' }] } isOpen={ isOpen } handleClose={ () => setModal(false) }>
        <MemberContent name="Сластенин Владимир Владимирович"
                       avatar="/img/man.png"
                       position="Председатель правительства Республики Ингушетия"
                       contacts={ [{ title: 'Телефон', value: '+7 495 888-47-25' }, {
                         title: 'Факс',
                         value: '8 (8732) 37 48 94'
                       }] }
                       content="<p>Тимур Наильевич родился 2 июля 1965 года в городе Нижний Новгород. Он окончил Нижегородский государственный университет с красным дипломом по специальности Государственное и муниципальное управление.</p><p>Свою карьеру Фаттахов Тимур Наильевич начал в администрации Нижегородской области, где быстро продвинулся по служебной лестнице благодаря своему трудолюбию, организаторским способностям и умению находить общий язык с коллегами.</p>"
        />
      </Modal>
    </>
  )
}
