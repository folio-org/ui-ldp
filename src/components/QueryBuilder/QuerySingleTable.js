import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { Field, FormSpy, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { OnChange } from 'react-final-form-listeners';
import { useStripes } from '@folio/stripes/core';
import { Button, Label, MultiSelection, OptionSegment, Select, IconButton, Selection } from '@folio/stripes/components';
import { exportCsv } from '@folio/stripes/util';
import { useLdp } from '../../LdpContext';
import loadColumns from '../../util/loadColumns';
import generateOptions from '../../util/generateOptions';
import BigError from '../BigError';
import ColumnFilter from './ColumnFilter';
import OrderingCriterion from './OrderingCriterion';
import css from './QuerySingleTable.css';


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


function filterAvailableTables(tables, selectedSchema, ldp) {
  const disabledMap = {};
  ldp.disabledTables.forEach(name => {
    const [s, t] = name.split('-');
    if (s === selectedSchema) disabledMap[t] = true;
  });

  return tables[selectedSchema].filter(entry => !disabledMap[entry.value]);
}


const filterItems = ((filterText, list) => {
  const filterRegExp = new RegExp(`^${filterText}`, 'i');
  const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
  return { renderedItems };
});


// TODO: ability to add and remove table joins
// <span onClick={onRemove} style={{ cursor: "pointer" }}>❌</span>

const QuerySingleTable = ({
  namePrefix,
  tableIndex,
  tables,
  queryResponse,
  // onRemove,
  push,
}) => {
  const stripes = useStripes();
  const { values } = useFormState();
  const selectedSchema = get(values, `${namePrefix}.schema`);
  const selectedTableName = get(values, `${namePrefix}.tableName`);
  const [availableColumns, setColumns] = useState({ list: [], options: [] });
  const [error, setError] = useState(false);
  const ldp = useLdp();
  const limitOptions = generateOptions(0, 1 + Math.log10(ldp.maxShow || 1));

  useEffect(() => {
    if (selectedTableName) loadColumns(stripes, selectedSchema, selectedTableName, setColumns, setError);
  }, [stripes, selectedSchema, selectedTableName]);

  if (error) return <BigError message={error} />;

  const disabled = availableColumns.list.length === 0;

  return (
    <div className={css.QuerySingleTable} data-test-table>
      <div className="query-input">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, marginRight: 5 }}>
            <Field
              name={`${namePrefix}.schema`}
              label="XXX Schema"
              component={Selection}
              dataOptions={Object.keys(tables).map(schema => ({ label: schema, value: schema }))}
            />
          </div>
          <div style={{ flex: 2, marginLeft: 5 }}>
            <Field
              name={`${namePrefix}.tableName`}
              label="XXX Table"
              component={Selection}
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

        <Label htmlFor="choose-columns">XXX Filter by column</Label>
        <FieldArray id="choose-columns" name={`${namePrefix}.columnFilters`} tableIndex={tableIndex}>
          {({ fields }) => fields.map((name, index) => (
            <ColumnFilter
              key={name}
              name={name}
              availableColumns={availableColumns.options}
              disabled={disabled}
              onRemove={() => fields.remove(index)}
            />
          ))
          }
        </FieldArray>
        <Button disabled={disabled} onClick={() => push(`${namePrefix}.columnFilters`)}>XXX Add Filter</Button>

        <Field
          name={`${namePrefix}.showColumns`}
          label="XXX Show Columns"
          component={MultiSelection}
          placeholder="(XXX All)"
          dataOptions={availableColumns.list}
          itemToString={(opt => opt)}
          formatter={({ option, searchTerm }) => <OptionSegment searchTerm={searchTerm}>{option}</OptionSegment>}
          filter={filterItems}
          disabled={disabled}
        />

        <Label htmlFor="choose-order">XXX Order by column</Label>
        <FieldArray id="choose-order" name={`${namePrefix}.orderBy`} tableIndex={tableIndex}>
          {({ fields }) => fields.map((name, index) => (
            <OrderingCriterion
              key={name}
              name={name}
              availableColumns={availableColumns.options}
              disabled={disabled}
              onRemove={() => fields.remove(index)}
            />
          ))
          }
        </FieldArray>
        <Button disabled={disabled} onClick={() => push(`${namePrefix}.orderBy`)}>XXX Add ordering criterion</Button>

        <Field
          name={`${namePrefix}.limit`}
          label="XXX Limit number of results"
          component={Select}
          dataOptions={limitOptions}
          type="number"
          disabled={disabled}
        />

        <div className={css.SubmitRow}>
          <Button type="submit" buttonStyle="primary" disabled={disabled}>XXX Submit</Button>
          {queryResponse.key && (
            <span>
              XXX Found
              {' '}
              {queryResponse.isComplete ? '' : 'XXX more than '}
              {queryResponse.count}
              {' '}
              XXX records
            </span>
          )}
          <IconButton
            icon="save"
            ariaLabel="XXX Download as CSV"
            disabled={!get(queryResponse, 'resp.length')}
            onClick={() => exportCsv(queryResponse.resp, {})}
            style={{ marginTop: '-1em' }}
          />
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
  // pop: PropTypes.func,
};


export default QuerySingleTable;
