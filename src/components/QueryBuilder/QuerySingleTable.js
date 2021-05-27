import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, FormSpy, useFormState } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import get from 'lodash.get';
import { useStripes } from '@folio/stripes/core';
import { Button, IconButton, Selection } from '@folio/stripes/components';
import { exportCsv } from '@folio/stripes/util';
import { useLdp } from '../../LdpContext';
import stripesFetch from '../../util/stripesFetch';
import css from './css/QuerySingleTable.css';
import Columns from './Columns';

// TODO: ability to add and remove table joins
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

function filterAvailableTables(tables, selectedSchema, ldp) {
  const disabledMap = {};
  ldp.disabledTables.forEach(name => {
    const [s, t] = name.split('-');
    if (s === selectedSchema) disabledMap[t] = true;
  });

  return tables[selectedSchema].filter(entry => !disabledMap[entry.value]);
}

const WhenFieldChanges = ({ field, set, to }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
      <FormSpy subscription={{}}>
        {() => (
          <OnChange name={field}>
            {(value, previous) => {
              if (value !== previous) {
                onChange(to);
              }
            }}
          </OnChange>
        )}
      </FormSpy>
    )}
  </Field>
);

WhenFieldChanges.propTypes = {
  field: PropTypes.string,
  set: PropTypes.string,
  to: PropTypes.arrayOf(PropTypes.object),
};

const QuerySingleTable = ({
  namePrefix,
  tableIndex,
  tables,
  queryResponse,
  // onRemove,
  push,
  pop
}) => {
  const stripes = useStripes();
  const { values } = useFormState();
  const selectedSchema = get(values, `${namePrefix}.schema`);
  const selectedTableName = get(values, `${namePrefix}.tableName`);
  const [availableColumns, setAvailableColumns] = useState({ list: [], options: [] });
  const ldp = useLdp();

  useEffect(() => {
    const getColumns = async (schema, tableName) => {
      const path = `/ldp/db/columns?schema=${schema}&table=${tableName}`;
      try {
        const resp = await stripesFetch(stripes, path);
        resp
          .json()
          .then(jsonResp => {
            setAvailableColumns({
              list: jsonResp.map(c => c.columnName),
              options: jsonResp.map(c => ({ value: c.columnName, label: c.columnName }))
            });
          })
          .catch(() => {
            // TODO: handle error
            // console.error(err)
          });
      } catch (error) {
        // TODO: handle error
      }
    };
    if (selectedTableName) { getColumns(selectedSchema, selectedTableName); }
  }, [stripes, selectedSchema, selectedTableName]);

  const disabled = availableColumns.list.length === 0;

  return (
    <div className={css.QuerySingleTable} data-test-table>
      <div className="query-input">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, marginRight: 5 }}>
            <Field
              name={`${namePrefix}.schema`}
              label={(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 7 }}>Schema</span>
                </div>
              )}
              component={Selection}
              placeholder="&nbsp;"
              dataOptions={Object.keys(tables).map(schema => ({ label: schema, value: schema }))}
            />
          </div>
          <div style={{ flex: 3, marginLeft: 5 }}>
            <Field
              name={`${namePrefix}.tableName`}
              label={(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 7 }}>Table</span>
                </div>
              )}
              component={Selection}
              placeholder="&nbsp;"
              dataOptions={filterAvailableTables(tables, selectedSchema, ldp)}
            />
          </div>
        </div>
        <WhenFieldChanges
          field={`${namePrefix}.tableName`}
          set={`${namePrefix}.columnFilters`}
          to={[{}]}
        />
        <WhenFieldChanges
          field={`${namePrefix}.tableName`}
          set={`${namePrefix}.showColumns`}
          to={[]}
        />
        <Columns
          selectedTableName={selectedTableName}
          availableColumns={availableColumns}
          disabled={disabled}
          namePrefix={namePrefix}
          tableIndex={tableIndex}
          push={push}
          pop={pop}
        />
        <div className={css.SubmitRow}>
          {/* <Button disabled >Show Columns...</Button> */}
          <Button type="submit" buttonStyle="primary" disabled={disabled}>Submit</Button>
          <IconButton ariaLabel="Download as CSV" icon="save" onClick={() => exportCsv(queryResponse.resp, {})} disabled={!get(queryResponse, 'resp.length')} />
        </div>
      </div>
    </div>
  );
};

QuerySingleTable.propTypes = {
  namePrefix: PropTypes.string,
  tableIndex: PropTypes.number,
  tables: PropTypes.object,
  queryResponse: PropTypes.object,
  push: PropTypes.func,
  pop: PropTypes.func,
};

export default QuerySingleTable;
