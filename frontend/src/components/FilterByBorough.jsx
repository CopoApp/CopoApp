import React from 'react';

const FilterByBorough = ({ selectedBorough, onChange, arrayOfPosts }) => {
  // Fixed list of NYC boroughs
  const boroughs = ['All', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Unknown'];

  return (
    <div className="filter-container-borough">
      <label htmlFor="borough-filter" className="borough-filter">
        Filter by Borough
      </label>
      <select
        className="borough-filter"
        value={selectedBorough}
        onChange={(e) => onChange(e.target.value)}
      >
        {boroughs.map((borough) => (
          <option key={borough} value={borough}>
            {borough}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByBorough;
