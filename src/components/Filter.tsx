import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDataContext } from '../contexts/DataContext';
import '../styles/FilterStyle.scss';

const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 300; 

// delays the execution of func until the delay has passed
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      // clear the previous timeout
      clearTimeout(timeoutId); 
    }
    timeoutId = setTimeout(() => {
      // call the function with the arguments after the delay has passed
      func(...args);
    }, delay);
  };
};

const Filter: React.FC = () => {
  const { data, loading, error, currentPage, setCurrentPage } = useDataContext();
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // refs for input fields
  const nameRef = useRef<HTMLInputElement>(null);
  const birthYearRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const skinColorRef = useRef<HTMLInputElement>(null);

  // filter function
  const handleFilter = useCallback(() => {
    const name = nameRef.current?.value.toLowerCase() || '';
    const birthYear = birthYearRef.current?.value || '';
    const gender = genderRef.current?.value || '';
    const skinColor = skinColorRef.current?.value || '';

    const filtered = data.filter((figure: any) => {
      return (
        figure.name.toLowerCase().includes(name) &&
        figure.birth_year.includes(birthYear) &&
        (gender === '' || figure.gender === gender) &&
        (skinColor === '' || figure.skin_color === skinColor)
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1); // reset to first page after filtering
  }, [data, setCurrentPage]);

  // debounced function to call handleFilter function with delay
  const debouncedHandleFilter = debounce(handleFilter, DEBOUNCE_DELAY);

  useEffect(() => {
    handleFilter();
  }, [data, handleFilter]);

  // handle sort field and direction
  const handleSort = (field: string) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  // get sorted data based on the sort field and direction
  const getSortedData = () => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedData = getSortedData();

  // get data for the current page
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, endIndex);
  };

  // calculate the total number of pages after filtering and sorting
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  // move to the previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // move to the next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status">Error: {error}</p>;

  return (
    <div className="filter-container">
      <h1 className="filter-title">Filter Star Wars Figures</h1>
      <form className="filter-form" onChange={debouncedHandleFilter}>
        <label className="filter-label">
          <span className="sort-arrow" onClick={() => handleSort('name')}>
            {sortField === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇵'}
          </span>
          Name:
          <input type="text" ref={nameRef} />
        </label>
        <label className="filter-label">
          <span className="sort-arrow" onClick={() => handleSort('birth_year')}>
            {sortField === 'birth_year' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇵'}
          </span>
          Birth Year:
          <input type="text" ref={birthYearRef} />
        </label>
        <label className="filter-label">
          <span className="sort-arrow" onClick={() => handleSort('gender')}>
            {sortField === 'gender' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇵'}
          </span>
          Gender:
          <input type="text" ref={genderRef} />
        </label>
        <label className="filter-label">
          <span className="sort-arrow" onClick={() => handleSort('skin_color')}>
            {sortField === 'skin_color' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇵'}
          </span>
          Skin Color:
          <input type="text" ref={skinColorRef} />
        </label>
      </form>
      <p className="filter-count">Matching Figures: {sortedData.length}</p>
      <ul className="filter-list">
        {getPaginatedData().map((figure: any) => (
          <li key={figure.name} className="filter-item">{figure.name}</li>
        ))}
      </ul>
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination-button">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage >= totalPages} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Filter;
