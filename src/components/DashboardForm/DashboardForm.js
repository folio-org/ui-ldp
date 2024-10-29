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
  const header = <FormattedMessage id="ui-ldp.dashboard.editHeading" values={{ name: data.dashboard.value.name }} />;

  const initialValues = { ...data.dashboard.value };
  const dataOptions = data.allCharts.map(x => ({ value: x.id, label: x.value.name }));

  const onSubmitWithReaction = async (values, y, z) => {
    try {
      await onSubmit(values, y, z);
      callout.sendCallout({
        message: <FormattedMessage id="ui-ldp.save-dashboard.ok" values={{ name: values.name }} />
      });
      history.push(`../${data.dashboard.id}`);
    } catch (res) {
      const { status, statusText } = res;
      const detail = await res.text();
      callout.sendCallout({
        type: 'error',
        message: <FormattedMessage
          id="ui-ldp.save-dashboard.fail"
          values={{ name: values.name, code: status, statusText, detail }}
        />
      });
    }
  };


  return (
    <Pane defaultWidth="fill" paneTitle={header}>
      <Form initialValues={initialValues} onSubmit={onSubmitWithReaction} mutators={{ ...arrayMutators }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" label={<FormattedMessage id="ui-ldp.dashboard.name" />} required component={TextField} />
            <Field name="description" label={<FormattedMessage id="ui-ldp.dashboard.description" />} component={TextArea} />

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
                            <FormattedMessage id="ui-ldp.dashboard.chartNumber" values={{ number: index + 1 }} />
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
