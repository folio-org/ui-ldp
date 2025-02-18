import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Pane, PaneMenu, Icon, Button } from '@folio/stripes/components';
import DashboardChart from '../DashboardChart';


function ViewDashboard({ data }) {
  const actionMenu = () => (
    <PaneMenu>
      <Link to={`${data.dashboard.id}/edit`}>
        <Button buttonStyle="dropdownItem">
          <Icon icon="edit"><FormattedMessage id="ui-ldp.editLink" /></Icon>
        </Button>
      </Link>
    </PaneMenu>
  );

  return (
    <Pane defaultWidth="fill" paneTitle={data.dashboard.value.name} actionMenu={actionMenu}>
      <p>{data.dashboard.value.description}</p>
      {data.chartSpecs.map(chartSpec => (
        <DashboardChart key={chartSpec.id} id={chartSpec.id} spec={chartSpec.value} />
      ))}
    </Pane>
  );
}


ViewDashboard.propTypes = {
  data: PropTypes.shape({
    chartSpecs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired,
      }).isRequired,
    ).isRequired,
    dashboard: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};


export default ViewDashboard;
