import React, { useState, useEffect } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { Field, FormSpy, useFormState } from 'react-final-form';
import get from 'lodash.get';
import { Button, Selection, TextField, MultiSelection, OptionSegment } from '@folio/stripes/components';
import ColumnFilter from './ColumnFilter';
import ColumnChooser from './ColumnChooser';

// TODO: ability to remove column filter
// <button type="button" onClick={() => pop(`${table}.columns`)}>Remove Column</button>

const filterItems = ((filterText, list) => {
  const filterRegExp = new RegExp(`^${filterText}`, 'i');
  const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
  return { renderedItems };
});

const Columns = ({ table, tableIndex, push, pop }) => {
  const { values } = useFormState();
  const selectedTableName = get(values, `${table}.tableName`)
  const [availableColumns, setAvailableColumns] = useState({ list: [], options: [] });
  
  const getColumns = async (selectedTableName) => {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/columns?table=${selectedTableName}`
    try {
      const resp = await fetch(url)
      resp
        .json()
        .then(resp => {
          // setIsLoadingFields(false)
          setAvailableColumns({
            list: resp.map(c => c.columnName),
            options: resp.map(c => ({ value: c.columnName, label: c.columnName }))
          })
        })
        .catch(err => {
          // TODO: handle error
          // setLoading(false)
          // console.error(err)
          // setErrors(`Failed connect to database`)
        })
    } catch (error) {
      // TODO: handle error
      // setLoading(false)
      // setErrors(`Failed connecting to server ${url}`)
    }
  }
  useEffect(() => {
    if(selectedTableName) { getColumns(selectedTableName) }
  }, [selectedTableName]);

  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '0.25rem' }}>Column</div>
      <FieldArray name={`${table}.columnFilters`} tableIndex={tableIndex}>
        {({ fields }) =>
          fields.map((name, index) => (
            <ColumnFilter
              name={name}
              index={index}
              key={name}
              availableColumns={availableColumns.options}
              onRemove={() => fields.remove(index)}
            />
          ))
        }
      </FieldArray>
      <Button onClick={() => push(`${table}.columns`)}>Add Filter</Button>

      <Field
        name={`${table}.showColumns`}
        label="Show Columns"
        component={MultiSelection}
        placeholder="All"
        dataOptions={availableColumns.list}
        itemToString={(opt => opt)}
        formatter={({option, searchTerm}) => <OptionSegment searchTerm={searchTerm} >{option}</OptionSegment>}
        filter={filterItems}
      />
      <Field name={`${table}.showColumns2`}>
        {props => (
          <ColumnChooser
            possibleColumns={availableColumns.list}
            value={props.input.value}
            onChange={props.input.onChange}
          />
        )}
      </Field>
    </div>
  )
}

export default Columns
