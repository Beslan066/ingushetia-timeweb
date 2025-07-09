import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Accordion from "#/molecules/accordion/Accordion.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React, { useState } from "react";
import './region.css'
import MunicipalityElement from "#/atoms/municipality/element.jsx";
import MunicipalityContent from "#/atoms/modal/municipality-content.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import useModal from "#/hooks/useModal.js";
import {Head} from "@inertiajs/react";

export default function Municipality({ cities, districts, meta = {} }) {
  const [selected, isOpen, setSelected] = useModal(undefined)
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="О республике Ингушетия"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="img">
            <img src="/img/map.png" alt="Центр города Магас, Республика Ингушетия"/>
          </div>
          <p>Республика была последним субъектом Федерации, в котором были образованы органы местного самоуправления, это произошло лишь в 2009 году. Тогда были созданы 4 городских округа, 4 муниципальных района и 38 сельских поселений, одно из которых в 2015 году получило статус городского поселения, а в конце 2016 года преобразовано в городской округ. Ещё одно в 2010 году ликвидировано путём присоединения к другому сельскому поселению.</p>
          <h3 className="municipality-page-section__header">Городские округа</h3>
          <div className="municipality-page__municipalities">
            {
              cities && cities.map((city) => <MunicipalityElement title={city.title} population={city.population} onClick={ () => setSelected(city) } key={city.id} />)
            }
          </div>
          <h3 className="municipality-page-section__header">Муниципальные районы</h3>
          <div className="municipality-page__municipalities">
            {
              districts && districts.map((city) => <MunicipalityElement title={city.title} population={city.population} onClick={ () => setSelected(city) } key={city.id} />)
            }
          </div>
        </div>
        <div className="page-content__navigation">
          <RegionsNavigation />
        </div>
      </div>
      <AppFooter/>
      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Регионы и округа' }, { title: selected?.title }] } isOpen={ isOpen } handleClose={ () => setSelected(null) }>
        <MunicipalityContent municipality={ selected }/>
      </Modal>
    </>
  )
}
