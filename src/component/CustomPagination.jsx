import React from 'react';

const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage }) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);
  const maxVisiblePages = 7;

  const handlePageClick = (page) => {
    onChangePage(page);
  };

  const handleBackClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextClick = () => {
    onChangePage(currentPage + 1);
  };

  const handleFirstClick = () => {
    onChangePage(1);
  };

  const handleLastClick = () => {
    onChangePage(totalPages);
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="custom-pagination">
      <button 
        className="pagination-button" 
        onClick={handleFirstClick} 
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button 
        className="pagination-button" 
        onClick={handleBackClick} 
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      <div className='innerbtns'>
      {renderPageNumbers()}
      </div>
      <button 
        className="pagination-button" 
        onClick={handleNextClick} 
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
      <button 
        className="pagination-button" 
        onClick={handleLastClick} 
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default CustomPagination;
