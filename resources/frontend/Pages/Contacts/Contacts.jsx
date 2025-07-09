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
import {Head} from "@inertiajs/react";

export default function Contacts({ contacts, meta = {} }) {
  const [modal, isOpen, setModal] = useModal(null)

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Контакты"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="img">
            <div style={{position: 'relative', overflow: 'hidden',}}><a
              href="https://yandex.ru/maps/org/administratsiya_glavy_i_pravitelstva_respubliki_ingushetiya/139756145867/?utm_medium=mapframe&utm_source=maps"
              style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '0px'}}>Администрация Главы и Правительства
              республики Ингушетия</a><a
              href="https://yandex.ru/maps/20181/magas/category/administration/184105658/?utm_medium=mapframe&utm_source=maps"
              style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '14px'}}>Администрация в Магасе</a>
              <iframe
                src="https://yandex.ru/map-widget/v1/org/administratsiya_glavy_i_pravitelstva_respubliki_ingushetiya/139756145867/?ll=44.806664%2C43.166531&z=17"
                width="100%"  height={'600px'} frameBorder="1" allowFullScreen="true" style={{position: 'relative'}}></iframe>
            </div>
          </div>
          <div className="address">
            <div className="address__caption">Адрес</div>
            <div className="address__value">Республика Ингушетия, г. Магас, ул. Зязикова, 14</div>
          </div>

          <div className="contacts">
            {
              contacts && contacts.map((contact) => (
                <div className="contact" key={contact.id}>
                  <div className="contact__title">{contact.title}</div>
                  <div className="contact__content" dangerouslySetInnerHTML={{__html: contact.content}}></div>
                </div>
              ))
            }
          </div>

          <div className="contact-us">
            <Button handleClick={() => setModal(true)}>Написать нам</Button>
          </div>
        </div>
      </div>

      <AppFooter/>
      <Modal isOpen={ isOpen } handleClose={ () => setModal(false) } stickyOnBottom={ false }>
        <ContactsContent onClose={() => setModal(false)} />
      </Modal>
    </>
  )
}
