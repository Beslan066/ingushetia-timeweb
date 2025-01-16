import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Accordion from "#/molecules/accordion/Accordion.jsx";
import './region.css'
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";

export default function Region() {
  const sections = [
    {
      title: 'География',
      content: <p>Территория И. расположена...</p>,
      id: 'drawer-1',
    },
    {
      title: 'Рельеф, геология и полезные ископаемые',
      content: <p>Важнейшие полезные ископаемые И. – нефть и природный газ...</p>,
      id: 'drawer-2',
    },
    {
      title: 'Полезные ископаемые',
      content: (
        <>
          <p>
            Территория И. расположена в пределах складчато-покровной системы
            Большого Кавказа Альпийско-Гималайского подвижного пояса. Северная часть
            И. (Терский и Сунженский хребты, разделённые Алханчуртской долиной,
            Чеченская равнина) находится в пределах Терско-Каспийского передового
            прогиба (заполнен олигоцен-неогеновой молассой), строение которого
            осложнено Терским и Сунженским валами. Тектоническая зона северного
            склона Большого Кавказа (Чёрные горы, Пастбищный и Скалистый хребты)
            сложена наклонно залегающими шельфовыми терригенно-карбонатными
            отложениями верхней юры – эоцена (глинами, песчаниками, мергелями,
            известняками, доломитами). В осевой зоне (антиклинорий Бокового хребта)
            развита интенсивно деформированная черносланцевая формация нижней и
            средней юры. Горная Ингушетия область интенсивной сейсмичности.
          </p>
          <img className="w-100" src="/img/Rectangle 1.png" alt="" />
        </>
      ),
      id: 'drawer-3',
    },
  ];


  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="О республике Ингушетия"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="img">
            <img src="/img/content/magas.webp" alt="Центр города Магас, Республика Ингушетия"/>
            <span className="img__description">Центр города Магас, Республика Ингушетия</span>
          </div>
          <p>Ингушетия самая молодая республика в составе Российской Федерации, образованная 4 июня 1992 года,
            расположена на северных склонах предгорья Большого Кавказского хребта, в центральной его части.</p>
          <p>Республика Ингушетия граничит с Северной Осетией и Чеченской Республикой. По территории республики проходит участок государственной границы Российской Федерации с Республикой Грузия.</p>
          <p>В республике насчитывается 4 района, 5 городов республиканского подчинения. Столица —город Магас.</p>
          <p>Климат континентальный. Основная река — Сунжа. Протекают также реки Асса, Фортанга, Армхи, Гулойхи, Фазтонка, Чемульга. Общая площадь бассейна рек составляет 3073 км².</p>
          <div className="accordion__items">
            {
              sections && sections.map(section => (
                <Accordion title={ section.title } key={ section.id }>{ section.content }</Accordion>
              ))
            }
          </div>
        </div>
        <div className="page-content__navigation">
          <RegionsNavigation />
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
