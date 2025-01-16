import React, { useEffect } from 'react';
import Modal from "@/Components/Modal.jsx";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia'; // Импортируем Inertia
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function HomeNewsSidebar({
                                            key, title, lead, content, image, user, category, onClick, stateValue, agency, categoryId, published, video, reportages, relatedPosts, slug // добавляем slug
                                        }) {
    const [modal, setModal] = React.useState(false);
    const formattedDate = format(parseISO(published), 'HH:mm, d MMMM', { locale: ru });

    useEffect(() => {
        if (modal) {
            document.body.classList.add('fixed-body');
        } else {
            document.body.classList.remove('fixed-body');
        }
    }, [modal]);

    // Закрытие модального окна и возврат к предыдущему URL
    const handleModalClose = () => {
        setModal(false);
        Inertia.visit(window.location.pathname, { preserveScroll: true }); // Возвращаемся на предыдущий URL
    };

    // Открытие модального окна и изменение URL
    const handlePostClick = () => {
        setModal(true);
        Inertia.visit(`/news/${slug}`, { preserveState: true, preserveScroll: true }); // Меняем URL на /news/slug без перезагрузки страницы
    };

    return (
        <div className="news-item">
            <div className="news-date d-flex">
                <div>
                    {formattedDate} <Link href={route('posts.by.tag', {categoryId: categoryId})}>
                    <span className="news-category">{category}</span>
                </Link>
                </div>
                {video && <img src="/img/icons/video-icon.svg" alt="" />}
            </div>
            <Link href={`/news/${slug}`} preserveScroll={true}>
                <h2>{title}</h2>
            </Link>

            <Modal
                title={title}
                categoryId={categoryId}
                reportages={reportages}
                date={formattedDate}
                category={category}
                image={image}
                content={content}
                active={modal}
                onClose={handleModalClose} // Закрытие модального окна
                relatedPosts={relatedPosts}
            />
        </div>
    );
}
