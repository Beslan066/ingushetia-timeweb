import React from 'react';
import './pagination.css';

export default function Pagination({ currentPage, totalPages, onPageChange, isLoading, totalItems, itemsPerPage }) {
  const getPageNumbers = () => {
    const delta = 7; // Количество страниц по бокам от текущей
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  // Вычисляем диапазон показываемых записей
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Показано <span className="pagination-info__highlight">{startItem}–{endItem}</span> из <span className="pagination-info__highlight">{totalItems}</span> записей
      </div>

      <div className="pagination">
        <button
          className={`pagination__arrow ${currentPage === 1 ? 'pagination__arrow--disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          aria-label="Предыдущая страница"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="pagination__pages">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''} ${page === '...' ? 'pagination__page--dots' : ''}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...' || isLoading}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={`pagination__arrow ${currentPage === totalPages ? 'pagination__arrow--disabled' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          aria-label="Следующая страница"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

