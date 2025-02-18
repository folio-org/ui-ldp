import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Pane } from '@folio/stripes/components';
import { useLdp } from '../../LdpContext';
import { createReportRepo } from '../../util/repoTypes';
import loadReport from '../../util/loadReport';
import BigError from '../BigError';
import TemplatedQueryForm from './TemplatedQueryForm';
import css from './TemplatedQuery.css';

function TemplatedQuery({ query }) {
  const [toggle, setToggle] = useState(false); // To force a re-render when the data changes
  const data = query.state.data;
  const setData = (v) => { query.state.data = v; setToggle(!toggle); };
  const [error, setError] = useState();
  const intl = useIntl();
  const stripes = useStripes();
  const ldp = useLdp();
  const title = query.json?.displayName || query.name;

  const onSubmit = async (values) => {
    const reportRepo = createReportRepo(query.config);
    const url = reportRepo.rawFilePath(query.filename);
    const limit = ldp.maxShow;
    loadReport(intl, stripes, url, values, setData, setError, limit);
  };

  return (
    <Pane defaultWidth="fill" paneTitle={title} dismissible={!!data} onClose={() => setData()}>
      {error ? (
        <BigError message={error} />
      ) : (
        !query.json ? (
          <div className={css.noJsonError}>
            <FormattedMessage id="ui-ldp.templated-queries.no-json" />
          </div>
        ) : (
          <TemplatedQueryForm query={query} onSubmit={onSubmit} data={data} />
        )
      )}
    </Pane>
  );
}

TemplatedQuery.propTypes = {
  query: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    config: PropTypes.shape({
      type: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      branch: PropTypes.string.isRequired,
      dir: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    json: PropTypes.shape({
      displayName: PropTypes.string,
    }),
    state: PropTypes.shape({
      data: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default TemplatedQuery;
