import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Pane, Accordion, Button } from '@folio/stripes/components';
import { exportCsv } from '@folio/stripes/util';
import { useLdp } from '../../LdpContext';
import loadReport from '../../util/loadReport';
import BigError from '../BigError';
import ResultsList from '../QueryBuilder/ResultsList';
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
      ) : data ? (
        <>
          <div className={css.centerContainer}>
            <div className={css.center}>
              {data.isComplete ?
                <FormattedMessage id="ui-ldp.found-records" values={{ count: data.count }} /> :
                <FormattedMessage id="ui-ldp.found-more-than" values={{ count: data.count }} />
              }
            </div>
            <div className={css.right}>
              <Button
                aria-label={intl.formatMessage({ id: 'ui-ldp.button.download-csv' })}
                disabled={data.length === 0}
                onClick={() => exportCsv(data.resp, {})}
              >
                <FormattedMessage id="ui-ldp.button.csv" />
              </Button>
            </div>
          </div>
          <ResultsList results={data} />
        </>
      ) : (
        <>
          {!query.json ? (
            <div className={css.noJsonError}>
              <FormattedMessage id="ui-ldp.templated-queries.no-json" />
            </div>
          ) : (
            <TemplatedQueryForm query={query} onSubmit={onSubmit} />
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
