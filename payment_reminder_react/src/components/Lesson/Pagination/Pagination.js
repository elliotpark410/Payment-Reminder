import React from 'react';
import { Pagination } from 'react-bootstrap';
import './paginationStyles.css';

export const PaginationComponent = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const renderPaginationItems = () => {
    const pageNumbers = [];

    let startPage = currentPage - 5;
    let endPage = currentPage + 4;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(10, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - 9);
    }

    for (let number = startPage; number <= endPage; number++) {
      pageNumbers.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <Pagination className="pagination">
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {renderPaginationItems()}
        <Pagination.Next
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
