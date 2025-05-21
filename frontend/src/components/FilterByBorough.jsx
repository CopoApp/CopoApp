import React from 'react';
import { Text, Flex } from '@radix-ui/themes';

const FilterByBorough = ({ selectedBorough, onChange, arrayOfPosts }) => {
  // Fixed list of NYC boroughs
  const boroughs = ['All', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Unknown'];
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
          {boroughs.map((borough) => (
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
