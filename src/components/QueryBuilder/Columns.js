import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';
import { Button, MultiSelection, OptionSegment } from '@folio/stripes/components';
import ColumnFilter from './ColumnFilter';

// TODO: ability to remove column filter
// <button type="button" onClick={() => pop(`${table}.columns`)}>Remove Column</button>

const filterItems = ((filterText, list) => {
  const filterRegExp = new RegExp(`^${filterText}`, 'i');
  const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
  return { renderedItems };
});

const Columns = ({ availableColumns, disabled, table, tableIndex, push, pop }) => {
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
              disabled={disabled}
            />
          ))
        }
      </FieldArray>
      <Button disabled={disabled} onClick={() => push(`${table}.columnFilters`)}>Add Filter</Button>

      <Field
        name={`${table}.showColumns`}
        label="Show Columns"
        component={MultiSelection}
        placeholder="All"
        dataOptions={availableColumns.list}
        itemToString={(opt => opt)}
        formatter={({option, searchTerm}) => <OptionSegment searchTerm={searchTerm} >{option}</OptionSegment>}
        filter={filterItems}
        disabled={disabled}
      />
    </div>
  )
}

export default Columns
