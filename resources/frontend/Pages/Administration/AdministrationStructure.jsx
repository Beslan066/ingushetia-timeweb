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

export default function AdministrationStructure({administratorsByType, headMember}) {
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
          {/* Выводим главу отдельно */}
          <div className="government-team__wrapper government-team-columns">
            <GovernmentMember
              isHead={true}
              name={headMember.name}
              avatar={`/storage/${headMember.image_main}`}
              position={headMember.position}
            />
          </div>

          {/* Выводим администраторов по категориям */}
          {administratorsByType && Object.entries(administratorsByType).map(([typeId, admins]) => {
            // typeId может быть null, если administration_types_id не установлен
            const typeName = admins[0]?.type?.name || "Без категории";

            return (
              <div key={typeId} className="government-category">
                <h2 className="government-category__title">{typeName}</h2>
                <div className="government-team__wrapper government-team-columns">
                  {admins.map((admin) => (
                    <GovernmentMember
                      key={admin.id}
                      isHead={false}
                      name={admin.name}
                      avatar={`/storage/${admin.image_main}`}
                      position={admin.position}
                      // onClick={() => handleMemberClick(admin)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
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
            contacts={selectedMember.contacts || []}
            content={selectedMember.content || ''}
          />
        )}
      </Modal>
    </>
  )
}
