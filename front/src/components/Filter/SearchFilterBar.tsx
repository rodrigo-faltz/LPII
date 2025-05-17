import { FilterDropdown } from "./FilterDropdown";
import { SearchBar } from "./SearchBar";

type SearchFilterBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  filterOptions: string[];
  sortOptions: { value: string; label: string }[];
};

export const SearchFilterBar = ({
  searchTerm,
  onSearchChange,
  filterValue,
  onFilterChange,
  sortValue,
  onSortChange,
  filterOptions,
  sortOptions,
}: SearchFilterBarProps) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6 mb-3 mb-md-0">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Pesquisar conversas..."
        />
      </div>
      <div className="col-md-3 mb-3 mb-md-0">
        <FilterDropdown
          value={filterValue}
          options={filterOptions}
          onChange={onFilterChange}
          ariaLabel="Filtrar por matéria"
          defaultLabel="Todas as matérias"
        />
      </div>
      <div className="col-md-3">
        <FilterDropdown
          value={sortValue}
          options={sortOptions}
          onChange={onSortChange}
          ariaLabel="Ordenar por data"
        />
      </div>
    </div>
  );
};
