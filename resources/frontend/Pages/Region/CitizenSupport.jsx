import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Accordion from "#/molecules/accordion/Accordion.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React, { useState } from "react";
import './region.css'
import Package from "#/atoms/citizen-support/package.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import MilitaryContent from "#/atoms/modal/military-content.jsx";
import useModal from "#/hooks/useModal.js";
import {Head} from "@inertiajs/react";

export default function CitizenSupport ({ citizenSupportPackages, businessSupportPackages, meta = {} }) {
  const [modal, isOpen, setModal] = useModal(null);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Поддержка экономики и граждан"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <p>Сформирован пакет мер поддержки граждан и бизнеса в условиях санкций, который включает решения для малого и среднего бизнеса, аграрного сектора, IT-компаний, строительной отрасли, сферы закупок и других отраслей.</p>
          <p>Пакет мер поддержки будет дополняться. Мы в тесном контакте с Правительством РФ: направляем предложения с новыми мерами поддержки, которые вырабатываются совместно с предпринимательским сообществом региона.</p>

          <div className="packages">
            <h3 className="packages__title">Для граждан</h3>
            <div className="packages__contents">
              {
                citizenSupportPackages && citizenSupportPackages.map((item) => <Package key={item.id} title={ item.title } description={ item.lead } onClick={ () => setModal(item) } />)
              }
            </div>
          </div>
          <div className="packages">
            <h3 className="packages__title">Для бизнеса</h3>
            <p className="package__description">Проконсультироваться по мерам поддержки можно на горячей линии центра «Мой бизнес»</p>
            <div className="packages__contents">
              {
                businessSupportPackages && businessSupportPackages.map((item) => <Package key={item.id} title={ item.title } description={ item.lead } onClick={ () => setModal(item) } />)
              }
            </div>
          </div>
        </div>
        <div className="page-content__navigation">
          <RegionsNavigation />
        </div>
      </div>
      <AppFooter/>
      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Поддержка экономики и граждан' }] } isOpen={ isOpen } handleClose={ () => setModal(null) }>
        <MilitaryContent document={ modal }/>
      </Modal>
    </>
  )
}
