import "../../../../public/css/region.css";
import Guest from "@/Layouts/GuestLayout.jsx";
import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Accordion from "@/Components/Region/Accordion.jsx";


export default function Region() {

    const [openItemId, setOpenItemId] = useState(null);

    const handleItemClick = (id) => {
        setOpenItemId(openItemId === id ? null : id);
    };

    const accordionItems = [
        {
            title: 'География',
            content: <p>Территория И. расположена...</p>,
            id: 'drawer-1',
        },
        {
            title: 'Рельеф, геология и полезные ископаемые',
            content: <p>Важнейшие полезные ископаемые И. – нефть и природный газ...</p>,
            id: 'drawer-2',
        },
        {
            title: 'Полезные ископаемые',
            content: (
                <>
                    <p>
                        Территория И. расположена в пределах складчато-покровной системы
                        Большого Кавказа Альпийско-Гималайского подвижного пояса. Северная часть
                        И. (Терский и Сунженский хребты, разделённые Алханчуртской долиной,
                        Чеченская равнина) находится в пределах Терско-Каспийского передового
                        прогиба (заполнен олигоцен-неогеновой молассой), строение которого
                        осложнено Терским и Сунженским валами. Тектоническая зона северного
                        склона Большого Кавказа (Чёрные горы, Пастбищный и Скалистый хребты)
                        сложена наклонно залегающими шельфовыми терригенно-карбонатными
                        отложениями верхней юры – эоцена (глинами, песчаниками, мергелями,
                        известняками, доломитами). В осевой зоне (антиклинорий Бокового хребта)
                        развита интенсивно деформированная черносланцевая формация нижней и
                        средней юры. Горная Ингушетия область интенсивной сейсмичности.
                    </p>
                    <img className="w-100" src="../../img/Rectangle 1.png" alt="" />
                </>
            ),
            id: 'drawer-3',
        },
    ];


    return (
        <Guest>
            <main className="mt-xl-40">
                <div className="container">
                    <h2 className={'mb-32'}>О республике</h2>
                </div>
                <div className="container d-flex flex-column gap-4 flex-xl-row w-full  col-xxl-12 news-page">
                    <div className="main-left col-xxl-9">
                        <div className="page-head d-flex flex-column">

                            <p>
                                Ингушетия самая молодая республика в составе Российской Федерации, образованная 4 июня
                                1992
                                года, расположена на северных
                                склонах предгорья Большого Кавказского хребта, в центральной его части.
                            </p>

                            <p>Республика Ингушетия граничит с Северной Осетией и Чеченской Республикой. По территории
                                республики проходит участок государственной
                                границы Российской Федерации с Республикой Грузия.
                            </p>
                            <p>
                                В республике насчитывается 4 района, 5 городов республиканского подчинения. Столица
                                —город
                                Магас.
                                Климат континентальный. Основная река — Сунжа. Протекают также реки Асса, Фортанга,
                                Армхи,
                                Гулойхи, Фазтонка, Чемульга. Общая площадь
                                бассейна рек составляет 3073 км².
                            </p>
                        </div>

                        <div className="region-accordion mb-40">
                            <section className="drawers">
                                {accordionItems.map((item) => (
                                    <Accordion
                                        key={item.id}
                                        {...item}
                                        isOpen={openItemId === item.id}
                                        onClick={handleItemClick}
                                    />
                                ))}
                            </section>
                        </div>


                    </div>

                     <div className="main-right">
                        <div className="d-flex flex-column mb-32 region-links">
                            <ul className="region-pager">
                                <li className="active"><Link href="/region">О Республике</Link></li>
                                <li><Link href="/history">История</Link></li>
                                <li><Link href="/economic">Экономика</Link></li>
                                <li><Link href="/municipality">Муниципальные образования</Link></li>
                                <li><Link href={route('socialEconomicDevelopment')}>Социально-экономическое
                                    развитие</Link></li>
                                <li><Link href="">Реализация стратегических инициатив Президента РФ</Link></li>
                                <li><Link href="/economic-support">Поддержка экономики и граждан</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </Guest>
    )
}
