import './president.css'
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import React, { useState } from "react";
import AppFooter from "#/organisms/footer/footer.jsx";
import GovernmentNavigation from "#/molecules/navigation/government-navigation.jsx";
import GovernmentMember from "#/atoms/government/Member.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import MilitaryContent from "#/atoms/modal/military-content.jsx";
import MemberContent from "#/atoms/modal/member-content.jsx";
import Accordion from "#/molecules/accordion/Accordion.jsx";

export default function President({ministers}) {
  const [selectedMember, setSelectedMember] = useState(null);


  const sections = [
    {
      title: 'Биография',
      content: <p>Биография Главы...</p>,
      id: 'drawer-1',
    },
    {
      title: 'Карьера',
      content: <p>...</p>,
      id: 'drawer-2',
    },
    {
      title: 'Награды',
      content: (
        <>
          <p>
           Награды Главы Ингушетии
          </p>
          <img className="w-100" src="/img/Rectangle 1.png" alt="" />
        </>
      ),
      id: 'drawer-3',
    },
  ];


  // Данные председателя правительства
  const headMember = {
    name: "Калиматов Махмуд-Али Макшарипович",
    avatar: "/img/president.jpg",
    position: "Глава Республики Ингушетия",
    contacts: [
      { title: 'Телефон', value: '+7 495 888-47-25' },
      { title: 'Факс', value: '8 (8732) 37 48 94' }
    ],
    content: "<p>Тимур Наильевич родился 2 июля 1965 года в городе Нижний Новгород. Он окончил Нижегородский государственный университет с красным дипломом по специальности Государственное и муниципальное управление.</p><p>Свою карьеру Фаттахов Тимур Наильевич начал в администрации Нижегородской области, где быстро продвинулся по служебной лестнице благодаря своему трудолюбию, организаторским способностям и умению находить общий язык с коллегами.</p>"
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Глава Республики"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">

          <GovernmentMember
            isHead={true}
            name={headMember.name}
            avatar={headMember.avatar}
            position={headMember.position}
            onClick={() => handleMemberClick(headMember)}
          />

          <div className="accordion__items">
            {
              sections && sections.map(section => (
                <Accordion title={ section.title } key={ section.id }>{ section.content }</Accordion>
              ))
            }
          </div>

          <div className="government-team__wrapper">
            {ministers &&
              ministers.map((minister) => {
                return (
                  <GovernmentMember
                    key={minister.id}
                    isHead={false}
                    name={minister.name}
                    avatar={`/storage/${minister.image_main}`}
                    position={minister.position}
                    onClick={() => handleMemberClick(minister)}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
      <AppFooter/>

      <Modal
        breadcrumbs={[{ title: 'Главная' }, { title: 'Органы власти' }]}
        isOpen={!!selectedMember}
        handleClose={() => setSelectedMember(null)}
      >
        {selectedMember && (
          <MemberContent
            name={selectedMember.name}
            avatar={selectedMember.image_main}
            position={selectedMember.position}
            contacts={selectedMember.contacts || []} // Добавляем проверку на наличие contacts
            content={selectedMember.content || ''} // Добавляем проверку на наличие content
          />
        )}
      </Modal>
    </>
  )
}
