import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import React, { useState } from "react";
import './awardpol.css';
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";

export default function AwardPolitic({ documents, types }) {
  const [selectedType, setSelectedType] = useState(null);

  // Фильтрация документов
  const filteredDocuments = selectedType !== null
    ? documents.filter((document) => document.type === selectedType)
    : documents;

  return (
    <>
      <AppHeader anniversary={false} />
      <PageTitle title="Наградная политика"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          {/* Выпадающий список для фильтра */}
          <div className="filter-dropdown">
            <select
              id="document-filter"
              value={selectedType || ""}
              onChange={(e) =>
                setSelectedType(e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">Все</option>
              {types.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Отфильтрованные документы */}
          <div className="downloadable__documents">
            {filteredDocuments.map((document) => (
              <Downloadable
                title={document.title}
                description={types.find((type) => type.id === document.type)?.title}
                key={document.id}
                link={`/storage/${document.file}`}
              />
            ))}
          </div>
        </div>
        <div>
          <DocumentsNavigation />
        </div>
      </div>
      <AppFooter />
    </>
  );
}
