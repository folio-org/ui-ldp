import React, { useState, useEffect } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { FormSpy, useFormState } from 'react-final-form';
import get from 'lodash.get';
import { Button, Selection, TextField, MultiSelection } from '@folio/stripes/components';
import ColumnFilter from './ColumnFilter';

const Columns = ({ table, tableIndex }) => {
  const { values } = useFormState();
  const selectedTableName = get(values, `${table}.tableName`)
  const [availableColumns, setAvailableColumns] = useState([]);
  
  const getColumns = async (selectedTableName) => {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/columns?table=${selectedTableName}`
    try {
      const resp = await fetch(url)
      resp
        .json()
        .then(resp => {
          // setIsLoadingFields(false)
          setAvailableColumns(resp.map(c => ({ value: c.columnName, label: c.columnName })))
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
      <FieldArray name={`${table}.columns`} tableIndex={tableIndex}>
        {({ fields }) =>
          fields.map((name, index) => (
            <ColumnFilter
              name={name}
              index={index}
              key={name}
              availableColumns={availableColumns}
              onRemove={() => fields.remove(index)}
            />
          ))
        }
      </FieldArray>
    </div>
  )
}

export default Columns
