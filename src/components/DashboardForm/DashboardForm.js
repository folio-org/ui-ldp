import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Pane, TextField, TextArea, Select, Button } from '@folio/stripes/components';


function DashboardForm({ data, onSubmit }) {
  const header = <FormattedMessage id="ui-ldp.dashboard.editHeading" values={{ name: data.dashboard.value.name }} />;

  const initialValues = { ...data.dashboard.value };
  const dataOptions = data.allCharts.map(x => ({ value: x.id, label: x.value.name }));

  return (
    <Pane defaultWidth="fill" paneTitle={header}>
      <Form initialValues={initialValues} onSubmit={onSubmit} mutators={{ ...arrayMutators }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" label={<FormattedMessage id="ui-ldp.dashboard.name" />} required component={TextField} />
            <Field name="description" label={<FormattedMessage id="ui-ldp.dashboard.description" />} component={TextArea} />

            <FieldArray name="charts">
              {({ fields }) => (
                <div>
                  {fields.map((name, index) => (
                    <div key={index}>
                      <Field name={name} label="ID" component={Select} dataOptions={dataOptions} />
                      <button type="button" onClick={() => fields.remove(index)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => fields.push('')}>Add</button>
                </div>
              )}
            </FieldArray>

            <Button type="submit">
              <FormattedMessage id="ui-ldp.button.submit" />
            </Button>
          </form>
        )}
      </Form>
    </Pane>
  );
}


DashboardForm.propTypes = {
  data: PropTypes.shape({
    dashboard: PropTypes.shape({
      value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    }).isRequired,
    chartSpecs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired,
      }).isRequired,
    ).isRequired,
    allCharts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.object.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default DashboardForm;
