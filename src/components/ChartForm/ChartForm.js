import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useStripes, CalloutContext } from '@folio/stripes/core';
import { Pane, TextField, TextArea, Select, Button, Accordion } from '@folio/stripes/components';


function ChartForm({ data, onSubmit }) {
  const callout = useContext(CalloutContext);
  const history = useHistory();
  const stripes = useStripes();
  const showDevInfo = stripes.config?.showDevInfo;
  const header = (
    data.chart ?
      <FormattedMessage id="ui-ldp.chart.editHeading" values={{ name: data.chart.value.name }} /> :
      <FormattedMessage id="ui-ldp.chart.addHeading" />
  );

  const initialValues = data.chart ? { ...data.chart.value } : {};

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
          id="ui-ldp.chart.save.fail"
          values={{ name: values.name, code: status, statusText, detail }}
        />
      });
      return;
    }

    callout.sendCallout({
      message: <FormattedMessage id="ui-ldp.chart.save.ok" values={{ name: rec.value.name }} />
    });
    history.push(`/ldp/charts/${rec.id}`);
  };

  const chartTypes = [
    { value: 'line', label: 'Line' },
    { value: 'bar', label: 'Bar' },
    { value: 'pie', label: 'Pie' },
    { value: 'doughnut', label: 'Doughnut' },
  ];

  return (
    <Pane defaultWidth="fill" paneTitle={header}>
      <Form initialValues={initialValues} onSubmit={onSubmitWithReaction} mutators={{ ...arrayMutators }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" label={<FormattedMessage id="ui-ldp.field.name" />} required component={TextField} />
            <Field name="description" label={<FormattedMessage id="ui-ldp.field.description" />} component={TextArea} />
            <Field name="query.url" label={<FormattedMessage id="ui-ldp.field.queryUrl" />} component={TextField} />
            <Field name="query.params" label={<FormattedMessage id="ui-ldp.field.queryParams" />} component={TextField} />{/* XXX array of key/value */}
            <Field name="query.limit" label={<FormattedMessage id="ui-ldp.field.queryLimit" />} component={TextField} />
            <Field name="chart.type" label={<FormattedMessage id="ui-ldp.field.chartType" />} component={Select} dataOptions={chartTypes} />
            <Field name="chart.labelsField" label={<FormattedMessage id="ui-ldp.field.labelsField" />} component={TextField} />
            <Field name="datasets array" label={<FormattedMessage id="ui-ldp.field.datasets" />} component={TextField} />{/* XXX array of [label, dataField] */}
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


ChartForm.propTypes = {
  data: PropTypes.shape({
    chart: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default ChartForm;
