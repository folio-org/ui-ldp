import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import get from 'lodash.get';
import { Field, FormSpy, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { OnChange } from 'react-final-form-listeners';
import { useStripes } from '@folio/stripes/core';
import { Button, Label, MultiSelection, OptionSegment, Select, Selection } from '@folio/stripes/components';
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
  to: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.string,
  ]).isRequired,
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
  onClear,
}) => {
  const intl = useIntl();
  const stripes = useStripes();
  const { values } = useFormState();
  const selectedSchema = get(values, `${namePrefix}.schema`);
  const selectedTableName = get(values, `${namePrefix}.tableName`);
  const [availableColumns, setColumns] = useState({ list: [], options: [] });
  const [error, setError] = useState(false);
  const ldp = useLdp();
  const limitOptions = generateOptions(0, 1 + Math.log10(ldp.maxShow || 1));

  useEffect(() => {
    if (selectedTableName) loadColumns(intl, stripes, selectedSchema, selectedTableName, setColumns, setError);
  }, [intl, stripes, selectedSchema, selectedTableName]);

  if (error) return <BigError message={error} />;

  const disabled = !selectedTableName;

  return (
    <div className={css.QuerySingleTable} data-test-table>
      <div className="query-input">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, marginRight: 5 }}>
            <Field
              name={`${namePrefix}.schema`}
              data-cy={`${namePrefix}.schema`}
              label={<FormattedMessage id="ui-ldp.label.schema" />}
              component={Selection}
              dataOptions={Object.keys(tables).map(schema => ({ label: schema, value: schema }))}
            />
          </div>
          <div style={{ flex: 2, marginLeft: 5 }}>
            <Field
              name={`${namePrefix}.tableName`}
              data-cy={`${namePrefix}.tableName`}
              label={<FormattedMessage id="ui-ldp.label.table" />}
              component={Selection}
              dataOptions={filterAvailableTables(tables, selectedSchema, ldp)}
            />
          </div>
        </div>
        <WhenFieldChanges
          field={`${namePrefix}.schema`}
          set={`${namePrefix}.tableName`}
          to=""
        />
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
        <WhenFieldChanges
          field={`${namePrefix}.tableName`}
          set={`${namePrefix}.orderBy`}
          to={[]}
        />

        <Label htmlFor="choose-columns">
          <FormattedMessage id="ui-ldp.label.filter-by-column" />
        </Label>
        <FieldArray id="choose-columns" name={`${namePrefix}.columnFilters`} tableIndex={tableIndex}>
          {({ fields }) => fields.map((name, index) => (
            <ColumnFilter
              key={name}
              name={name}
              data-cy={name}
              availableColumns={availableColumns.options}
              disabled={disabled}
              onRemove={() => fields.remove(index)}
            />
          ))
          }
        </FieldArray>
        <Button
          disabled={disabled}
          onClick={() => push(`${namePrefix}.columnFilters`)}
          data-cy={`${namePrefix}.addFilter`}
        >
          <FormattedMessage id="ui-ldp.button.add-filter" />
        </Button>

        <Field
          name={`${namePrefix}.showColumns`}
          data-cy={`${namePrefix}.showColumns`}
          label={<FormattedMessage id="ui-ldp.label.show-columns" />}
          component={MultiSelection}
          placeholder={intl.formatMessage({ id: 'ui-ldp.placeholder.columns.all' })}
          dataOptions={availableColumns.list}
          itemToString={(opt => opt)}
          formatter={({ option, searchTerm }) => <OptionSegment searchTerm={searchTerm}>{option}</OptionSegment>}
          filter={filterItems}
          disabled={disabled}
        />

        <Label htmlFor="choose-order">
          <FormattedMessage id="ui-ldp.label.order-by-column" />
        </Label>
        <FieldArray id="choose-order" name={`${namePrefix}.orderBy`} tableIndex={tableIndex}>
          {({ fields }) => fields.map((name, index) => (
            <OrderingCriterion
              key={name}
              name={name}
              data-cy={name}
              availableColumns={availableColumns.options}
              disabled={disabled}
              onRemove={() => fields.remove(index)}
            />
          ))
          }
        </FieldArray>
        <Button
          disabled={disabled}
          onClick={() => push(`${namePrefix}.orderBy`)}
          data-cy={`${namePrefix}.addOrderingCriterion`}
        >
          <FormattedMessage id="ui-ldp.button.add-ordering-criterion" />
        </Button>

        <Field
          name={`${namePrefix}.limit`}
          data-cy={`${namePrefix}.limit`}
          label={<FormattedMessage id="ui-ldp.label.limit-results" />}
          component={Select}
          dataOptions={limitOptions}
          type="number"
          disabled={disabled}
        />

        <div className={css.SubmitRow}>
          <span>
            <Button
              type="submit"
              buttonStyle="primary"
              disabled={disabled}
              data-cy={`${namePrefix}.submit`}
            >
              <FormattedMessage id="ui-ldp.button.submit" />
            </Button>
            <Button
              type="button"
              buttonStyle="default"
              disabled={false}
              data-cy={`${namePrefix}.clear`}
              onClick={onClear}
            >
              <FormattedMessage id="ui-ldp.button.clear" />
            </Button>
          </span>
          <span data-cy={`${namePrefix}.message`}>
            {queryResponse.key && (
              queryResponse.isComplete ?
                <FormattedMessage id="ui-ldp.found-records" values={{ count: queryResponse.count }} /> :
                <FormattedMessage id="ui-ldp.found-more-than" values={{ count: queryResponse.count }} />
            )}
          </span>
          <Button
            aria-label={intl.formatMessage({ id: 'ui-ldp.button.download-csv' })}
            disabled={!get(queryResponse, 'resp.length')}
            onClick={() => exportCsv(queryResponse.resp, {})}
            xstyle={{ marginTop: '-1em' }}
            data-cy={`${namePrefix}.downloadCSV`}
          >
            <FormattedMessage id="ui-ldp.button.csv" />
          </Button>
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
  onClear: PropTypes.func.isRequired,
};


export default QuerySingleTable;
