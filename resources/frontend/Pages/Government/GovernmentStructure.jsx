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

export default function GovernmentStructure({ministers}) {
  const [modal, setModal] = useState(false)

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Состав правительства"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="government-team__wrapper">
            <GovernmentMember isHead={true} name="Сластенин Владимир Владимирович" avatar="/img/man.png" position="Председатель правительства Республики Ингушетия" onClick={ () => setModal(true) } />
            {ministers &&
              ministers.map((minister) => {
                return <GovernmentMember isHead={false} name={minister.name} avatar={`/storage/${minister.image_main}`} position={minister.position} onClick={ () => setModal(true) } />
              })
            }
          </div>
        </div>
        <div className="page-content__navigation">
          <GovernmentNavigation/>
        </div>
      </div>
      <AppFooter/>
      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Органы власти' }] } isOpen={ !!modal } handleClose={ () => setModal(false) }>
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
