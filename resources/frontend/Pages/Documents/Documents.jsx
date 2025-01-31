import React, { useState, useEffect } from "react";
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { router } from "@inertiajs/react";
import './documents.css';

export default function Documents({ documents: initialDocuments }) {
  const [documents, setDocuments] = useState(initialDocuments.data);
  const [nextPage, setNextPage] = useState(initialDocuments.next_page_url);
  const [loading, setLoading] = useState(false);

  // Функция загрузки следующей страницы
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

  // Функция обновления списка при возврате вверх
  const refreshDocuments = () => {
    router.get(window.location.pathname, {}, {
      preserveState: false, // Сбрасываем состояние
      onSuccess: ({ props }) => {
        setDocuments(props.documents.data);
        setNextPage(props.documents.next_page_url);
      },
    });
  };

  // Следим за скроллом страницы
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        refreshDocuments(); // Обновить данные, если пользователь вернулся вверх
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const timePart = format(date, "HH:mm");
    const datePart = format(date, "d MMMM", { locale: ru });
    return now.getFullYear() !== date.getFullYear()
      ? `${timePart}, ${datePart} ${date.getFullYear()}`
      : `${timePart}, ${datePart}`;
  };

  const formatSize = (size) => {
    if (!size) return "";
    const kb = size / 1024;
    return kb >= 1024 ? `${(kb / 1024).toFixed(2)} МБ` : `${kb.toFixed(2)} КБ`;
  };

  return (
    <>
      <AppHeader anniversary={false} />
      <PageTitle title="Документы" />
      <div className="page-content__wrapper">
        <div className="page-content__content">
          <div className="downloadable__documents">
            {documents.map((document) => (
              <Downloadable
                key={document.id}
                title={document.title}
                description={`${document.type}  ${formatDate(document.published_at)}  ${formatSize(document.size)}`}
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
        <DocumentsNavigation />
      </div>
      <AppFooter />
    </>
  );
}
