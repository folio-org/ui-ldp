import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Pane, MultiColumnList, IconButton } from '@folio/stripes/components';


function Dashboards({ data }) {
  const history = useHistory();

  const dashboardList = data.dashboards.map(entry => [entry.id, entry.value.name]);

  return (
    <Pane defaultWidth="fill" paneTitle={<FormattedMessage id="ui-ldp.dashboards.select" />}>
      <MultiColumnList
        contentData={data.dashboards.map(entry => ({ id: entry.id, name: entry.value.name, editLink: 'XXX', deleteLink: 'YYY' }))}
        visibleColumns={['name', 'editLink', 'deleteLink']}
        columnMapping={{
          name: <FormattedMessage id="ui-ldp.dashboard.name" />,
          editLink: <FormattedMessage id="ui-ldp.dashboard.editLink" />,
          deleteLink: <FormattedMessage id="ui-ldp.dashboard.deleteLink" />,
        }}
        columnWidths={{
          name: 500,
          editLink: 50,
          deleteLink: 50,
        }}
        formatter={{
          editLink: () => <IconButton icon="edit" />,
          deleteLink: () => <IconButton icon="trash" />,
        }}
        onRowClick={(_, r) => history.push(`/ldp/dashboards/${r.id}`)}
      />
    </Pane>
  );
}


Dashboards.propTypes = {
  data: PropTypes.shape({
    dashboards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};


export default Dashboards;


