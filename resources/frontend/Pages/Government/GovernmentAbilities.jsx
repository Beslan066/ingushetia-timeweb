import './government.css'
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import React from "react";
import AppFooter from "#/organisms/footer/footer.jsx";
import GovernmentNavigation from "#/molecules/navigation/government-navigation.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";

export default function GovernmentAbilities() {
  const documents = [
    {
      title: 'Закон Республики Ингушетия «Устав Республики Ингушетия» от 18.02.2009 № 20-ОЗ',
      document_type: 'PDF',
      document_size: '221 КБ',
      document_path: '',
      id: 1
    },
    {
      title: 'Указ Главы Республики Ингушетия от 06.02.2019 № 16-уг',
      document_type: 'PDF',
      document_size: '2 499 КБ',
      document_path: '',
      id: 2
    },
    {
      title: 'Закон Республики Ингушетия «О Правительстве Республики Ингушетия и исполнительных органах государственной власти республики» от 06.05.2011 № 42-ОЗ',
      document_type: 'PDF',
      document_size: '63 КБ',
      document_path: '',
      id: 3
    },
  ]

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Полномочия правительства"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <p>Правительство Ингушетии, действуя в рамках конституции и законов республики, обладает широким спектром
            полномочий. Оно отвечает за реализацию государственной политики, управление экономикой, социальной сферой,
            обеспечение правопорядка, защиту прав и свобод граждан, а также за внешние связи и интеграцию региона в
            международные процессы. Эти полномочия позволяют правительству эффективно управлять республикой, способствуя
            её стабильному развитию и благополучию населения.</p>
          <div className="downloadable__documents">
            {
              documents && documents.map((document) =>
                <Downloadable title={ document.title } description={ `${ document.document_type }, ${ document.document_size }` } key={ document.id } link={ `/storage/${ document.document_path }` }/>)
            }
          </div>
        </div>
        <div className="page-content__navigation">
          <GovernmentNavigation/>
        </div>
      </div>
      <AppFooter/>
    </>
  )
}
