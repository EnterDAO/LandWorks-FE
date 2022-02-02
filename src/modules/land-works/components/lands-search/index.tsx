import React, { useRef, useState } from 'react';

interface SearchQuery {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchQuery) => (
  <form action="/" method="get">
    <input
      value={searchQuery}
      onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
      type="text"
      id="header-search"
      placeholder="Search by name"
      name="s"
    />
    <button type="submit">Search</button>
  </form>
);
