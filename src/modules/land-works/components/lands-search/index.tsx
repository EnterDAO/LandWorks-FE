import { ReactComponent as Search } from 'resources/svg/searchbar.svg';

import './index.scss';

interface SearchQuery {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const LandsSearchBar: React.FC<SearchQuery> = ({ searchQuery, setSearchQuery }) => (
  <div className="wrapper lands-search">
    <Search className="search-icon" />
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
  </div>
);

export default LandsSearchBar;
