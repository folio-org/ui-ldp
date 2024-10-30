import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Icon, Pane, MultiColumnList, IconButton } from '@folio/stripes/components';


function Charts({ data }) {
  const actionMenu = () => (
    <>
      <Button buttonStyle="dropdownItem">
        <Link to="charts/create">
          <Icon icon="plus-sign"><FormattedMessage id="ui-ldp.charts.new" /></Icon>
        </Link>
      </Button>
    </>
  );

  return (
    <Pane defaultWidth="fill" paneTitle={<FormattedMessage id="ui-ldp.charts.select" />} actionMenu={actionMenu}>
      <MultiColumnList
        contentData={data.charts.map(entry => ({ id: entry.id, name: entry.value.name, editLink: 'x', deleteLink: 'x' }))}
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
          name: r => <Link to={`/ldp/charts/${r.id}`}>{r.name}</Link>,
          editLink: r => <Link to={`/ldp/charts/${r.id}/edit`}><IconButton icon="edit" /></Link>,
          deleteLink: () => <IconButton icon="trash" disabled />,
        }}
      />
    </Pane>
  );
}


Charts.propTypes = {
  data: PropTypes.shape({
    charts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};


export default Charts;


