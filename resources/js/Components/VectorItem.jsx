import { Link } from "@inertiajs/react";
import React from "react";

export default function VectorItem({ image, title, profits, link }) {
    return (
        <div className="vector-item cols-1 cols-md-2 cols-lg-2 cols-xl-4">
            <img className="w-100 vector-image" src={image} alt=""/>
            <div className="vectors-content">
                <h3>{ title }</h3>
                <ul>
                    {
                        profits.map((profit) => {
                            return (
                                <li key={profit}>
                                    <div className={ 'd-flex align-items-center' }>
                                        <img src="/img/icons/checkmark.svg" alt=""/>
                                        <span>{ profit }</span>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
                <div className={ 'more-extend' }>
                    <Link href={ link ?? '' } className={ 'd-flex' }>
                        Подробнее
                        <img src="/img/icons/longarrow.svg" alt="" className={ 'pl-3' }/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
