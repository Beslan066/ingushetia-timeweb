import React from 'react';
import Guest from "@/Layouts/GuestLayout.jsx";
import { usePage } from "@inertiajs/react";
import NewsComponent from "@/Components/News/NewsComponent.jsx";
import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import './news.css';
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import PopularSpotlights from "#/molecules/spotlights/popular-spotlights.jsx";
import MainSlider from "#/molecules/slider/slider.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import FilterButton from "#/atoms/filters/filter-button.jsx";
import Filters from "#/molecules/filters/filters.jsx";
import AgencyNewsItem from "#/atoms/news/agency-news-item.jsx";
import MediaNews from "#/atoms/news/media.jsx";
import AppLink from "#/atoms/buttons/link.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import ReportageContent from "#/atoms/modal/reportage-content.jsx";


export default function NewsByCategory() {
  const { news, categoryTitle } = usePage().props;

  return (
    <>
      <AppHeader anniversary={ false }/>
      <PageTitle title={categoryTitle}/>
      <div className="news-hero">
        <div className="news-hero__slider-wrapper">
          <div className="news-hero__news-wrapper">
            {
              news && !!news[0] && (
                <div className="news-feed">
                  {
                    news && news.map((item) =>
                      <AgencyNewsItem key={ item.id } id={ item.id } category={ item.category?.title } date={ item?.published_at } title={ item.title } image={ item.image_main }/>)
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>


      <Modal breadcrumbs={ [{ title: 'Новости' }] }  >
        <PostContent/>
      </Modal>
      <Modal breadcrumbs={ [{ title: 'Новости' }] }>
        <ReportageContent />
      </Modal>
      <AppFooter/>
    </>
  )
}
