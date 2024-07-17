import React, { useState } from 'react';
import { useDataContext } from '../contexts/DataContext';
import '../styles/CatalogueStyle.scss';

const ITEMS_PER_PAGE = 10;

const Catalogue: React.FC = () => {
  const { data, loading, error, currentPage, setCurrentPage } = useDataContext();
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // handle sort field and direction
  const handleSort = (field: string) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  // get sorted data based on the sort field and direction
  const getSortedData = () => {
    if (!sortField){
      return data;
    } 
    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedData = getSortedData();

  // calculate total number of pages based on the sorted data length and items per page
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  // get the sorted data for the current page
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // slice the sorted data array to get only the items for the current page
    return sortedData.slice(startIndex, endIndex);
  };

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
    <div className="catalogue-container">
      <h1 className="catalogue-title">Star Wars Figures Catalogue</h1>
      <div className="sort-controls">
        <label htmlFor="sortField">Sort by:</label>
        <select id="sortField" className="sort-dropdown" onChange={(e) => handleSort(e.target.value)}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="birth_year">Birth Year</option>
          <option value="gender">Gender</option>
          <option value="skin_color">Skin Color</option>
        </select>
        <button className="sort-button" onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
          {sortDirection === 'asc' ? <span className="arrow">▲</span> : <span className="arrow">▼</span>}
          {sortDirection === 'asc' ? ' Ascending' : ' Descending'}
        </button>
      </div>
      <ul className="catalogue-list">
        {getPaginatedData().map((figure: any) => (
          <li key={figure.name} className="catalogue-item">{figure.name}</li>
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

export default Catalogue;
