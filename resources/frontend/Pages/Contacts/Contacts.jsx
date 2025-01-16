import './contacts.css'
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React, { useEffect, useState } from "react";
import GovernmentNavigation from "#/molecules/navigation/government-navigation.jsx";
import Button from "#/atoms/buttons/button.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import ContactsContent from "#/atoms/modal/contacts-content.jsx";
import useModal from "#/hooks/useModal.js";

export default function Contacts({ contacts }) {
  const [modal, isOpen, setModal] = useModal(null)

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Контакты"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="img">
            <img src="/img/yamap.png" alt="Республика Ингушетия, г. Магас, ул. Зязикова, 14"/>
          </div>
          <div className="address">
            <div className="address__caption">Адрес</div>
            <div className="address__value">Республика Ингушетия, г. Магас, ул. Зязикова, 14</div>
          </div>

          <div className="contacts">
            {
              contacts && contacts.map((contact) => (
                <div className="contact" key={ contact.id }>
                  <div className="contact__title">{ contact.title }</div>
                  <div className="contact__content" dangerouslySetInnerHTML={ { __html: contact.content } }></div>
                </div>
              ))
            }
          </div>

          <div className="contact-us">
            <p>По всем вопросам обращайтесь по указанным номерам телефонов круглосуточных ЕДДС муниципальных образований
              Республики Ингушетия</p>
            <Button handleClick={() => setModal(true)}>Написать нам</Button>
          </div>
        </div>
        <div className="page-content__navigation">
          <GovernmentNavigation/>
        </div>
      </div>

      <AppFooter/>
      <Modal isOpen={ isOpen } handleClose={ () => setModal(false) } stickyOnBottom={ false }>
        <ContactsContent onClose={() => setModal(false)} />
      </Modal>
    </>
  )
}
