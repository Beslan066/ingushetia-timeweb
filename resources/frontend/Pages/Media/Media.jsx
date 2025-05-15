import AppHeader from "#/molecules/header/header.jsx";
import React, { useState } from "react";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import './media.css'
import Tabs from "#/atoms/tabs/tabs.jsx";
import FilterButton from "#/atoms/filters/filter-button.jsx";
import Filters from "#/molecules/filters/filters.jsx";
import MediaCollection from "#/molecules/news/mediaCollection.jsx";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Media({ media: mediaProps }) {
  const categories = [{title: 'Фоторепортажи', id: 'photo'}, {title: 'Видеорепортажи', id: 'video'}];
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({});
  const [isFiltersOpened, setFiltersOpened] = useState(false);
  const [media, setMedia] = useState(mediaProps)

  const onFilters = (dateFrom, dateTo, category) => {
    console.log(dateFrom, dateTo, category)
    router.reload({
      method: 'get',
      data: {category, dateFrom, dateTo},
      onSuccess: ({ props }) => {
        setFilters({dateFrom, dateTo})
        setSelected(category);
        setMedia(props.media);
      }
    })
  }

  return (
    <>
      <AppHeader/>
      <div className={'news-hero__news-wrapper news-page-title'}>
        <PageTitle title="Новости" />
        <div>
          <Filters isActive={ isFiltersOpened } onChange={(dateFrom, dateTo) => onFilters(dateFrom, dateTo, selected)} onClose={ () => setFiltersOpened(false) }/>
        </div>
      </div>
      <div className="page-content__wrapper media-default">
        <div className="news-wrapper">
            <div className="tab-row">
              <Tabs tabs={ categories } selected={ selected } onTab={ (id) => onFilters(filters?.dateFrom, filters?.dateTo, id) }/>
              <FilterButton isActive={ isFiltersOpened } onChange={ setFiltersOpened }/>

            </div>
        </div>
        <Filters isActive={ isFiltersOpened } onChange={(dateFrom, dateTo) => onFilters(dateFrom, dateTo, selected)} onClose={ () => setFiltersOpened(false) }/>
        <MediaCollection media={media}/>
      </div>
      <AppFooter/>
    </>
  )
}
