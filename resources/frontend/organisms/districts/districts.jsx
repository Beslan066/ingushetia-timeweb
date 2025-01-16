import './districts.css';
import React, { useState } from "react";
import MunicipalityList from "#/molecules/municipality/municipality.jsx";
import MunicipalityDemo from "#/atoms/municipality/demo.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import MunicipalityContent from "#/atoms/modal/municipality-content.jsx";
import useModal from "#/hooks/useModal.js";

export default function Districts({ districts, settlements }) {
  if (!districts && !settlements) {
    return null;
  }

  const first = settlements.length ? settlements[0] : districts[0]
  const [selected, setSelected] = useState(first.id);
  const [currentSettlement, setCurrentSettlement] = useState(first);

  const list = [
    { title: 'Городские округа', items: settlements },
    { title: 'Муниципальные районы', items: districts },
  ]

  const findSettlementById = (id) => {
    const items = [...districts, ...settlements];
    return items.find(value => value.id === id);
  }

  const handleChange = (id) => {
    setSelected(id);
    setCurrentSettlement(findSettlementById(id))
  }

  const getProperties = (settlement) => [
    { slug: 'founded', title: 'Основан', value: settlement.year },
    { slug: 'square', title: 'Площадь', value: settlement.square },
    { slug: 'population', title: 'Население', value: settlement.population },
    { slug: 'supervisor', title: 'Глава адм.', value: settlement.supervisor.name },
  ]

  const [slide, isOpen, setSlide] = useModal(null);
  const handlePost = (item) => {
    setSlide(item)
  }

  return (
    <div className="municipalities">
      <h2 className="municipalities__title">Районы и округа</h2>
      <div className="municipalities__wrapper">
        <div className="municipalities__list-wrapper">
          {
            list.map((item) =>
              <MunicipalityList selected={ selected } title={ item.title } items={ item.items } key={ item.title } onActive={ handleChange } getProperties={ getProperties } onDetailsClick={ () => handlePost(item) }/>)
          }
        </div>
        <div className="municipalities__info-wrapper">
          <MunicipalityDemo id={ currentSettlement.id } title={ currentSettlement.title } image={ currentSettlement.image_main } properties={ getProperties(currentSettlement) } isMobile={ false } isOpened={ true } onDetailsClick={ () => handlePost(currentSettlement) }/>
        </div>
      </div>

      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Регионы и округа' }, { title: slide?.title }] } isOpen={ isOpen } handleClose={ () => setSlide(null) }>
        <MunicipalityContent municipality={ slide }/>
      </Modal>
    </div>
  )
}
