import './administration.css'
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import React, { useState } from "react";
import AppFooter from "#/organisms/footer/footer.jsx";
import GovernmentNavigation from "#/molecules/navigation/government-navigation.jsx";
import GovernmentMember from "#/atoms/government/Member.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import MilitaryContent from "#/atoms/modal/military-content.jsx";
import MemberContent from "#/atoms/modal/member-content.jsx";

export default function AdministrationStructure({admnistrators, headMember}) {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Администрация Главы РИ"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="government-team__wrapper">
            <GovernmentMember
              isHead={true}
              name={headMember.name}
              avatar={headMember.avatar}
              position={headMember.position}
              onClick={() => handleMemberClick(headMember)}
            />
            {admnistrators &&
              admnistrators.map((admnistrator) => {
                return (
                  <GovernmentMember
                    key={admnistrator.id} // Добавьте key для списка
                    isHead={false}
                    name={admnistrator.name}
                    avatar={`/storage/${admnistrator.image_main}`}
                    position={admnistrator.position}
                    onClick={() => handleMemberClick(admnistrator)}
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
