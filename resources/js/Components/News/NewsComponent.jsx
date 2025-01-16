import React, { useState, useEffect } from 'react';

export default function NewsComponent({ news, baseUrl, selectedCategory, selectedStartDate, selectedEndDate }) {
    const [displayedNews, setDisplayedNews] = useState([]);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        filterNews();
    }, [news, selectedCategory, selectedStartDate, selectedEndDate]);

    const filterNews = () => {
        let filteredNews = news;

        if (selectedCategory && selectedCategory !== 'all') {
            filteredNews = filteredNews.filter(newsItem => newsItem.category.title === selectedCategory);
        }

        if (selectedStartDate) {
            const startDate = new Date(selectedStartDate);
            filteredNews = filteredNews.filter(newsItem => new Date(newsItem.published_at) >= startDate);
        }

        if (selectedEndDate) {
            const endDate = new Date(selectedEndDate);
            filteredNews = filteredNews.filter(newsItem => new Date(newsItem.published_at) <= endDate);
        }

        setDisplayedNews(filteredNews.slice(0, 9));
        setShowMore(filteredNews.length > 9);
    };

    const loadMoreNews = () => {
        const currentLength = displayedNews.length;
        const newNews = news.slice(currentLength, currentLength + 9);

        if (newNews.length > 0) {
            setDisplayedNews([...displayedNews, ...newNews]);
        } else {
            setShowMore(false);
        }
    };

    const resetNews = () => {
        setDisplayedNews(news.slice(0, 9));
        setShowMore(true);
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const hasNews = displayedNews.length > 0;

    return (
        <div className="d-flex flex-wrap">
            {hasNews ? (
                <>
                    <div className="agency-news news-row news-image-row p-4">
                        {displayedNews.map((newsItem) => (
                            <div className="filtered-news-item cols-1 cols-md-2 cols-lg-3 cols-xl-4" key={newsItem.id}>
                                <div className="news-image">
                                    <img src={`${baseUrl}/storage/${newsItem.image_main}`} alt="" className="w-100 h-100 clean-image" />
                                </div>
                                <div className="news-text">
                                    <p className="news-date">
                                        {formatDate(newsItem.published_at)} <span className="news-category ml-4">{newsItem.category.title}</span>
                                    </p>
                                    <a href={newsItem.link}>
                                        <h4>{newsItem.title}</h4>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="load-news d-flex justify-content-center w-100">
                        {showMore ? (
                            <button onClick={loadMoreNews}>Показать еще</button>
                        ) : (
                            <button onClick={resetNews}>Скрыть</button>
                        )}
                    </div>
                </>
            ) : (
                <div className="no-news-message d-flex justify-content-center w-100">
                    <p>За выбранный период новостей не найдено</p>
                </div>
            )}
        </div>
    );
}
