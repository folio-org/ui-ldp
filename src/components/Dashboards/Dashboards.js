import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { CalloutContext } from '@folio/stripes/core';
import { Button, Icon, Pane, MultiColumnList, IconButton } from '@folio/stripes/components';


function Dashboards({ data, onDelete }) {
  const callout = useContext(CalloutContext);

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

  const onDeleteWithReaction = async (dashboard) => {
    try {
      await onDelete(dashboard.id);
    } catch (res) {
      const { status, statusText } = res;
      const detail = await res.text();
      callout.sendCallout({
        type: 'error',
        message: <FormattedMessage
          id="ui-ldp.dashboard.delete.fail"
          values={{ name: dashboard.name, code: status, statusText, detail }}
        />
      });
      return;
    }

    callout.sendCallout({
      message: <FormattedMessage id="ui-ldp.dashboard.delete.ok" values={{ name: dashboard.name }} />
    });
  };

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
          deleteLink: r => <IconButton icon="trash" onClick={() => onDeleteWithReaction(r)} />,
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
  onDelete: PropTypes.func.isRequired,
};


export default Dashboards;


