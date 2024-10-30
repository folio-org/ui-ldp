import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { PaneMenu, Button, Icon, Pane, MultiColumnList, IconButton } from '@folio/stripes/components';


function Dashboards({ data }) {
  const history = useHistory();

  const actionMenu = () => (
    <PaneMenu>
      <Button
        buttonStyle="dropdownItem"
        onClick={() => {
          history.push('dashboards/create');
        }}
      >
        <Icon icon="plus-sign"><FormattedMessage id="ui-ldp.dashboards.new" /></Icon>
      </Button>
    </PaneMenu>
  );

  return (
    <Pane defaultWidth="fill" paneTitle={<FormattedMessage id="ui-ldp.dashboards.select" />} actionMenu={actionMenu}>
      <MultiColumnList
        contentData={data.dashboards.map(entry => ({ id: entry.id, name: entry.value.name, editLink: 'x', deleteLink: 'x' }))}
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
          name: r => <Link to={`/ldp/dashboards/${r.id}`}>{r.name}</Link>,
          editLink: r => <Link to={`/ldp/dashboards/${r.id}/edit`}><IconButton icon="edit" /></Link>,
          deleteLink: () => <IconButton icon="trash" disabled />,
        }}
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


