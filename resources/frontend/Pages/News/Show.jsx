import React from 'react';
import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PostContent from '#/atoms/modal/post-content';
import "../../atoms/modal/modal.css";
import Modal from "#/atoms/modal/modal.jsx";


export default function Show({ news, relatedPosts, openedNews }) {
  return (
    <Modal
      breadcrumbs={[{ title: "Главная" }, { title: "Новости" }, { title: openedNews?.title }]}
      isOpen={true}
    >
      <PostContent post={openedNews} />
    </Modal>
  );
}
