import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Pane, PaneMenu, Icon, Button } from '@folio/stripes/components';
import DashboardChart from '../DashboardChart';


function ViewChart({ data }) {
  const actionMenu = () => (
    <PaneMenu>
      <Link to={`${data.chart.id}/edit`}>
        <Button buttonStyle="dropdownItem">
          <Icon icon="edit"><FormattedMessage id="ui-ldp.editLink" /></Icon>
        </Button>
      </Link>
    </PaneMenu>
  );

  return (
    <Pane defaultWidth="fill" paneTitle={data.chart.value.name} actionMenu={actionMenu}>
      <p>{data.chart.value.description}</p>
      <DashboardChart key={data.chart.id} id={data.chart.id} spec={data.chart.value} />
    </Pane>
  );
}


ViewChart.propTypes = {
  data: PropTypes.shape({
    chart: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};


export default ViewChart;
