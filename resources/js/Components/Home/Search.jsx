import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import axios from 'axios';

export default function Search({ search }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

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

    const handleSearch = () => {
        // Переход на страницу с результатами поиска
        window.location.href = route('search.page', { query: query.trim() });
    };

    return (
        <div className={`position-relative search-form container bg-white p-40 ${search ? 'active' : ''}`}>
            <form className={'d-flex align-items-center justify-content-between w-100'} onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    placeholder={`Найти на сайте`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>Найти</button>
            </form>

            <div className={`search-items mt-4 ${results.length > 0 ? 'visible' : 'hidden'}`}>
                {results.slice(0, 5).map((item, index) => ( // Срезаем данные только при отображении
                    <div className="search-item" key={index}>
                        <h3>{item.title}</h3>
                        <div className="news-text">
                            <p className="search-news-date">
                                {new Date(item.created_at).toLocaleDateString()} <span className="search-news-category ml-4">{item.category}</span>
                            </p>
                        </div>
                    </div>
                ))}
                {results.length > 0 && (
                    <div className="search-item mt-3">
                        <Link href={route('search.page', { query })} className="text-primary">
                            Смотреть все результаты
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
