import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${styles.paginationContainer} container`}>
      <button
        className={`${styles.pageButton} ${
          currentPage === 1 && styles.disabled
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Önceki
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`${styles.pageButton} ${
            currentPage === number && styles.activePage
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={`${styles.pageButton} ${
          currentPage === totalPages && styles.disabled
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sonraki
      </button>
    </div>
  );
};

export default Pagination;
