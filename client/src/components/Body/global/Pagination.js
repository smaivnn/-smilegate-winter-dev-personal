import React, { useState } from "react";

const pagePerList = 5;
const Pagination = ({
  allUserCount,
  itemPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPageNumber = Math.ceil(allUserCount / itemPerPage);
  const pages = [];
  for (let i = 1; i <= totalPageNumber; i++) {
    pages.push(i);
  }

  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(-1);

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pagePerList);
      setminPageNumberLimit(minPageNumberLimit + pagePerList);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pagePerList == 4) {
      setmaxPageNumberLimit(maxPageNumberLimit - pagePerList);
      setminPageNumberLimit(minPageNumberLimit - pagePerList);
    }
  };

  const renderPageNumbers = pages?.map((number) => {
    if (
      number - 1 < maxPageNumberLimit + 1 &&
      number - 1 > minPageNumberLimit
    ) {
      return (
        <li key={number} id={number}>
          <button
            id={number}
            onClick={(e) => setCurrentPage(Number(e.target.id - 1))}
            className={
              currentPage == number - 1
                ? "bg-sky-500 border border-black text-white leading-tight py-2 px-3 "
                : "bg-white border border-black text-black hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 "
            }
          >
            {number}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <>
      <nav>
        <button
          onClick={handlePrevBtn}
          disabled={currentPage === 0}
          className="bg-white border border-black text-black hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 "
        >
          Previous
        </button>
        <ul className="inline-flex -space-x-px">{renderPageNumbers}</ul>
        <button
          onClick={handleNextBtn}
          disabled={currentPage === totalPageNumber - 1}
          className="bg-white border border-black text-black hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 "
        >
          Next
        </button>
      </nav>
    </>
  );
};

export default Pagination;
