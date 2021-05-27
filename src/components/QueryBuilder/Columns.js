import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';
import { Button, Label, MultiSelection, OptionSegment, Select } from '@folio/stripes/components';
import { useLdp } from '../../LdpContext';
import generateOptions from '../../util/generateOptions';
import ColumnFilter from './ColumnFilter';

// TODO: ability to remove column filter
// <button type="button" onClick={() => pop(`${namePrefix}.columns`)}>Remove Column</button>

const filterItems = ((filterText, list) => {
  const filterRegExp = new RegExp(`^${filterText}`, 'i');
  const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
  return { renderedItems };
});

const Columns = ({ availableColumns, disabled, namePrefix, tableIndex, push }) => {
  const ldp = useLdp();
  const limitOptions = generateOptions(0, 1 + Math.log10(ldp.maxShow || 1));

  return (
    <div>
      <Label htmlFor="choose-columns">Column</Label>
      <FieldArray id="choose-columns" name={`${namePrefix}.columnFilters`} tableIndex={tableIndex}>
        {({ fields }) => fields.map((name, index) => (
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
      <Button disabled={disabled} onClick={() => push(`${namePrefix}.columnFilters`)}>Add Filter</Button>

      <Field
        name={`${namePrefix}.showColumns`}
        label="Show Columns"
        component={MultiSelection}
        placeholder="(All)"
        dataOptions={availableColumns.list}
        itemToString={(opt => opt)}
        formatter={({ option, searchTerm }) => <OptionSegment searchTerm={searchTerm}>{option}</OptionSegment>}
        filter={filterItems}
        disabled={disabled}
      />

      <Field
        name={`${namePrefix}.limit`}
        label="Limit number of results"
        component={Select}
        dataOptions={limitOptions}
        type="number"
        disabled={disabled}
      />
    </div>
  );
};

Columns.propTypes = {
  availableColumns: PropTypes.object,
  disabled: PropTypes.bool,
  namePrefix: PropTypes.string,
  tableIndex: PropTypes.number,
  push: PropTypes.func,
};

export default Columns;
