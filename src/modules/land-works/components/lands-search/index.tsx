import { ReactComponent as Search } from './assets/search.svg';

import './index.scss';

interface SearchQuery {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchQuery> = ({ searchQuery, setSearchQuery }) => (
  <div className="wrapper">
    <form action="/" method="get">
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
        type="text"
        id="header-search"
        placeholder="Search by name"
        name="s"
      />
    </form>
    <Search />
  </div>
);
