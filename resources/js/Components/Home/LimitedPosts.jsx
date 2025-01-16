import {Link} from "@inertiajs/react";
import {format, parseISO} from "date-fns";
import {ru} from "date-fns/locale";
import Modal from "@/Components/Modal.jsx";
import React, { useEffect, useRef } from "react";

export default function LimitedPosts({id, title, relatedPosts, lead, content, image, user, category, categoryId, onClick, stateValue, agency, published, video, reportages, baseUrl}) {

    const formattedDate = format(parseISO(published), 'HH:mm, d MMMM', { locale: ru });
    const [modal,setModal] = React.useState(false);
    const isFirstRender = useRef(true);


    // Функция для очистки строки от HTML-сущностей и лишних символов
    const decodeHtmlEntities = (str) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    };

    // Проверка наличия и обработка строки slides
    const cleanSlidesString = reportages?.slides
        ? decodeHtmlEntities(reportages.slides)
            .replace(/^\[\"|\"\]$/g, '') // Убираем квадратные скобки и кавычки вокруг строки
            .replace(/\\\"/g, '"') // Заменяем экранированные кавычки на обычные
            .split('","') // Разделяем строки по разделителю между путями
        : [];

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (modal === true) {
            window.history.pushState({}, '', `/news/${id}`)
            console.log(`/news/${id}`)
        } else {
            window.history.pushState({}, '', '/')
        }
    }, [modal])

    return (
        <div className="filtered-news-item cols-lg-3 cols-xl-4">
            <div className="news-image" onClick={() => setModal(true)}>
                <img src={`${baseUrl}/storage/${image}`} alt=""
                     className="w-100 h-100 clean-image"/>
            </div>

            <div className="news-text">
                <p className="news-date">
                    {formattedDate} <Link href={route('posts.by.tag', {categoryId: categoryId})}>
                    <span className="news-category">{category}</span>
                </Link>
                </p>
                <h4 onClick={() => setModal(true)}>{title}</h4>
            </div>

            <Modal
                title={title}
                reportages={cleanSlidesString}
                date={formattedDate}
                category={category}
                categoryId={categoryId}
                relatedPosts={relatedPosts}
                image={image}
                content={content}
                active={modal} onClose={() => setModal(false)}/>
        </div>
    )
}
