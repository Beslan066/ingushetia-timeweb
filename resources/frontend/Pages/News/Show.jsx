import React from 'react';
import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PostContent from '#/atoms/modal/post-content';
import "../../atoms/modal/modal.css";
import Modal from "#/atoms/modal/modal.jsx";
import MetaTags from "#/molecules/MetaTags.jsx";


export default function Show({ news, relatedPosts, openedNews, meta }) {
  return (
    <Modal
      breadcrumbs={[{ title: "Главная" }, { title: "Новости" }, { title: openedNews?.title }]}
      isOpen={true}
    >

      <MetaTags
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        og_image={meta.og_image}
        canonical={meta.canonical}
      />
      <PostContent post={openedNews} />
    </Modal>
  );
}
