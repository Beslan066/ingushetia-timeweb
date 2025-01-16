// MediaFilter.jsx
import React, { useState } from 'react';
import FilterIcon from "@/Components/FilterIcon.jsx";
import CloseIcon from "@/Components/CloseIcon.jsx";

export default function MediaFilter({ onFilterChange, onDateRangeChange }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        onFilterChange(filter);
    };

    const handleApplyDateFilter = () => {
        onDateRangeChange({ startDate, endDate });
    };

    const handleClearDateFilter = () => {
        setStartDate('');
        setEndDate('');
        onDateRangeChange({ startDate: '', endDate: '' });
    };

    const toggleFilterVisibility = () => {
        setFilterVisible(!isFilterVisible);
    };


    return (
        <div className={'media-filter-container'}>
            <div className="media-filter d-flex align-items-center justify-content-between">
                <div>
                    <button
                        className={activeFilter === 'all' ? 'active' : ''}
                        onClick={() => handleFilterClick('all')}
                    >
                        Все
                    </button>
                    <button
                        className={activeFilter === 'video' ? 'active' : ''}
                        onClick={() => handleFilterClick('video')}
                    >
                        Видео
                    </button>
                    <button
                        className={activeFilter === 'photo' ? 'active' : ''}
                        onClick={() => handleFilterClick('photo')}
                    >
                        Фоторепортажи
                    </button>
                </div>

                <div onClick={toggleFilterVisibility}>
                    <button  onClick={toggleFilterVisibility}>
                        {isFilterVisible ? <CloseIcon/> : <FilterIcon/>}
                    </button>
                </div>
            </div>

            {isFilterVisible && (
                <div className={`filter-body align-items-center mb-24 ${isFilterVisible ? 'active' : '' }`}>
                    <div className="d-flex align-items-center">
                        <input
                            type="date"
                            placeholder="Период, с"
                            className="mr-12"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <div className="tire">
                            <img src="../../img/icons/tire.svg" alt="" />
                        </div>
                        <input
                            type="date"
                            placeholder="Период, до"
                            className="mr-12"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="d-flex align-items-center">
                        <button className="mr-12" onClick={handleApplyDateFilter}>Применить</button>
                        <button onClick={handleClearDateFilter}>Очистить</button>
                    </div>
                </div>
            )}
        </div>
    );
}
