import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React, { useState } from "react";
import './region.css'
import Modal from "#/atoms/modal/modal.jsx";
import MilitaryContent from "#/atoms/modal/military-content.jsx";
import DownloadIcon from "@/Components/DownloadIcon.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";

export default function Anticorruption({ anticorruptions }) {
  const [modal, setModal] = useState(undefined);

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Противодействие коррупции"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <p><strong>Коррупция</strong> – злоупотребление служебным положением, дача взятки, получение взятки,
            злоупотребление
            полномочиями, коммерческий подкуп либо иное незаконное использование физическим лицом своего
            должностного положения вопреки законным интересам общества и государства в целях получения
            выгоды в виде денег, ценностей, иного имущества или услуг имущественного характера, иных
            имущественных прав для себя или для третьих лиц либо незаконное предоставление такой выгоды
            указанному лицу другими физическими лицами.
          </p>

          <p className={ 'mt-4' }>Сообщения о фактах коррупции можно оставлять по «телефону доверия» Главы Республики
            Ингушетия
            <a className={ 'ml-2' } href="tel:(4932) 41-14-44">(4932) 41-14-44</a>, а также направлять по электронной
            почте <a href="mailto:anticorruption@ingushetia.ru">anticorruption@ingushetia.ru</a>.
          </p>

          <div className="social-economics__documents">
            {
              anticorruptions &&
              anticorruptions.map((document) => (
                <Downloadable title={ document.title } key={ document.id } link={ `/storage/${ document.document_path }` }/>
              ))
            }
          </div>
        </div>
        <div className="page-content__navigation">
          <RegionsNavigation/>
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
