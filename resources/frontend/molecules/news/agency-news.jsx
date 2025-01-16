import './agency-news.css'
import Tabs from "#/atoms/tabs/tabs.jsx";
import React, { useState } from "react";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import AppLink from "#/atoms/buttons/link.jsx";

export default function AgencyNews({ agencies, posts }) {
  const [selectedTab, setSelectedTab] = useState(null);

  const onTabSwitch = (tab) => {
    setSelectedTab(tab);
  }

  const filteredNews = selectedTab ? posts.filter((post) => post.agency_id === selectedTab).slice(0, 8) : posts.slice(0, 8);
  const tabs = agencies.map((agency) => {
    return { id: agency.id, title: agency.name }
  });

  const [slide, setSlide] = useState(null);
  const handlePost = (id) => {
    const selected = posts.find((post) => post.id === id);
    if (selected) {
      setSlide(selected);
    }
  }

  return (
    <div className="agency-news">
      <div className="agency-news__wrapper">
        <h2 className="agency-news__title">Новости министерств</h2>
        <Tabs tabs={ tabs } onTab={ onTabSwitch } selected={ selectedTab }/>
        <div className={ `agency-posts ${filteredNews.length <= 4 ? 'agency-posts--one-row' : ''}` }>
          {
            filteredNews.map((post) => {
              return (
                <AgencyNewsItem key={ post.id }
                                id={ post.id }
                                category={ post?.category?.title }
                                image={ post?.image_main }
                                date={ post.published_at }
                                title={ post.title }
                                onPost={ handlePost }/>
              )
            })
          }
        </div>
        <AppLink title="Все новости министерств" to="/agencies" />
      </div>

      <Modal breadcrumbs={ [{ title: 'Главная' }, { title: 'Новости министерств' }, { title: slide?.title }] } isOpen={ slide } handleClose={ () => setSlide(null) }>
        <PostContent post={ slide }/>
      </Modal>
    </div>
  )
}
