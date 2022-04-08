import {
  useCallback,
  useContext,
} from 'react';
import {
  useHistory,
  useRouteMatch,
  useLocation,
} from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Pluggable } from '@folio/stripes/core';

import { SelectedAuthorityRecordContext } from '../../context';

const AuthorityQuickMarcEditRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const [, setSelectedAuthority] = useContext(SelectedAuthorityRecordContext);

  const onClose = useCallback((recordRoute) => {
    const recordId = recordRoute.split('/')[1];

    setSelectedAuthority(null);
    setTimeout(() => {
      history.goBack();
    }, 1000);
  }, [location.search, history]);

  return (
    <Pluggable
      type="quick-marc"
      basePath={match.path}
      onClose={onClose}
    >
      <FormattedMessage id="ui-inventory.quickMarcNotAvailable" />
    </Pluggable>
  );
};

export default AuthorityQuickMarcEditRoute;
