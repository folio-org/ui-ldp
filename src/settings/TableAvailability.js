import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

function TableAvailability({ label }) {
  return (
    <Pane defaultWidth="fill" fluidContentWidth paneTitle={label}>
      <div data-test-settings-table-availability>
        <FormattedMessage id="ui-ldp.settings.table-availability.nyi" />
      </div>
    </Pane>
  );
}

TableAvailability.propTypes = {
  label: PropTypes.object.isRequired,
};

export default TableAvailability;
