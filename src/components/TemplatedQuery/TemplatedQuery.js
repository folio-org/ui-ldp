import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Pane, Accordion } from '@folio/stripes/components';
import { useLdp } from '../../LdpContext';
import loadReport from '../../util/loadReport';
import BigError from '../BigError';
import TemplatedQueryForm from './TemplatedQueryForm';
import css from './TemplatedQuery.css';

function TemplatedQuery({ query }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const intl = useIntl();
  const stripes = useStripes();
  const ldp = useLdp();
  const title = query.json?.displayName || query.name;

  const onSubmit = async (values) => {
    const qc = query.config;
    const url = `https://raw.githubusercontent.com/${qc.user}/${qc.repo}/${qc.branch}/${qc.dir}/${query.filename}`;
    const limit = ldp.maxShow;
    loadReport(intl, stripes, url, values, setData, setError, limit);
  };

  return (
    <Pane defaultWidth="fill" paneTitle={title} dismissible={!!data} onClose={() => setData()}>
      {error ? (
        <BigError message={error} />
      ) : (
        <>
          {!query.json ? (
            <div className={css.noJsonError}>
              <FormattedMessage id="ui-ldp.templated-queries.no-json" />
            </div>
          ) : (
            <TemplatedQueryForm query={query} onSubmit={onSubmit} data={data} />
          )}
          <br style={{ marginTop: '2em' }} />
          <Accordion closedByDefault label={<FormattedMessage id="ui-ldp.devinfo" />}>
            <pre>{JSON.stringify(query, null, 2)}</pre>
          </Accordion>
        </>
      )}
    </Pane>
  );
}

TemplatedQuery.propTypes = {
  query: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    config: PropTypes.shape({
      user: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      branch: PropTypes.string.isRequired,
      dir: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    json: PropTypes.shape({
      displayName: PropTypes.string,
    }),
  }).isRequired,
};

export default TemplatedQuery;
