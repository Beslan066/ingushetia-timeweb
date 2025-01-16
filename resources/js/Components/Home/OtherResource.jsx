import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function OtherResource({ resources }) {
    const [startIndex, setStartIndex] = useState(0); // Индекс начала отображаемых ресурсов
    const itemsToShow = 4; // Количество отображаемых записей

    // Функция для обработки клика на кнопку "вперед"
    const handleNext = () => {
        setStartIndex((prevIndex) =>
            (prevIndex + 1) % resources.length
        );
    };

    // Функция для обработки клика на кнопку "назад"
    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            (prevIndex - 1 + resources.length) % resources.length
        );
    };

    // Получаем текущий набор отображаемых ресурсов
    const visibleResources = resources.slice(startIndex, startIndex + itemsToShow);
    // Для бесконечной карусели добавляем оставшиеся элементы в начало, если их не хватает
    if (visibleResources.length < itemsToShow) {
        visibleResources.push(...resources.slice(0, itemsToShow - visibleResources.length));
    }

    return (
        <section className="other-resources mb-32">
            <div className="container">
                <h3 className="section-title">Полезные ресурсы</h3>
            </div>
            <div className="resources container">
                {Array.isArray(resources) &&
                    visibleResources.map((resource, index) => (
                        <div key={index} className="resource-item col-3 p-25 d-flex justify-content-between flex-column">
                            <h3>{resource.title}</h3>
                            <div className="d-flex justify-content-between">
                                <Link href={resource.link}>{resource.link}</Link>
                                <Link href="">
                                    <img src="/img/icons/external link.svg" alt=""/>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="container mt-xl-40">
                <div className="resource-arrows d-flex align-items-center">
                    <button onClick={handlePrev}><img src="../../img/icons/arrow back.svg" alt=""/></button>
                    <button className="pl-20" onClick={handleNext}><img src="../../img/icons/arrow next .svg" alt=""/></button>
                </div>
            </div>
        </section>
    );
}
