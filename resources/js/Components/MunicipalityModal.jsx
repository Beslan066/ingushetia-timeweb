import "../../../public/css/modal.css";
import React from "react";

export default function MunicipalityModal({ active, onClose, title, baseUrl, content, arms, year, square, population, supervisorBio, supervisorName, supervisorImage }) {
    return(
        <div>
            <div className="d-flex justify-content-center modal-section">
                <div className={`main-modal ${active ? 'active' : ''}`} id="regionModal">

                    <div className="modal-head w-100 d-flex align-items-center justify-content-between mb-40">
                        <p className="d-flex align-items-center flex-wrap gap-2">
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


                    {title &&
                        <div className="city-body d-flex flex-column">
                        <div className="city-title mb-40">
                            <h3>{title}</h3>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center gap-4 align-items-center mb-40 w-100">
                            <div className="city-logo">
                                <img src={`${baseUrl}/storage/${arms}`} alt="Герб города Магас" />
                            </div>

                                <div className="city-bio"
                                     dangerouslySetInnerHTML={{__html: content}}>

                                </div>


                        </div>

                        <div className="city-stat d-flex align-items-center gap-2 flex-wrap">
                            <div className="stat-item">
                                <p>{square}</p>
                                <span>Площадь</span>
                            </div>
                            <div className="stat-item">
                                <p>{year} г.</p>
                                <span>Основан</span>
                            </div>
                            <div className="stat-item">
                                <p>{population} чел.</p>
                                <span>Население</span>
                            </div>
                        </div>

                        <div className="city-head d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start gap-4 mb-32">
                            <div className="head-person-image">
                                <img src={`${baseUrl}/storage/${supervisorImage}`} alt=""/>
                            </div>
                            <div className="head-person-info d-flex flex-column">
                                <h3>{supervisorName}</h3>
                                <span>Глава г.Магас</span>
                                <div className={'head-bio'} dangerouslySetInnerHTML={{__html: supervisorBio}}></div>
                            </div>
                        </div>
                    </div>
                    }

                    <div className="modal-gallery d-flex flex-md-wrap gap-2 municipality-gallery overflow-x-md-auto overflow-x-scroll">
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
                </div>
            </div>
        </div>
    )
}
