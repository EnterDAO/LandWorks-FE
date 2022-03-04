import { ReactComponent as CloseIcon } from 'resources/svg/close.svg';
import { ReactComponent as SearchIcon } from 'resources/svg/searchbar.svg';

import './index.scss';

interface SearchQuery {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const LandsSearchBar: React.FC<SearchQuery> = ({ searchQuery, setSearchQuery }) => {
  const onClickSearchResetHandler = () => {
    setSearchQuery('');
  };

  return (
    <div className="wrapper lands-search">
      <label htmlFor="header-search" className="search-label-icon">
        <SearchIcon className="search-icon" />
      </label>
      <form action="/" method="get">
        <input
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
          value={searchQuery}
          onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          type="text"
          id="header-search"
          placeholder="Search by name"
          name="s"
        />
      </form>
      {!!searchQuery.length && (
        <label className="search-reset-icon" onClick={onClickSearchResetHandler}>
          <CloseIcon />
        </label>
      )}
    </div>
  );
};

export default LandsSearchBar;
