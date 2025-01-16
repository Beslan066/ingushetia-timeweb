import React from "react";
import {Link} from "@inertiajs/react";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
export default function EconomicSupportModal({ active, onClose, title, content, baseUrl, lead }) {

    return (
        <div>
            <div className={`d-flex justify-content-center modal-section typical-page`}>
                <div className={`main-modal p-xl-32 ${active ? 'active' : ''}`} id="mainModal">
                    <div className="modal-head w-100 d-flex align-items-center justify-content-between">
                        <p className="d-flex align-items-center">
                            <a href="">Главная </a>
                            <span className="ml-12"><img className={'next-icon'} src="../../img/icons/no.svg"
                                                         alt=""/></span>
                            <a className="ml-12" href="">Новости </a>
                            <span className="ml-12"><img className={'next-icon'} src="../../img/icons/no.svg"
                                                         alt=""/></span>
                            <a className="ml-12" href="">{title}</a>
                        </p>
                        <div>
                            <button className="mr-12"><img src="/img/icons/Print.png" alt=""/></button>
                            <button onClick={onClose}><img src="/img/icons/Close.png" alt=""/></button>
                        </div>
                    </div>

                    <div className="modal-news-content mt-xl-40 mb-24">

                        <div className="modal-news-title">
                            <h2>{title}</h2>
                        </div>

                        <div className="modal-news-text mt-32" dangerouslySetInnerHTML={{__html: content}}>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
