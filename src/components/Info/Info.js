import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Pane } from '@folio/stripes/components';


function Info({ data }) {
  const paneTitle = <FormattedMessage id="ui-ldp.dbinfo.version" values={{ version: data.version?.version }} />;
  return (
    <Pane defaultWidth="fill" paneTitle={paneTitle}>
    </Pane>
  );
}


Info.propTypes = {
  data: PropTypes.shape({
    version: PropTypes.shape({
      version: PropTypes.string.isRequired,
    }),
  }).isRequired,
};


export default Info;
