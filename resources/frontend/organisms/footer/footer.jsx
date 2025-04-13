import './footer.css';
import { Link } from "@inertiajs/react";
import AnniversaryLogoImage from "#/atoms/logos/anniversary.jsx";
import LogoImage from "#/atoms/logos/default.jsx";
import Button from "#/atoms/buttons/button.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import ContactsContent from "#/atoms/modal/contacts-content.jsx";
import React, { useState } from "react";
import useModal from "#/hooks/useModal.js";

export default function AppFooter({ anniversary = false }) {
  const [modal, isOpen, setModal] = useModal(false);

  const groups = [
    {
      name: 'Органы власти',
      links: [
        { link: '/president', name: 'Глава республики' },
        { link: '/government', name: 'Правительство РИ' },
        { link: '/', name: 'Федеральные органы власти' },
      ]
    },
    {
      name: 'Регион',
      links: [
        { link: '/', name: 'Государственная символика, гимн' },
        { link: '/', name: 'Правовой статус и правовое устройство' },
        { link: '/', name: 'Географическое положение и прир. ресурсы' },
        { link: '/', name: 'Население и трудовые ресурсы' },
        { link: '/', name: 'Промышленность и сельское хозяйство' },
        { link: '/', name: 'Инвестиционная привлекательность' },
        { link: '/', name: 'Культура и история' },
        { link: '/', name: 'Исторический формуляр' },
        { link: '/', name: 'Штандарт Главы Республики Ингушетия' },
      ]
    },
    {
      name: 'Для СМИ',
      links: [
        { link: '/news', name: 'Новости' },
        { link: '/media?category=photo', name: 'Фоторепортажи' },
        { link: '/media?category=video', name: 'Видеорепортажи' },
      ]
    },
    {
      name: 'Документы',
      links: [
        { link: '/documents?type_id=0', name: 'Акты' },
        { link: '/documents?type_id=1', name: 'Законы' },
        { link: '/documents?type_id=2', name: 'Постановления' },
        { link: '/documents?type_id=3', name: 'Указы' },
        { link: '/documents?type_id=4', name: 'Распоряжения' },
        { link: '/documents', name: 'Все' },
      ]
    }
  ]

  return (
    <>
      <footer className="footer">
        <div className="link-groups">
          {
            groups.map((group) => {
              return (
                <div className="link-group" key={ group.name }>
                  <h3 className="link-group__title">{ group.name }</h3>
                  <div className="link-group__links">
                    {
                      group.links.map((link) => {
                        return <Link key={ link.name } href={ link.link } className="link-group__link">{ link.name }</Link>
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="footer__about">
          <div className="about__site">
            { anniversary ? <AnniversaryLogoImage/> : <LogoImage/> }
            <div className="footer__name">Официальный сайт администрации Республики Ингушетия</div>
          </div>
          <Button text="Задать вопрос" handleClick={ () => setModal(true) } />
        </div>
      </footer>
      <footer className="copyright">&copy; 2024, Все права защищены</footer>

      <Modal isOpen={ isOpen } handleClose={ () => setModal(false) } stickyOnBottom={ false }>
        <ContactsContent onClose={() => setModal(false)} />
      </Modal>
    </>
  )
}
