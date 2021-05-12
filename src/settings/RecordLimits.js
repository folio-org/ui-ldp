import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function RecordLimits({ label }) {
  return (
    <Pane defaultWidth="fill" fluidContentWidth paneTitle={label}>
      <div data-test-settings-record-limits>
        <FormattedMessage id="ui-ldp.settings.table-availability.nyi" />
      </div>
    </Pane>
  );
}

RecordLimits.propTypes = {
  label: PropTypes.object.isRequired,
};

export default RecordLimits;
