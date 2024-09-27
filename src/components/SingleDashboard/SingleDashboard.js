import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import DashboardChart from '../DashboardChart';


function SingleDashboard({ id }) {
  return (
    <Pane defaultWidth="fill" paneTitle={`Some dashboard containing some charts (${id})`}>
      <DashboardChart id={12368} />
    </Pane>
  );
}


SingleDashboard.propTypes = {
  id: PropTypes.string.isRequired,
};


export default SingleDashboard;
