import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Icon, Pane, MultiColumnList, IconButton } from '@folio/stripes/components';


function Dashboards({ data }) {
  const actionMenu = () => (
    <>
      <Button buttonStyle="dropdownItem">
        <Link to="dashboards/create">
          <Icon icon="plus-sign"><FormattedMessage id="ui-ldp.dashboards.new" /></Icon>
        </Link>
      </Button>
      <Button buttonStyle="dropdownItem">
        <Link to="charts">
          <Icon icon="report"><FormattedMessage id="ui-ldp.manageCharts" /></Icon>
        </Link>
      </Button>
    </>
  );

  return (
    <Pane defaultWidth="fill" paneTitle={<FormattedMessage id="ui-ldp.dashboards.select" />} actionMenu={actionMenu}>
      <MultiColumnList
        contentData={data.dashboards.map(entry => ({ id: entry.id, name: entry.value.name, editLink: 'x', deleteLink: 'x' }))}
        visibleColumns={['name', 'editLink', 'deleteLink']}
        columnMapping={{
          name: <FormattedMessage id="ui-ldp.field.name" />,
          editLink: <FormattedMessage id="ui-ldp.editLink" />,
          deleteLink: <FormattedMessage id="ui-ldp.deleteLink" />,
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


