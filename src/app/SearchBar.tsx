import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); 
  };

  return (
    <input
    className='justify-center w-full shadow-md border border-slate-300 rounded-lg p-2'
    type="text"
    placeholder="Search by title"
    value={searchQuery}
    onChange={handleInputChange}
/>

  );
};

export default SearchBar;

