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

export default function Documents({ documents: initialDocuments, documentTypes }) {
  const [documents, setDocuments] = useState(initialDocuments.data);
  const [nextPage, setNextPage] = useState(initialDocuments.next_page_url);
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('type_id') || null;
  });

  // Функция загрузки следующей страницы с учетом фильтра
  const loadMore = () => {
    if (!nextPage || loading) return;

    setLoading(true);

    // Создаем URL для запроса с сохранением фильтра
    const url = new URL(nextPage);
    if (currentFilter) {
      url.searchParams.set('type_id', currentFilter);
    } else {
      url.searchParams.delete('type_id');
    }

    router.get(url.toString(), {}, {
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

  // Обновление списка при возврате вверх
  const refreshDocuments = () => {
    const url = new URL(window.location.pathname, window.location.origin);

    if (currentFilter) {
      url.searchParams.set('type_id', currentFilter);
    }

    router.get(url.toString(), {}, {
      preserveState: false,
      onSuccess: ({ props }) => {
        setDocuments(props.documents.data);
        setNextPage(props.documents.next_page_url);
      },
    });
  };

  // Обработчик изменения фильтра
  const handleFilterChange = (typeId) => {
    setCurrentFilter(typeId);
    const url = new URL(window.location.pathname, window.location.origin);

    if (typeId) {
      url.searchParams.set('type_id', typeId);
    }

    router.get(url.toString(), {}, {
      preserveState: false,
      onSuccess: ({ props }) => {
        setDocuments(props.documents.data);
        setNextPage(props.documents.next_page_url);
      },
    });
  };

  // Обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        refreshDocuments();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentFilter]);

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
        <DocumentsNavigation
          documentTypes={documentTypes}
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <AppFooter />
    </>
  );
}
