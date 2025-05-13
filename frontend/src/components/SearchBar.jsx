// SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react'; // Or use any icon you like

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);
      setQuery('');
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm w-full"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 w-full outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 hover:bg-blue-700 rounded-r-full"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
