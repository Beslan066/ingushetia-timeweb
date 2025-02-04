import React, { useState, useEffect } from "react";
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import AwardNavigation from "#/molecules/navigation/award-navigation.jsx";
import { usePage, router } from "@inertiajs/react";
import './civil.css';
import CivilserviceNavigation from "#/molecules/navigation/civilservice-navigation.jsx";

export default function CivilService({ documents: initialDocuments }) {
  const { props, url } = usePage();
  const documentTypes = props?.documentTypes || [];
  const [documents, setDocuments] = useState(initialDocuments.data);
  const [nextPage, setNextPage] = useState(initialDocuments.next_page_url);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDocuments(initialDocuments.data);
    setNextPage(initialDocuments.next_page_url);
  }, [initialDocuments]);

  const loadMore = () => {
    if (!nextPage || loading) return;

    setLoading(true);
    router.get(nextPage, {}, {
      preserveState: true,
      preserveScroll: true,
      only: ["documents"],
      onSuccess: ({ props }) => {
        setDocuments((prev) => [...prev, ...props.documents.data]);
        setNextPage(props.documents.next_page_url);
        setLoading(false);
      },
    });
  };

  return (
    <>
      <AppHeader anniversary={false} />
      <PageTitle title="Прохождение государственной гражданской службы в Администрации Главы и Правительства Республики Ингушетия"/>
      <div className="page-content__wrapper">
        <div className="page-content__content">
          {/* Отфильтрованные документы */}
          <div className="downloadable__documents">
            {documents.map((document) => (
              <Downloadable
                key={document.id}
                title={document.title}
                description={document.type}
                link={`/storage/${document.file}`}
              />
            ))}
          </div>
          {nextPage && (
            <button className="load-more-button" onClick={loadMore} disabled={loading}>
              {loading ? "Загрузка..." : "Показать ещё"}
            </button>
          )}
        </div>
        <CivilserviceNavigation />
      </div>
      <AppFooter />
    </>
  );
}
