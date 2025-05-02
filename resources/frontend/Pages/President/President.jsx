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
      content: <p>Родился 9 апреля 1959 года в селе Чамалган Каскеленского района Алма-Атинской области Казахской АССР (ныне – Республика Казахстан).
        Национальность – ингуш.
        С апреля 1977 по 1979 годы проходил срочную военную службу.
        Образование – высшее. В 1989 году окончил юридический факультет Куйбышевского (ныне – Самарского) государственного университета по специальности «Правоведение», юрист.</p>,
      id: 'drawer-1',
    },
    {
      title: 'Карьера',
      content:(
        <>
          <div>
            <p>С 1984 по 1990 годы работал в районных комитетах ВЛКСМ и КПСС г. Куйбышева (ныне – г. Самары).</p>
            <p>С 1990 года - на службе в органах прокуратуры.</p>
            <p>1990-1992 гг. - стажер, следователь, старший следователь прокуратуры Кировского района г. Куйбышева (Самары), старший следователь следственной части прокуратуры Самарской области.</p>
            <p>1992-1998 г.г. - прокурор отдела общего надзора прокуратуры Самарской области, заместитель прокурора, прокурор Кировского района г. Самары.</p>
            <p>В 1997-2004 годах работал в должности прокурора г. Самары, первого заместителя прокурора Самарской области.</p>
            <p>В период с 2004 по 2007 годы – прокурор Республики Ингушетия.</p>
            <p>С 2007 по 2012 годы возглавлял Контрольный департамент аппарата Правительства Самарской области, затем Губернатора Самарской области.</p>
            <p>2012-2015 гг. - советник Губернатора Самарской области.</p>
            <p>2015-2019 гг. - руководитель Управления Федеральной службы по надзору в сфере природопользования (Росприроднадзора) по Самарской области.</p>
            <p>26 июня 2019 года Указом Президента Российской Федерации В.В.Путина назначен временно исполняющим обязанности Главы Республики Ингушетия.</p>
            <p>8 сентября 2019 года избран Главой Республики Ингушетия по итогам тайного голосования на 58-м внеочередном заседании Народного Собрания Республики Ингушетия</p>
          </div>
        </>
      ),
      id: 'drawer-2',
    },
    {
      title: 'Награды',
      content: (
        <>
          <div>
            <p>
              Заслуженный юрист Российской Федерации.
            </p>
            <p>
              Государственный советник юстиции III класса.
            </p>
            <p>
              Государственный советник РФ II класса.
            </p>
            <p>
              Почетный работник прокуратуры РФ.
            </p>
          </div>
        </>
      ),
      id: 'drawer-3',
    },
    {
      title: 'Семья',
      content: (
        <>
          <div>
            <p>
              Женат, имеет двоих сыновей.
            </p>
          </div>
        </>
      ),
      id: 'drawer-4',
    },
  ];


  // Данные
  const headMember = {
    name: "Калиматов Махмуд-Али Макшарипович",
    avatar: "/storage/images/VB30CajzIs1HEFV4LZEunFVmtxnSB0NRNDOpu63Q.png",
    position: "Глава Республики Ингушетия",
    contacts: [
      { title: 'Телефон', value: '+7 495 888-47-25' },
      { title: 'Факс', value: '8 (8732) 37 48 94' }
    ],
    content: "<p></p>"
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title=""/>
      <div className="page-content__wrapper">
        <div className="page-content__content">

          <GovernmentMember
            isHead={true}
            name={headMember.name}
            avatar={headMember.avatar}
            position={headMember.position}
            // onClick={() => handleMemberClick(headMember)}
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
