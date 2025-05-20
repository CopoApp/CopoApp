import React from 'react';
import { Text, Flex } from '@radix-ui/themes';

const FilterByBorough = ({ selectedBorough, onChange, arrayOfPosts }) => {
  const uniqueBorough = ['All', ...new Set(arrayOfPosts.map((post) => post.last_seen_location))];

  return (
    <div className="filter-container-borough">
      <Flex direction={'column'}>
        <Text htmlFor="borough-filter" className="borough-filter">
          Filter by Borough
        </Text>

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
      </Flex>
    </div>
  );
};

export default FilterByBorough;
