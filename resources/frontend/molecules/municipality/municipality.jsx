import './municipality.css'
import MunicipalityItem from "#/atoms/municipality/list.jsx";
import React from 'react';
import MunicipalityDemo from "#/atoms/municipality/demo.jsx";

export default function MunicipalityList({ title, items, selected, onActive, getProperties, onDetailsClick }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="municipalities__section">
      <h3 className="municipalities__section-title">{ title }</h3>
      <div className="municipalities__list">
        {
          items.map((settlement) => {
            return (
              <React.Fragment key={ settlement.id }>
                <MunicipalityItem active={ selected === settlement.id } id={ settlement.id } title={ settlement.title } onActive={ onActive }/>
                <MunicipalityDemo id={ settlement.id } title={ settlement.title } image={ settlement.image_main } properties={ getProperties(settlement) } isMobile={ true } isOpened={ selected === settlement.id } onDetailsClick={ onDetailsClick }/>
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  )
}
