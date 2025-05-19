import React from 'react';

const FilterByStatus = ({ selectedStatus, onChange, arrayOfPosts }) => {
  const uniqueStatus = ['All', ...new Set(arrayOfPosts.map((post) => post.status))];

  return (
    <div className="filter-container-status">
      <label htmlFor="status-container" className="status-container">
        Filter by Status
      </label>
      <select
        className="status-filer"
        value={selectedStatus}
        onChange={(e) => onChange(e.target.value)}
      >
        {uniqueStatus.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByStatus;
