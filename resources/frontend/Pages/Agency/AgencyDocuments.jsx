import React, { useState, useEffect } from "react";
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import DocumentsNavigation from "#/molecules/navigation/documents-navigation.jsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Head, router, Link, usePage } from "@inertiajs/react";
import './agency-documents.css';

export default function AgencyDocuments({ agency, documents: initialDocuments, documentTypes, meta = {} }) {
  const { url } = usePage();

  const [documents, setDocuments] = useState(initialDocuments.data);
  const [nextPage, setNextPage] = useState(initialDocuments.next_page_url);
  const [loading, setLoading] = useState(false);

  // Берем текущий фильтр из URL
  const [currentFilter, setCurrentFilter] = useState(() => {
    const params = new URLSearchParams(url.split('?')[1] || '');
    return params.get('type_id') || null;
  });

  // Синхронизируем локальный стейт, когда Inertia обновляет пропсы
  useEffect(() => {
    setDocuments(initialDocuments.data);
    setNextPage(initialDocuments.next_page_url);
  }, [initialDocuments]);

  // Загрузка следующих страниц (кнопка "Показать ещё")
  const loadMore = () => {
    if (!nextPage || loading) return;

    setLoading(true);

    const urlObj = new URL(nextPage);
    if (currentFilter) {
      urlObj.searchParams.set('type_id', currentFilter);
    } else {
      urlObj.searchParams.delete('type_id');
    }

    router.get(urlObj.toString(), {}, {
      preserveState: true,
      preserveScroll: true,
      only: ["documents"],
      onSuccess: ({ props }) => {
        setDocuments((prev) => [...prev, ...props.documents.data]);
        setNextPage(props.documents.next_page_url);
        setLoading(false);
      },
      onError: () => setLoading(false),
    });
  };

  // Обработчик смены фильтра в сайдбаре
  const handleFilterChange = (typeId) => {
    setCurrentFilter(typeId);

    const urlObj = new URL(window.location.pathname, window.location.origin);
    if (typeId) {
      urlObj.searchParams.set('type_id', typeId);
    }

    router.get(urlObj.toString(), {}, {
      preserveState: true, // Оставляем true, чтобы компонент не размонтировался
      preserveScroll: true,
    });
  };

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
      <Head>
        <title>{meta.title || "Документы"}</title>
        <meta name="description" content={meta.description || ""} />
      </Head>

      <AppHeader anniversary={false} />

      {/* Ссылка назад к агентству */}
      <div className="page-content__wrapper" style={{ paddingBottom: 0, marginBottom: 0, marginTop: '20px' }}>
        <div className="page-content__content" style={{ paddingBottom: 0 }}>
          <Link href={`/${agency.slug}`} className="back-link">
            ← Вернуться назад
          </Link>
        </div>
      </div>

      <PageTitle title="Документы" />

      <div className="page-content__wrapper">
        <div className="page-content__content">

          {documents.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
              У этого агентства пока нет документов
            </div>
          ) : (
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
          )}

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
