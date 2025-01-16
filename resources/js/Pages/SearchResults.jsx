import React, { useState, useEffect, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import axios from 'axios';
import Guest from "@/Layouts/GuestLayout.jsx";

export default function SearchResultsPage() {
    const { query } = usePage().props; // Получаем query из URL параметров
    const [results, setResults] = useState({});
    const [activeFilter, setActiveFilter] = useState('all'); // Активный фильтр по умолчанию 'all'
    const [visibleCount, setVisibleCount] = useState(11); // Количество отображаемых элементов по умолчанию 11

    useEffect(() => {
        // Загрузка результатов поиска
        axios.get(route('search.results', { query }))
            .then(response => {
                console.log("Response data:", response.data); // Логирование данных от сервера
                setResults(response.data);
                setVisibleCount(11); // Сбрасываем видимое количество элементов при новом запросе
            })
            .catch(error => {
                console.error("There was an error fetching the search results!", error);
            });
    }, [query]);

    // Мемоизация отфильтрованных результатов
    const filteredResults = useMemo(() => {
        if (activeFilter === 'all') {
            return Object.values(results).flat();
        } else {
            return results[activeFilter] || [];
        }
    }, [results, activeFilter]);

    const filterResults = (category) => {
        setActiveFilter(category); // Меняем активный фильтр при клике
        setVisibleCount(11); // Сбрасываем видимое количество элементов при смене фильтра
    };

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 11); // Увеличиваем видимое количество элементов на 11
    };

    return (
        <Guest>
            <div className="container">
                <h2 className={'mt-xl-40 mb-32'}>Результаты поиска: {query}</h2>
                <div className="search-filters d-flex align-items-center justify-content-between">
                    <div className="filter-btns">
                        <button onClick={() => filterResults('all')}
                                className={activeFilter === 'all' ? 'active' : ''}>Все
                        </button>
                        <button onClick={() => filterResults('news')}
                                className={activeFilter === 'news' ? 'active' : ''}>Новости
                        </button>
                        <button onClick={() => filterResults('documents')}
                                className={activeFilter === 'documents' ? 'active' : ''}>Документы
                        </button>
                        <button onClick={() => filterResults('videos')}
                                className={activeFilter === 'videos' ? 'active' : ''}>Видео
                        </button>
                        <button onClick={() => filterResults('photoReportages')}
                                className={activeFilter === 'photoReportages' ? 'active' : ''}>Фоторепортажи
                        </button>
                    </div>
                    <div className="filter-icon-button">
                        <button>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 7H14" stroke="#6C6C6C" strokeWidth="2"></path>
                                <path d="M22 17L10 17" stroke="#6C6C6C" strokeWidth="2"></path>
                                <path d="M18 7L22 7" stroke="#6C6C6C" strokeWidth="2"></path>
                                <path d="M6 17L2 17" stroke="#6C6C6C" strokeWidth="2"></path>
                                <rect x="14" y="4" width="4" height="6" stroke="#6C6C6C" strokeWidth="2"></rect>
                                <rect x="10" y="20" width="4" height="6" transform="rotate(180 10 20)" stroke="#6C6C6C"
                                      strokeWidth="2"></rect>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="search-results">
                    {filteredResults.length > 0 ? (
                        filteredResults.slice(0, visibleCount).map((item, index) => (
                            <div key={index} className="search-item">
                                <h3>{item.title}</h3>
                                <div className={'d-flex align-items-center search-item-category'}>
                                    <p>{item.category}</p>
                                    <p className={'ml-2'}>{new Date(item.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h4>К сожалению, ничего не найдено</h4>
                    )}
                </div>
                {visibleCount < filteredResults.length ? (
                    <div className="load-news d-flex justify-content-center w-100">
                        <button onClick={loadMore}>Показать еще</button>
                    </div>
                ) : (
                    filteredResults.length > 0 && (
                        <div className="load-news d-flex justify-content-center w-100">
                            <button >Показаны все записи</button>
                        </div>
                    )
                )}
            </div>
        </Guest>
    );
}
