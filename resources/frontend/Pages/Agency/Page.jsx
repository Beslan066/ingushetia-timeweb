import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppHeader from "#/molecules/header/header.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import './../Region/region.css'; // Подставьте правильный путь к вашему CSS

export default function GovernmentPage({ page, sidebarPages, meta }) {
  // Получаем URL из Inertia, чтобы хедер понял, что это страница правительства
  const { url } = usePage();

  return (
    <>
      <Head>
        <title>{meta?.title || page?.title}</title>
        <meta name="description" content={meta?.description} />
      </Head>

      {/* Передаем sidebarPages, чтобы в меню не пропадали ссылки */}
      <AppHeader anniversary={false} sidebarPages={sidebarPages} />

      {/* Заголовок страницы берем из базы */}
      <PageTitle title={page?.title || 'Страница'} />

      <div className="page-content__wrapper">
        {/* Убрали правую колонку с навигацией, оставили только контент */}
        <div className="page-content__content">

          {/* Если контент приходит как HTML-строка из базы (например, из WYSIWYG-редактора): */}
          {page?.content ? (
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          ) : (
            <p>Контент для этой страницы пока не заполнен.</p>
          )}

        </div>
      </div>

      <AppFooter />
    </>
  );
}
