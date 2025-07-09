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
import {Head} from "@inertiajs/react";

export default function GovernmentStructure({ministers, headMember, meta = {}}) {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Состав правительства"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="government-team__wrapper">
            <GovernmentMember
              isHead={true}
              name={headMember.name}
              avatar={`/storage/${headMember.image_main}`}
              position={headMember.position}
              contact={headMember.contact}
            />
            {ministers &&
              ministers.map((minister) => {
                return (
                  <GovernmentMember
                    key={minister.id} // Добавьте key для списка
                    isHead={false}
                    name={minister.name}
                    avatar={`/storage/${minister.image_main}`}
                    position={minister.position}
                    contact={minister.contact}
                    // onClick={() => handleMemberClick(minister)}
                  />
                )
              })
            }
          </div>
        </div>
        <div className="page-content__navigation">
          <GovernmentNavigation/>
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
