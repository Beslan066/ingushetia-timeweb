import React, {useState, useEffect} from "react";
import AppHeader from "#/molecules/header/header.jsx";
import AppFooter from "#/organisms/footer/footer.jsx";
import PageTitle from "#/atoms/texts/PageTitle.jsx";
import Tabs from "#/atoms/tabs/tabs.jsx";
import FilterButton from "#/atoms/filters/filter-button.jsx";
import Filters from "#/molecules/filters/filters.jsx";
import MediaCollection from "#/molecules/news/mediaCollection.jsx";
import {router} from "@inertiajs/react";
import './media.css';

export default function Media({media: mediaProps, selectedCategory}) {
  const categories = [
    {title: 'Фоторепортажи', id: 'photo'},
    {title: 'Видеорепортажи', id: 'video'}
  ];


  const [selected, setSelected] = useState(selectedCategory || null);
  const [filtersOpened, setFiltersOpened] = useState(false);
  const [media, setMedia] = useState(mediaProps.data);
  const [nextPage, setNextPage] = useState(mediaProps.next_page_url);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (!nextPage || loading) return;

    setLoading(true);
    router.get(nextPage, {}, {
      preserveState: true,
      preserveScroll: true,
      only: ['media'],
      onSuccess: ({props}) => {
        setMedia((prev) => [...prev, ...props.media.data]);
        setNextPage(props.media.next_page_url);
        setLoading(false);
      }
    });
  };

  const onTabChange = (categoryId) => {
    setSelected(categoryId);
    setLoading(true);

    router.get(route('media'), {category: categoryId}, {
      preserveState: false,
      onSuccess: ({props}) => {
        setMedia(props.media.data);
        setNextPage(props.media.next_page_url);
        setLoading(false);
      }
    });
  };

  return (
    <>
      <AppHeader/>
      <div className={'news-hero__news-wrapper news-page-title'}><PageTitle title="Медиа"/>
        <div><FilterButton isActive={filtersOpened} onChange={setFiltersOpened}/></div>
      </div>

      <div className="page-content__wrapper media-default">
        <div className="news-wrapper">
          <div className="tab-row">
            <Tabs tabs={categories} selected={selected} onTab={onTabChange}/>
            <FilterButton isActive={filtersOpened} onChange={setFiltersOpened}/>
          </div>
        </div>

        <Filters
          isActive={filtersOpened}
          onChange={() => {
          }}
          onClose={() => setFiltersOpened(false)}
        />

        <MediaCollection media={media}/>

        {nextPage && (
          <button
            className="load-more-button"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Показать ещё"}
          </button>
        )}
      </div>
      <AppFooter/>
    </>
  );
}
