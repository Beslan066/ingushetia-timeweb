import FilterIcon from "@/Components/FilterIcon.jsx";
import CloseIcon from "@/Components/CloseIcon.jsx";

import React from "react";
import {usePage} from "@inertiajs/react";
export default function Filter() {

    const [filter, setFilter] = React.useState(false);

    const handleFilterIconClick = () => {
        setFilter(!filter);
    };



    return(
        <div>
            <div className="filter-items d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center ">
                    <button className="active">Общество</button>
                    <button>Образование</button>
                    <button>Экономика</button>
                    <button>Наука</button>
                    <button>Спорт</button>
                    <button>Туризм</button>
                </div>
                <div className="filter-icon-button">
                    <button onClick={handleFilterIconClick}>
                        {filter ? <CloseIcon/> : <FilterIcon/>}
                    </button>
                </div>
            </div>

            <div className={`filter-body  align-items-center mb-24 ${filter ? 'active' : ''}`}>
                <div className="d-flex align-items-center">
                    <select name="" id="" placeholder="Период, с" className="mr-12">
                        <option value="">Период, с</option>
                    </select>
                    <div className={'tire'}>
                        <img src="../../img/icons/tire.svg" alt=""/>
                    </div>
                    <select name="" id="" placeholder="Период, до" className="mr-12">
                        <option value="">Период, до</option>
                    </select>
                </div>
                <div className="d-flex align-items-center">
                    <button className="mr-12">Применить</button>
                    <button>Очистить</button>
                </div>
            </div>
        </div>
    )
}
