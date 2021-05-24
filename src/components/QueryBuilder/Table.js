import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, FormSpy, useFormState } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import get from 'lodash.get';
import { useStripes } from '@folio/stripes/core';
import { Button, IconButton, MultiColumnList, Selection, NoValue } from '@folio/stripes/components';
import exportToCsv from '@folio/stripes-components/lib/ExportCsv/exportToCsv';
import { useLdp } from '../../LdpContext';
import stripesFetch from '../../util/stripesFetch';
import css from './css/Table.css';
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

const Results = ({ results }) => {
  const data = results.resp || [];
  const formatter = {};
  if (data.length) {
    Object.entries(data[0]).forEach(([key, _value]) => {
      formatter[key] = (rec) => (rec[key] === null ? <NoValue /> : rec[key]);
    });
  }

  return (
    <div style={{ flex: 1 }}>
      {(results.key) ? <MultiColumnList key={results.key} contentData={data} formatter={formatter} virtualize autosize /> : <div />}
    </div>
  );
};
Results.propTypes = {
  results: PropTypes.object,
};

const Table = ({
  table,
  tableIndex,
  tables,
  tablesAreLoading,
  queryResponse,
  // onRemove,
  push,
  pop
}) => {
  const stripes = useStripes();
  const { values } = useFormState();
  // const [isLoadingColumns, setIsLoadingColumns] = useState(false);
  const selectedSchema = get(values, `${table}.schema`);
  const selectedTableName = get(values, `${table}.tableName`);
  const [availableColumns, setAvailableColumns] = useState({ list: [], options: [] });
  const ldp = useLdp();

  useEffect(() => {
    const getColumns = async (schema, tableName) => {
      const path = `/ldp/db/columns?schema=${schema}&table=${tableName}`;
      try {
        // setIsLoadingColumns(true);
        const resp = await stripesFetch(stripes, path);
        resp
          .json()
          .then(jsonResp => {
            // setIsLoadingColumns(false);
            setAvailableColumns({
              list: jsonResp.map(c => c.columnName),
              options: jsonResp.map(c => ({ value: c.columnName, label: c.columnName }))
            });
          })
          .catch(() => {
            // TODO: handle error
            // setIsLoadingColumns(false);
            // console.error(err)
            // setErrors(`Failed connect to database`)
          });
      } catch (error) {
        // TODO: handle error
        // setIsLoadingColumns(false);
        // setErrors(`Failed connecting to server ${url}`)
      }
    };
    if (selectedTableName) { getColumns(selectedSchema, selectedTableName); }
  }, [stripes, selectedSchema, selectedTableName]);

  const disabled = availableColumns.list.length === 0;

  return (
    <div className={css.Table} data-test-table>
      <div className="query-input">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, marginRight: 5 }}>
            <Field
              name={`${table}.schema`}
              label={(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 7 }}>Schema</span>
                </div>
              )}
              component={Selection}
              placeholder="&nbsp;"
              dataOptions={Object.keys(tables).map(schema => ({ label: schema, value: schema }))}
              disabled={tablesAreLoading}
            />
          </div>
          <div style={{ flex: 3, marginLeft: 5 }}>
            <Field
              name={`${table}.tableName`}
              label={(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 7 }}>Table</span>
                </div>
              )}
              component={Selection}
              placeholder="&nbsp;"
              dataOptions={filterAvailableTables(tables, selectedSchema, ldp)}
              disabled={tablesAreLoading}
            />
          </div>
        </div>
        <WhenFieldChanges
          field={`${table}.tableName`}
          set={`${table}.columnFilters`}
          to={[{}]}
        />
        <WhenFieldChanges
          field={`${table}.tableName`}
          set={`${table}.showColumns`}
          to={[]}
        />
        <Columns
          selectedTableName={selectedTableName}
          availableColumns={availableColumns}
          disabled={disabled}
          table={table}
          tableIndex={tableIndex}
          push={push}
          pop={pop}
        />
        <div className={css.SubmitRow}>
          {/* <Button disabled >Show Columns...</Button> */}
          <Button type="submit" buttonStyle="primary" disabled={disabled}>Submit</Button>
          <IconButton ariaLabel="Download as CSV" icon="save" onClick={() => exportToCsv(queryResponse.resp, {})} disabled={!get(queryResponse, 'resp.length')} />
        </div>
      </div>

      <Results results={queryResponse} />
    </div>
  );
};

Table.propTypes = {
  table: PropTypes.string,
  tableIndex: PropTypes.number,
  tables: PropTypes.object,
  tablesAreLoading: PropTypes.bool,
  queryResponse: PropTypes.object,
  push: PropTypes.func,
  pop: PropTypes.func,
};

export default Table;
