import React from "react";
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import './vectors.css';
import PopularSpotlights from "#/molecules/spotlights/popular-spotlights.jsx";
import DownloadIcon from "@/Components/DownloadIcon.jsx";
import Checkmark from "#/atoms/icons/checkmark.jsx";

export default function VectorSingle({ vector, news, spotlights }) {
  // Функция для форматирования даты
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: ru });
  };

  return (
    <>
      <AppHeader anniversary={false} />
      <PageTitle title={vector.name} />

      <div className="page-content__wrapper">
        <div className="page-content__content">

          <div className="post__image">
            <img
              src={`/storage/${vector.image_main}`}
              alt={vector.name}
            />
          </div>

          {vector.description &&
            <div dangerouslySetInnerHTML={{ __html: vector.description }} className={'mb-2'}>

            </div>
          }

          <div className="downloadable__documents">
            {/* Выводим секции вектора в Downloadable */}
            {vector.sections && vector.sections.map((section) => (

              <div className="downloadable" style={{justifyContent: 'start'}}>
                <div className="vector__checkmark">
                  <Checkmark color="primary-medium" />
                </div>
                <div className="downloadable__info">
                  <div className="downloadable__title">{section.title}</div>
                  <div className="downloadable__description">{section.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-announce-wrapper">
          <PopularSpotlights
            news={news} // Передаем новости вектора вместо spotlights
            className="spotlight-sidebar--desktop"
          />
        </div>
      </div>

      <AppFooter />
    </>
  );
}
