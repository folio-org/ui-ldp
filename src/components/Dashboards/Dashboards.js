import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Pane, MultiColumnList, IconButton } from '@folio/stripes/components';


// XXX get these from mod-settings
const dashboardList = [
  [123, 'Heat-map of checkouts through the week'],
  [456, 'Daily checkout counts through the year'],
  [789, 'Bar-graph of types of user checking out items'],
];


function Dashboards() {
  const history = useHistory();

  return (
    <Pane defaultWidth="fill" paneTitle={<FormattedMessage id="ui-ldp.dashboards.select" />}>
      <MultiColumnList
        contentData={dashboardList.map(([id, name]) => ({ id, name, editLink: 'XXX', deleteLink: 'YYY' }))}
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
  // None yet
};


export default Dashboards;
