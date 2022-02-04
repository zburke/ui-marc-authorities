import { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthoritiesSearch } from '../../views';
import { AuthoritiesSearchContext } from '../../context';
import { useAuthorities } from '../../queries';
import { searchableIndexesValues } from '../../constants';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

const PAGE_SIZE = 100;

const BrowseRoute = ({ children }) => {
  const {
    searchQuery,
    searchIndex,
    filters,
    isExcludedSeeFromLimiter,
    advancedSearchRows,
    setSearchQuery,
    setSearchIndex,
    searchInputValue,
    searchDropdownValue,
  } = useContext(AuthoritiesSearchContext);

  const isAdvancedSearch = searchIndex === searchableIndexesValues.ADVANCED_SEARCH;

  const {
    authorities,
    isLoading,
    isLoaded,
    totalRecords,
    setOffset,
    query,
  } = useAuthorities({
    searchQuery,
    searchIndex,
    advancedSearch: advancedSearchRows,
    isAdvancedSearch,
    filters,
    isExcludedSeeFromLimiter,
    pageSize: PAGE_SIZE,
  });

  const onSubmitSearch = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

    setSearchQuery(searchInputValue);
    setSearchIndex(searchDropdownValue);
  };

  const handleLoadMore = (_pageAmount, offset) => {
    setOffset(offset);
  };

  return (
    <AuthoritiesSearch
      authorities={authorities}
      isLoading={isLoading}
      isLoaded={isLoaded}
      totalRecords={totalRecords}
      query={query}
      pageSize={PAGE_SIZE}
      onSubmitSearch={onSubmitSearch}
      handleLoadMore={handleLoadMore}
    >
      {children}
    </AuthoritiesSearch>
  );
};

BrowseRoute.propTypes = propTypes;

export default BrowseRoute;
