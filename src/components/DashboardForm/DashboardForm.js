import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { useStripes, CalloutContext } from '@folio/stripes/core';
import { Pane, TextField, TextArea, Select, IconButton, Button, Accordion } from '@folio/stripes/components';


function DashboardForm({ data, onSubmit }) {
  const callout = useContext(CalloutContext);
  const history = useHistory();
  const stripes = useStripes();
  const showDevInfo = stripes.config?.showDevInfo;
  const header = (
    data.dashboard ?
      <FormattedMessage id="ui-ldp.dashboard.editHeading" values={{ name: data.dashboard.value.name }} /> :
      <FormattedMessage id="ui-ldp.dashboard.addHeading" />
  );

  const initialValues = data.dashboard ? { ...data.dashboard.value } : { charts: [] };
  const dataOptions = data.allCharts.map(x => ({ value: x.id, label: x.value.name }));

  const onSubmitWithReaction = async (values, y, z) => {
    let rec;
    try {
      rec = await onSubmit(values, y, z);
    } catch (res) {
      const { status, statusText } = res;
      const detail = await res.text();
      callout.sendCallout({
        type: 'error',
        message: <FormattedMessage
          id="ui-ldp.dashboard.save.fail"
          values={{ name: values.name, code: status, statusText, detail }}
        />
      });
      return;
    }

    callout.sendCallout({
      message: <FormattedMessage id="ui-ldp.dashboard.save.ok" values={{ name: rec.value.name }} />
    });
    history.push(`/ldp/dashboards/${rec.id}`);
  };


  return (
    <Pane defaultWidth="fill" paneTitle={header}>
      <Form initialValues={initialValues} onSubmit={onSubmitWithReaction} mutators={{ ...arrayMutators }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" label={<FormattedMessage id="ui-ldp.field.name" />} required component={TextField} />
            <Field name="description" label={<FormattedMessage id="ui-ldp.field.description" />} component={TextArea} />

            <FieldArray name="charts">
              {({ fields }) => (
                <>
                  {fields.map((name, index) => (
                    <div key={index}>
                      <Field
                        placeholder="-"
                        name={name}
                        label={(
                          <>
                            <FormattedMessage id="ui-ldp.field.chartNumber" values={{ number: index + 1 }} />
                            <IconButton icon="trash" onClick={() => fields.remove(index)} />
                          </>
                        )}
                        component={Select}
                        dataOptions={dataOptions}
                      />
                    </div>
                  ))}
                  <Button type="button" onClick={() => fields.push('')}>
                    <FormattedMessage id="ui-ldp.dashboard.addChart" />
                  </Button>
                </>
              )}
            </FieldArray>
            <div>
              <Button type="submit" buttonStyle="primary">
                <FormattedMessage id="ui-ldp.button.submit" />
              </Button>
            </div>
          </form>
        )}
      </Form>
      {showDevInfo &&
        <Accordion closedByDefault label={<FormattedMessage id="ui-ldp.devinfo" />}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Accordion>
      }
    </Pane>
  );
}


DashboardForm.propTypes = {
  data: PropTypes.shape({
    dashboard: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    }).isRequired,
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
