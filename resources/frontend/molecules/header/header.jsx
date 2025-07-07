import SearchIcon from "#/atoms/icons/search.jsx";
import BarsIcon from "#/atoms/icons/bars.jsx";
import AnniversaryLogoImage from "#/atoms/logos/anniversary.jsx";
import LogoImage from "#/atoms/logos/default.jsx";
import Modal from "#/atoms/modal/modal.jsx";
import PostContent from "#/atoms/modal/post-content.jsx";
import './header.css';
import React, {useEffect, useRef, useState} from "react";
import Button from "#/atoms/buttons/button.jsx";
import {Link} from "@inertiajs/react";
import AppLink from "#/atoms/buttons/link.jsx";
import axios from "axios";
import TimesIcon from "#/atoms/icons/times.jsx";
import AccessibilityPanel from "#/molecules/header/AccessibilityPanel.jsx";

export default function AppHeader({anniversary, logo, title}) {
  const [searchOpened, setSearchOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 1) {
        axios.get(route('search.index', {query: query.trim().toLowerCase()}))
          .then(response => {
            const combinedResults = [
              ...response.data.news,
              ...response.data.photoReportages,
              ...response.data.videos,
              ...response.data.documents,
            ];
            setResults(combinedResults);
          })
          .catch(console.error);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened)
    document.querySelector('body')
  }


  //   Открытие модального окна
  const handlePost = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
    window.history.pushState({}, "", `/news/${post.id}`);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
    window.history.back();
  };

  const [isAccessibilityPanelOpen, setIsAccessibilityPanelOpen] = useState(false);


  return (
    <>
      <header className="top-menu">
        <div className="top-menu__wrapper">
          <div className="top-menu__site-name">
            {anniversary ? <AnniversaryLogoImage/> : <LogoImage logo={logo ?? "/img/logoof.png"}/>}
            <a className={`top-menu__title ${anniversary ? 'top-menu__title--anniversary' : ''}`} href="/">
              <div className="top-menu__name">
                <h1>
                  {title ?? 'Республика Ингушетия'}
                </h1>
              </div>
              <div className="top-menu__caption">Официальный портал</div>
            </a>
          </div>

          <div className="top-menu__actions">
            <nav className="top-menu__navigation">
              <ul>
                <li className="menu-item"><a href="/news">Новости</a></li>
                <li className="menu-item"><a href="/region">Регион</a></li>
                <li className="menu-item">
                  <button onClick={e => e.target.parentNode.classList.toggle('menu-item--opened')}
                          style={{backgroundImage: 'img/icons/dropdown.svg'}}>Органы власти
                  </button>
                  <ul className="submenu">
                    <li className="menu-item"><a href="/president">Глава Республики</a></li>
                    <li className="menu-item"><a href="/president-administration">Администрация Главы</a></li>
                    <li className="menu-item"><a href="/government">Правительство</a></li>

                    {/*<li className="menu-item"><a href={ route('agencies.index') }></a></li>*/}
                  </ul>
                </li>
                <li className="menu-item"><a href={route('media')}>Медиа</a></li>
                <li className="menu-item"><a href="/documents">Документы</a></li>
                <li className="menu-item"><a href={route('contacts')}>Контакты</a></li>
              </ul>
            </nav>
            <button onClick={() => setIsAccessibilityPanelOpen(!isAccessibilityPanelOpen)}>
              <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff"
                   className="bi bi-eye">
                <path
                  d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>
            </button>
            <button aria-label="Поиск" onClick={() => {
              setSearchOpened(!searchOpened);
            }}>
              {!searchOpened ? <SearchIcon size={24}/> : <TimesIcon size={24} color="primary-medium"/>}
            </button>
            <button aria-label="Открытие меню" onClick={toggleMenu}>
              {!menuOpened ? <BarsIcon size={24}/> : <TimesIcon size={24} color="primary-medium"/>}
            </button>
          </div>
        </div>
      </header>
      <div className={`search search--${searchOpened ? 'opened' : 'closed'}`}>
        <div className="search-input">
          <input type="text" placeholder="Найти на сайте" value={query} onChange={(e) => setQuery(e.target.value)}/>
          <SearchIcon color="neutral-dark" size={24} className="input-icon"/>
        </div>
        <Button handleClick={() => {
          window.location.href = `/search/page?query=${query}`
        }}>
          <span className="search__text">Найти</span>
          <SearchIcon color="neutral-white" size={24} className="search__icon"/>
        </Button>
      </div>
      {
        !!results?.length ? (
          <div className="search-results">
            <div className="results">
              {results.slice(0, 5).map((result) => (
                <div className="result" key={result.id}>
                  <Link
                    className="result__title"
                    to={"/news/" + result.id}
                    onClick={(e) => {
                      e.preventDefault(); // Предотвращаем переход по ссылке
                      handlePost(result);
                    }}
                  >
                    {result.title}
                  </Link>
                  <div className="result__footer">
                    <div className="result__date">{new Date(result.created_at).toLocaleDateString()}</div>
                    <div className="result__category">{result.category}</div>
                  </div>
                </div>
              ))
              }
            </div>
            <AppLink to={`/search/page?query=${query}`} title="Все результаты поиска"/>
          </div>
        ) : ''
      }
      <div className={`sidebar-menu sidebar-menu--${menuOpened ? 'opened' : 'closed'}`}>
        <div className="sidebar-menu__container">
          <ul className="menu main-menu">
            <li className="menu-item"><a href="/news">Новости</a></li>
            <li className="menu-item"><a href="/region">Регион</a></li>
            <li className="menu-item">
              <button onClick={e => e.target.parentNode.classList.toggle('menu-item--opened')}>Органы власти</button>
              <ul className="submenu">
                <li className="menu-item"><a href="/president">Глава Республики</a></li>
                <li className="menu-item"><a href="/president-administration">Администрация Главы</a></li>
                <li className="menu-item"><a href="/government">Правительство</a></li>
                {/*<li className="menu-item"><a href={ route('agencies.index') }>Министерства</a></li>*/}
              </ul>
            </li>
            <li className="menu-item"><a href={route('media')}>Медиа</a></li>
            <li className="menu-item"><a href="/documents">Документы</a></li>
            <li className="menu-item"><a href={route('contacts')}>Контакты</a></li>
          </ul>
          <ul className="menu additional-menu">
            <li className="menu-item"><a href={route('judicialAuthorities.index')}>Органы судебной системы РИ</a></li>
            <li className="menu-item"><a href={route('awardPolitics.index')}>Наградная политика </a></li>
            <li className="menu-item"><a href={route('civilServices.index')}>Государственная служба</a></li>
            <li className="menu-item"><a href={route('culture')}>Культура</a></li>
            <li className="menu-item"><a href={route('gloryTour')}>Виртуальный тур по Залу славы</a></li>
            <li className="menu-item"><a href={route('federalAuthorities.index')}>Территориальные органы фед.органов
              власти</a></li>
            <li className="menu-item"><a href={route('antinars.index')}>Антинаркотическая комиссия</a></li>
            <li className="menu-item"><a href={route('smi.index')}>Республиканские СМИ</a></li>
            <li className="menu-item"><a href={route('homeManagmentReserves.index')}>Резерв управленческих кадров</a>
            </li>
            <li className="menu-item"><a href={route('konkurs')}>Конкурсы в органах исполнительной власти</a></li>
            <li className="menu-item"><a href={route('anticorruptions')}>Противодействие коррупции</a></li>
            <li className="menu-item"><a href="/military-support">Поддержка семей военнослужащих</a></li>
          </ul>
        </div>
      </div>

      <AccessibilityPanel
        isOpen={isAccessibilityPanelOpen}
        onClose={() => setIsAccessibilityPanelOpen(false)}
      />

      <Modal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        breadcrumbs={[
          {title: "Поиск", path: "/search"},
          {title: currentPost?.title}
        ]}
      >
        {currentPost && <PostContent post={currentPost}/>}
      </Modal>
    </>
  )
}
