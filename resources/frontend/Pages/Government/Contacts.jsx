import '../Contacts/contacts.css'
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
      <PageTitle title="Контакты правительства"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="img">
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <a
                href="https://yandex.ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px', zIndex: 1, textDecoration: 'none' }}
              >
                Правительство Республики Ингушетия
              </a>
              <a
                href="https://yandex.ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px', zIndex: 1, textDecoration: 'none' }}
              >
                Исполнительная власть в Магасе
              </a>
              <iframe
                src="https://yandex.ru"
                width="100%"
                height="600px"
                frameBorder="0"
                allowFullScreen={true}
                style={{ position: 'relative', border: 'none' }}
              ></iframe>
            </div>
          </div>

          <div className="address">
            <div className="address__caption">Адрес</div>
            <div className="address__value">386001, Республика Ингушетия, г. Магас, пр. Идриса Зязикова, д. 12.</div>
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

        </div>
      </div>

      <AppFooter/>
    </>
  )
}
