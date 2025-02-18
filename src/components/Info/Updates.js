import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MultiColumnList } from '@folio/stripes/components';
import sortByParams from '../../util/sortByParams';
import FormattedDateTime from '../../util/FormattedDateTime';
import Tabs from '../../Tabs';


function Updates({ data }) {
  const [sortedColumn, setSortedColumn] = useState('elapsedRealTime');
  const [sortDirection, setSortDirection] = useState('ascending');
  const sortedList = sortByParams(data.updates, sortedColumn, sortDirection);

  return (
    <Tabs>
      <MultiColumnList
        contentData={sortedList}
        visibleColumns={['tableSchema', 'tableName', 'lastUpdate', 'elapsedRealTime']}
        columnMapping={{
          tableSchema: <FormattedMessage id="ui-ldp.dbinfo.updates.tableSchema" />,
          tableName: <FormattedMessage id="ui-ldp.dbinfo.updates.tableName" />,
          lastUpdate: <FormattedMessage id="ui-ldp.dbinfo.updates.lastUpdate" />,
          elapsedRealTime: <FormattedMessage id="ui-ldp.dbinfo.updates.elapsedRealTime" />,
        }}
        columnWidths={{
          tableSchema: 150,
          tableName: 320,
          lastUpdate: 240,
          elapsedRealTime: 100,
        }}
        formatter={{
          lastUpdate: r => <FormattedDateTime datetime={r.lastUpdate} />,
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
      />
    </Tabs>
  );
}


Updates.propTypes = {
  data: PropTypes.shape({
    updates: PropTypes.arrayOf(
      PropTypes.shape({
        tableSchema: PropTypes.string.isRequired,
        tableName: PropTypes.string.isRequired,
        lastUpdate: PropTypes.string.isRequired,
        elapsedRealTime: PropTypes.number.isRequired,
      }).isRequired,
    ),
  }).isRequired,
};


export default Updates;
