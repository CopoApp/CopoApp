import React from 'react';

const FilterByBorough = ({ selectedBorough, onChange, arrayOfPosts }) => {
  const uniqueBorough = ['All', ...new Set(arrayOfPosts.map((post) => post.last_seen_location))];

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
        {uniqueBorough.map((borough) => (
          <option key={borough} value={borough}>
            {borough}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByBorough;
