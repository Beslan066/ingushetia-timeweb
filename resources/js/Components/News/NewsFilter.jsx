import CloseIcon from "@/Components/CloseIcon.jsx";
import FilterIcon from "@/Components/FilterIcon.jsx";

import React from "react";

export default function NewsFilter({ categories, onFilterChange }) {
    const [filter, setFilter] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const handleFilterIconClick = () => {
        setFilter(!filter);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onFilterChange({ category, startDate, endDate });
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const applyFilters = () => {
        onFilterChange({ category: selectedCategory, startDate, endDate });
    };

    const clearFilters = () => {
        setSelectedCategory('all');
        setStartDate('');
        setEndDate('');
        onFilterChange({ category: 'all', startDate: '', endDate: '' });
    };

    return (
        <div>

            <div className="d-flex align-items-center justify-content-center flex-wrap">
                <div className="filter-items d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center ">
                        <button
                            className={ selectedCategory === 'all' ? 'active' : '' }
                            onClick={ () => handleCategoryClick('all') }
                        >
                            Все
                        </button>
                        { categories.map((category) => (
                            <button
                                className={ selectedCategory === category.title ? 'active' : '' }
                                key={ category.title }
                                onClick={ () => handleCategoryClick(category.title) }
                            >
                                { category.title }
                            </button>
                        )) }

                    </div>
                </div>
                <div className="filter-icon-button mb-2">
                    <button onClick={ handleFilterIconClick }>
                        { filter ? <CloseIcon/> : <FilterIcon/> }
                    </button>
                </div>
            </div>
            <div className={ `filter-body flex-wrap gap-2 justify-content-center align-items-center mb-24 ${ filter ? 'active' : '' }` }>
                <div className="d-flex gap-2 align-items-center">
                    <input
                        type="date"
                        value={ startDate }
                        onChange={ handleStartDateChange }
                        placeholder="Период, с"
                        className=""
                    />
                    <input
                        type="date"
                        value={ endDate }
                        onChange={ handleEndDateChange }
                        placeholder="Период, до"
                        className=""
                    />
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <button className="" onClick={ applyFilters }>Применить</button>
                    <button onClick={ clearFilters }>Очистить</button>
                </div>
            </div>
        </div>
    );
}
