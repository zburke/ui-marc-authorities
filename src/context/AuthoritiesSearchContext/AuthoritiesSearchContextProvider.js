import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import omit from 'lodash/omit';

import { buildFiltersObj } from '@folio/stripes-acq-components';

import { AuthoritiesSearchContext } from '../../context';
import { navigationSegments, searchableIndexesValues } from '../../constants';

const propTypes = {

};

const AuthoritiesSearchContextProvider = ({
  children,
}) => {
  const location = useLocation();

  const nonFilterUrlParams = ['query', 'qindex', 'segment', 'excludeSeeFrom', 'sort'];
  const getInitialFilters = () => {
    return omit(buildFiltersObj(location.search), nonFilterUrlParams);
  };
  const locationSearchParams = queryString.parse(location.search);

  const [searchInputValue, setSearchInputValue] = useState(locationSearchParams.query || '');
  const [searchQuery, setSearchQuery] = useState(locationSearchParams.query || '');
  const [searchDropdownValue, setSearchDropdownValue] = useState(locationSearchParams.qindex || searchableIndexesValues.KEYWORD);
  const [searchIndex, setSearchIndex] = useState(locationSearchParams.qindex || searchableIndexesValues.KEYWORD);
  const [filters, setFilters] = useState(getInitialFilters());
  const [navigationSegmentValue, setNavigationSegmentValue] = useState(locationSearchParams.segment || navigationSegments.search);
  const [isExcludedSeeFromLimiter, setIsExcludedSeeFromLimiter] = useState(!!locationSearchParams.excludeSeeFrom);
  const [advancedSearchRows, setAdvancedSearchRows] = useState([]);

  const contextValue = {
    searchInputValue,
    setSearchInputValue,
    searchQuery,
    setSearchQuery,
    searchDropdownValue,
    setSearchDropdownValue,
    searchIndex,
    setSearchIndex,
    filters,
    setFilters,
    navigationSegmentValue,
    setNavigationSegmentValue,
    isExcludedSeeFromLimiter,
    setIsExcludedSeeFromLimiter,
    advancedSearchRows,
    setAdvancedSearchRows,
  };

  return (
    <AuthoritiesSearchContext.Provider
      value={contextValue}
    >
      {children}
    </AuthoritiesSearchContext.Provider>
  );
};

AuthoritiesSearchContextProvider.propTypes = propTypes;

export { AuthoritiesSearchContextProvider };
