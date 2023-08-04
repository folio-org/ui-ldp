import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Pane, Accordion } from '@folio/stripes/components';
import css from './TemplatedQuery.css';

function TemplatedQuery({ query }) {
  const title = query.json?.displayName || query.name;
  return (
    <Pane defaultWidth="fill" paneTitle={title}>
      {!query.json ? (
        <div className={css.noJsonError}>
          <FormattedMessage id="ui-ldp.templated-queries.no-json" />
        </div>
      ) : (
        <div>XXX actual stuff</div>
      )}
      <Accordion closedByDefault label={<FormattedMessage id="ui-ldp.devinfo" />}>
        <pre>{JSON.stringify(query, null, 2)}</pre>
      </Accordion>
    </Pane>
  );
}

TemplatedQuery.propTypes = {
  query: PropTypes.shape({
    name: PropTypes.string.isRequired,
    json: PropTypes.shape({
      displayName: PropTypes.string,
    }),
  }).isRequired,
};

export default TemplatedQuery;
