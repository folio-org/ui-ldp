import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MultiColumnList } from '@folio/stripes/components';
import sortByParams from '../../util/sortByParams';
import Tabs from '../../Tabs';


function Processes({ data }) {
  const [sortedColumn, setSortedColumn] = useState('realTime');
  const [sortDirection, setSortDirection] = useState('descending');
  const sortedList = sortByParams(data.processes, sortedColumn, sortDirection);

  return (
    <Tabs>
      <MultiColumnList
        contentData={sortedList}
        visibleColumns={['databaseName', 'userName', 'state', 'realTime', 'query']}
        columnMapping={{
          databaseName: <FormattedMessage id="ui-ldp.dbinfo.processes.databaseName" />,
          userName: <FormattedMessage id="ui-ldp.dbinfo.processes.userName" />,
          state: <FormattedMessage id="ui-ldp.dbinfo.processes.state" />,
          realTime: <FormattedMessage id="ui-ldp.dbinfo.processes.realTime" />,
          query: <FormattedMessage id="ui-ldp.dbinfo.processes.query" />,
        }}
        columnWidths={{
          databaseName: 180,
          userName: 100,
          state: 100,
          realTime: 110,
          query: 300,
        }}
        sortedColumn={sortedColumn}
        sortDirection={sortDirection}
        onHeaderClick={(e, { name }) => {
          if (name === sortedColumn) {
            setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
          } else {
            setSortedColumn(name);
            setSortDirection('ascending');
          }
        }}
        isEmptyMessage={<FormattedMessage id="ui-ldp.dbinfo.processes.empty" />}
      />
    </Tabs>
  );
}


Processes.propTypes = {
  data: PropTypes.shape({
    processes: PropTypes.arrayOf(
      PropTypes.shape({
        databaseName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        realTime: PropTypes.string.isRequired,
        query: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
};


export default Processes;
