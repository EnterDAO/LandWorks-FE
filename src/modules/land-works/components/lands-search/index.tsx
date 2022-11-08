import { Ref } from 'react';

import { ReactComponent as CloseIcon } from 'resources/svg/close.svg';
import { ReactComponent as SearchIcon } from 'resources/svg/searchbar.svg';

import './index.scss';

interface SearchQuery {
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  inputRef?: Ref<HTMLInputElement>;
}

const LandsSearchBar: React.FC<SearchQuery> = ({ searchQuery, inputRef, onFocus, setSearchQuery, placeholder }) => {
  return (
    <div className="wrapper-lands-search">
      <label htmlFor="header-search" className="search-label-icon">
        <SearchIcon className="search-icon" />
      </label>
      <form action="/" method="get">
        <input
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
          ref={inputRef}
          onFocus={onFocus}
          value={searchQuery}
          onInput={(e) => setSearchQuery && setSearchQuery((e.target as HTMLInputElement).value)}
          type="text"
          autoComplete="off"
          id="header-search"
          placeholder={placeholder}
          name="s"
        />
      </form>
    </div>
  );
};

export default LandsSearchBar;
