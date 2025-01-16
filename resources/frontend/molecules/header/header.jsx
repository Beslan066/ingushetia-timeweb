import SearchIcon from "#/atoms/icons/search.jsx";
import BarsIcon from "#/atoms/icons/bars.jsx";
import AnniversaryLogoImage from "#/atoms/logos/anniversary.jsx";
import LogoImage from "#/atoms/logos/default.jsx";

import './header.css';
import React, { useEffect, useRef, useState } from "react";
import Button from "#/atoms/buttons/button.jsx";
import { Link } from "@inertiajs/react";
import AppLink from "#/atoms/buttons/link.jsx";
import axios from "axios";
import TimesIcon from "#/atoms/icons/times.jsx";

export default function AppHeader({ anniversary, logo, title }) {
  const [searchOpened, setSearchOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length > 2) {
      axios.get(route('search.results', { query: query.trim().toLowerCase() })) // trim() для удаления лишних пробелов
        .then(response => {
          const combinedResults = [
            ...response.data.news,
            ...response.data.photoReportages,
            ...response.data.videos,
            ...response.data.documents,
          ];
          setResults(combinedResults);
        })
        .catch(error => {
          console.error("There was an error fetching the search results!", error);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened)
    document.querySelector('body')
  }

  return (
    <>
      <header className="top-menu">
        <div className="top-menu__wrapper">
          <div className="top-menu__site-name">
            { anniversary ? <AnniversaryLogoImage/> : <LogoImage logo={logo ?? "/img/logo.svg"}/> }
            <Link className={ `top-menu__title ${ anniversary ? 'top-menu__title--anniversary' : '' }` } href="/">
              <div className="top-menu__name">{ title ?? 'Республика Ингушетия' }</div>
              <div className="top-menu__caption">Официальный портал</div>
            </Link>
          </div>

          <div className="top-menu__actions">
            <nav className="top-menu__navigation">
              <ul >
                <li className="menu-item"><Link href="/news">Новости</Link></li>
                <li className="menu-item"><Link href="/region">Регион</Link></li>
                <li className="menu-item">
                  <button onClick={ e => e.target.parentNode.classList.toggle('menu-item--opened') }>Органы власти
                  </button>
                  <ul className="submenu">
                    <li className="menu-item"><Link href="/government">Глава Республики</Link></li>
                    <li className="menu-item"><Link href="/government/directories">Правительство</Link></li>
                    <li className="menu-item"><Link href="#">Федеральные органы власти</Link></li>
                    <li className="menu-item"><Link href={ route('agencies.index') }>Министерства</Link></li>
                  </ul>
                </li>
                <li className="menu-item"><Link href={ route('media') }>Медиа</Link></li>
                <li className="menu-item"><Link href="/documents">Документы</Link></li>
                <li className="menu-item"><Link href={ route('contacts') }>Контакты</Link></li>
              </ul>
            </nav>
            <button aria-label="Поиск" onClick={ () => {
              setSearchOpened(!searchOpened);
            } }>
              { !searchOpened ? <SearchIcon size={ 24 } /> : <TimesIcon size={ 24 } color="primary-medium"/> }
            </button>
            <button aria-label="Открытие меню" onClick={ toggleMenu }>
              { !menuOpened ? <BarsIcon size={ 24 }/> : <TimesIcon size={ 24 } color="primary-medium"/> }
            </button>
          </div>
        </div>
      </header>
      <div className={ `search search--${ searchOpened ? 'opened' : 'closed' }` }>
        <div className="search-input">
          <input type="text" placeholder="Найти на сайте" value={ query } onChange={ (e) => setQuery(e.target.value) }/>
          <SearchIcon color="neutral-dark" size={ 24 } className="input-icon"/>
        </div>
        <Button handleClick={ () => {
          window.location.href = `/search/page?query=${ query }`
        } }>
          <span className="search__text">Найти</span>
          <SearchIcon color="neutral-white" size={ 24 } className="search__icon"/>
        </Button>
      </div>
      {
        !!results?.length ? (
          <div className="search-results">
            <div className="results">
              {
                results.slice(0, 5).map((result) => (
                  <div className="result" key={result.id}>
                    <Link className="result__title" to={ "/news/" + result.id }>{ result.title }</Link>
                    <div className="result__footer">
                      <div className="result__date">{ new Date(result.created_at).toLocaleDateString() }</div>
                      <div className="result__category">{ result.category }</div>
                    </div>
                  </div>
                ))
              }
            </div>
            <AppLink to={`/search/page?query=${query}`} title="Все результаты поиска" />
          </div>
        ) : ''
      }
      <div className={ `sidebar-menu sidebar-menu--${menuOpened ? 'opened' : 'closed'}` }>
        <div className="sidebar-menu__container">
          <ul className="menu main-menu">
            <li className="menu-item"><Link href="/news">Новости</Link></li>
            <li className="menu-item"><Link href="/region">Регион</Link></li>
            <li className="menu-item">
              <button onClick={ e => e.target.parentNode.classList.toggle('menu-item--opened') }>Органы власти</button>
              <ul className="submenu">
                <li className="menu-item"><Link href="/government">Глава Республики</Link></li>
                <li className="menu-item"><Link href="/government/directories">Правительство</Link></li>
                <li className="menu-item"><Link href="#">Федеральные органы власти</Link></li>
                <li className="menu-item"><Link href={ route('agencies.index') }>Министерства</Link></li>
              </ul>
            </li>
            <li className="menu-item"><Link href={ route('media') }>Медиа</Link></li>
            <li className="menu-item"><Link href="/documents">Документы</Link></li>
            <li className="menu-item"><Link href={ route('contacts') }>Контакты</Link></li>
          </ul>
          <ul className="menu additional-menu">
            <li className="menu-item"><Link >Государственная символика</Link></li>
            <li className="menu-item"><Link href={route('judicialAuthorities.index')}>Органы судебной системы РИ</Link></li>
            <li className="menu-item"><Link href={route('awardPolitics.index')}>Наградная политика </Link></li>
            <li className="menu-item"><Link href={route('civilServices.index')}>Государственная служба</Link></li>
            <li className="menu-item"><Link href="">Культура и история</Link></li>
            <li className="menu-item"><Link href={route('gloryTour')}>Виртуальный тур по Залу славы</Link></li>
            <li className="menu-item"><Link href={route('federalAuthorities.index')}>Территориальные органы фед.органов власти</Link></li>
            <li className="menu-item"><Link href={route('antinars.index')}>Антинаркотическая комиссия</Link></li>
            <li className="menu-item"><Link href={route('smi.index')}>Республиканские СМИ</Link></li>
            <li className="menu-item"><Link href={route('homeManagmentReserves.index')}>Резерв управленческих кадров</Link></li>
            <li className="menu-item"><Link href={route('konkurs')}>Конкурсы в органах исполнительной власти</Link></li>
            <li className="menu-item"><Link href={route('anticorruptions')}>Противодействие коррупции</Link></li>
            <li className="menu-item"><Link href="/military-support">Поддержка семей военнослужащих</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}
