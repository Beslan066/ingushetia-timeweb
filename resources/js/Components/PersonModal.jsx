import "../../../public/css/modal.css";
import React from "react";
export default function PersonModal({ active, onClose }) {
    return (
        <div>
            <div className="d-flex justify-content-center modal-section">
                <div className={`main-modal p-xl-32 ${active ? 'active' : ''}`} id="regionModal">

                    <div className="modal-head w-100 d-flex align-items-center justify-content-between mb-40">
                        <p className="d-flex align-items-center gap-2">
                            <a href="">Главная </a>
                            <span className=""><img className={'next-icon'} src="../../img/icons/no.svg" alt=""/></span>
                            <a className="" href="">Регион</a>
                            <span className=""><img className={'next-icon'} src="../../img/icons/no.svg" alt=""/></span>
                            <a className="" href="">Муниципальные образования</a>
                            <span className=""><img className={'next-icon'} src="../../img/icons/no.svg" alt=""/></span>
                            <a className="" href="">Магас</a>
                        </p>
                        <div className="flex-shrink-0 align-self-start">
                            <button className="mr-12"><img src="../../img/icons/Print.png" alt=""/></button>
                            <button onClick={onClose}><img src="../../img/icons/Close.png" alt=""/></button>
                        </div>
                    </div>

                    <div className="city-body d-flex flex-column">
                        <div className="city-title mb-40">
                            <h3>Город Магас</h3>
                        </div>
                        <div className="d-flex flex-wrap align-items-center mb-40 w-100">
                            <div className="city-logo">
                                <img src="../../img/image 19.png" alt="Герб города Магас"/>
                            </div>
                            <div className="city-bio pl-32">
                                <p className="mb-24">
                                    Мага́с (ингуш. Магас) — город на юге России, столица Республики Ингушетия. Самый
                                    молодой населённый пункт,
                                    являющийся административным центром субъекта Российской Федерации.
                                </p>
                                <p>
                                    Город республиканского значения, образует одноимённый городской округ. Название
                                    «Магас» новой столице Ингушетии дано, исходя из научных исторических,
                                    археологических и лингвистических данных,
                                    а также на основе географических наименований местной топонимики.
                                </p>
                            </div>
                        </div>

                        <div className="city-stat d-flex align-items-center justify-content-between">
                            <div className="stat-item">
                                <p>12,63 км²</p>
                                <span>Площадь</span>
                            </div>
                            <div className="stat-item">
                                <p>1994 г</p>
                                <span>Основан</span>
                            </div>
                            <div className="stat-item">
                                <p>18 640 чел.</p>
                                <span>Население</span>
                            </div>
                        </div>

                        <div className="city-head d-flex mb-32">
                            <div className="head-person-image">
                                <img src="../../img/dzeyt.jpg" alt=""/>
                            </div>
                            <div className="head-person-info d-flex flex-column">
                                <h3>Орцханов Зайт Саитович</h3>
                                <span>Глава г.Магас</span>
                                <p className="head-bio">Орцханов Зайт Саитович находится на должности мэра г. Магас с
                                    2024 года. Ранее руководил международной IT-компанией Сети и Точки.
                                    Взял курс на технологизацию республики.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-gallery d-flex flex-wrap mb-24 w-100 municipality-gallery">
                        <img src="../../img/content/magas.webp" className="mr-2" alt=""/>
                        <img src="../../img/content/magas1" className="mr-2" alt=""/>
                        <img src="../../img/content/magas2" className="mr-2" alt=""/>
                        <img src="../../img/content/Magas3.jpg" className="mr-2" alt=""/>
                        <img src="../../img/content/magas4.jpg" alt=""/>
                        <img src="../../img/Rectangle 1.png" alt=""/>
                        <img src="../../img/Rectangle 1.png" alt=""/>
                        <img src="../../img/Rectangle 1.png" alt=""/>
                        <img src="../../img/content/magas4.jpg" alt=""/>
                    </div>

                    <div className="city-contacts">
                        <h4>Контакты администрации</h4>
                        <p>Телефон: <a href="">8 (8732) 49 38 39</a></p>
                        <p>Факс: <a href="">8 (8732) 37 48 94</a></p>
                        <p>Эл. почта: <a href="">magas@ingushtia.ru</a></p>
                        <p>Адрес: г. Магас, ул. Зязикова, 14 </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
