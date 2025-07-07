import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import RegionsNavigation from "#/molecules/navigation/regions-navigation.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React from "react";
import './region.css'
import Accordion from "#/molecules/accordion/Accordion.jsx";
import { Head } from '@inertiajs/react' // Обратите внимание на импорт

export default function NationalProjects({ nationalgiProjects, meta = {} }) {
  // Установите значения по умолчанию
  const {
    title = 'Национальные проекты Ингушетии',
    description = 'Официальный сайт Республики Ингушетия'
  } = meta

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <AppHeader anniversary={ false }/>
      <PageTitle title="Национальные проекты"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="img">
            <img src="/img/pages/natProjects.png" alt="Центр города Магас, Республика Ингушетия" style={{maxHeight: '270px', maxWidth: '420px'}}/>
          </div>
          <p>В мае 2018 года Президент России Владимир Путин подписал
            Указ <a href="http://www.kremlin.ru/acts/bank/43027">«О национальных целях и стратегических задачах развития
              Российской Федерации на период до 2024 года»</a>, в котором определены 12 национальных проектов,
            направленных на обеспечение прорывного научно-технологического и социально-экономического развития России,
            повышения уровня жизни, создания условий и возможностей для самореализации и раскрытия таланта каждого
            человека. В целях осуществления прорывного развития Российской Федерации, увеличения численности населения
            страны, повышения уровня жизни граждан, создания комфортных условий для их проживания указом Президента
            Российской Федерации в июле 2020 года были определены национальные цели развития страны до 2030 года.</p>
          <blockquote>
            «Национальные проекты построены вокруг человека, ради достижения нового качества жизни для всех поколений,
            которое может быть обеспечено только при динамичном развитии России».
          </blockquote>
          <cite>
            <span>Владимир Путин<br/>Послание Президента Федеральному Собранию<br/>20 февраля 2019 года</span>
          </cite>
          <p>В Республике Ингушетия с 2019 года реализуются 14 национальных проектов. Для правового обеспечения
            реализации национальных проектов приняты распоряжение Главы Республики Ингушетия от 10.12.2018 № 126-р «Об
            организации проектной деятельности в Правительстве Ингушетии», в соответствии с которым ведется разработка и
            реализация региональных проектов, и указ Губернатора Респулике Ингушетия от 10.12.2018 № 122-уг «О создании
            совета при Главе Ингушетии по приоритетным проектам и стратегическому развитию Ингушетии».</p>
          <p>В 2024 году на реализацию национальных проектов из федерального и областного бюджетов предусмотрено 11,19
            млрд.руб.</p>

          <p>
            <b>
              Республика участвует в реализации следующих национальных проектов:
            </b>
          </p>
          <div className="accordion__items">
            {nationalProjects?.map(item => (
            <Accordion title={item.title}>
              <div className={'inline-img'}>
                <img src={`/storage/${item.image_main}`} alt=""/>
              </div>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </Accordion>
            ))}
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
