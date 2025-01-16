import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import Modal from "@/Components/Modal.jsx";

export default function AgencyNews({ agencies, agencyNews, baseUrl, relatedAgencyNews }) {
    const [modal, setModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null); // Хранит выбранную новость

    useEffect(() => {
        if (modal) {
            document.body.classList.add('fixed-body');
        } else {
            document.body.classList.remove('fixed-body');
        }
    }, [modal]);

    const [selectedAgency, setSelectedAgency] = useState(null);

    const handleCategoryClick = (agency) => {
        setSelectedAgency(agency);
    };

    const handleAllNewsClick = () => {
        setSelectedAgency(null);
    };

    const filteredPosts = selectedAgency
        ? agencyNews.filter(post => post.agency_id === selectedAgency.id)
        : agencyNews;

    const limitedPosts = filteredPosts.slice(0, 8);

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'HH:mm, d MMMM', { locale: ru });
    };

    return (
        <section className="home-media">
            <div className="container d-flex flex-column">
                <h3>Новости министерств</h3>
                <div className="filtered-news w-full d-flex mt-xl-40 flex-column">
                    <div className="filter-items">
                        <button
                            className={`filter-button ${selectedAgency === null ? 'active' : ''}`}
                            onClick={handleAllNewsClick}
                        >
                            Все
                        </button>
                        {agencies.map((agency) => (
                            <button
                                key={agency.id}
                                className={`filter-button ${selectedAgency && selectedAgency.id === agency.id ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(agency)}
                            >
                                {agency.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="agency-news">
                    {limitedPosts &&
                        limitedPosts.map((post) => (
                            <div className="agency-news-item cols-4" key={post.id}>
                                <div className="news-image">
                                    <img
                                        style={{ objectFit: 'cover' }}
                                        src={`${baseUrl}/storage/${post.image_main}`}
                                        alt=""
                                        className="w-100 h-100"
                                    />
                                </div>
                                <div className="news-text pl-20 d-flex flex-column justify-content-between">
                                    <div>
                                        <h4 onClick={() => { setModal(true); setSelectedPost(post); }}>
                                            {post.title.slice(0, 90)}
                                        </h4>
                                    </div>
                                    <p className="news-date">
                                        {formatDate(post.published_at)}
                                        <span className="news-category ml-4">
                                            {post.category.title}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {selectedPost && (
                <Modal
                    title={selectedPost.title}
                    categoryId={selectedPost.category.id}
                    reportages={selectedPost.reportages}
                    date={formatDate(selectedPost.published_at)}
                    category={selectedPost.category.title}
                    image={selectedPost.image_main}
                    content={selectedPost.content}
                    active={modal}
                    relatedPosts={selectedPost.relatedPosts}
                    onClose={() => setModal(false)}
                />
            )}
        </section>
    );
}
