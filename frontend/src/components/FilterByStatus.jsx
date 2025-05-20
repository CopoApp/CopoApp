import React from 'react';
import { Text, Flex } from '@radix-ui/themes';

const FilterByStatus = ({ selectedStatus, onChange, arrayOfPosts }) => {
  const uniqueStatus = ['All', ...new Set(arrayOfPosts.map((post) => post.status))];

  return (
    <div className="filter-container-status">
      <Flex direction={'column'}>
        <Text htmlFor="status-container" className="status-container">
          Filter by Status
        </Text>
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
      </Flex>
    </div>
  );
};

export default FilterByStatus;
