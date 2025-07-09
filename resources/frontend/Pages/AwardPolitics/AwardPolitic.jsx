import React, { useState, useEffect } from "react";
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Downloadable from "#/atoms/downloadable/downloadable.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import AwardNavigation from "#/molecules/navigation/award-navigation.jsx";
import {usePage, router, Head} from "@inertiajs/react";
import './awardpol.css';

export default function AwardPolitic({ documents: initialDocuments, meta = {} }) {
  const { props, url } = usePage();
  const documentTypes = props?.documentTypes || [];
  const [documents, setDocuments] = useState(initialDocuments.data);
  const [nextPage, setNextPage] = useState(initialDocuments.next_page_url);
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('type_id') || null;
  });

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
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <AppHeader anniversary={false} />
      <PageTitle title="Наградная политика"/>
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
        <AwardNavigation />
      </div>
      <AppFooter />
    </>
  );
}
