import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import { TextField, Datepicker, Select, /* AutoSuggest, */ Button, Accordion } from '@folio/stripes/components';
import baseName from '../../util/baseName';
import { createReportRepo } from '../../util/repoTypes';
import ResultsList from '../QueryBuilder/ResultsList';


function type2component(param) {
  if (param.type === 'date') {
    return [Datepicker, 'Datepicker'];
  } else if (param.type !== 'text') {
    // We could throw an "unsupported type" error, but it's probably friendlier to default to text
    return [TextField, 'DEFAULT'];
  } else if (param['controlled.options'] && !param['controlled.allowOtherValues']) {
    return [Select, 'Select'];
    /*
  // For now, we don't use AutoSuggest, as it doesn't work inside a react-final-form: see UILDP-147
  } else if (param['controlled.options'] && param['controlled.allowOtherValues']) {
    return [AutoSuggest, 'AutoSuggest'];
    */
  } else {
    return [TextField, 'TextField'];
  }
}


function type2options(param) {
  const rawData = param['controlled.options'];
  if (!rawData || param['controlled.allowOtherValues']) return undefined;
  return rawData.map(x => ({ value: x, label: x }));
}


function type2items(param) {
  const rawData = param['controlled.options'];
  if (!rawData || !param['controlled.allowOtherValues']) return undefined;
  return rawData.map(x => ({ value: x, label: x }));
}


function parameterizedField(param) {
  const [component, _cname] = type2component(param);
  const dataOptions = type2options(param);
  const items = type2items(param);

  const extraParams = {};
  if (dataOptions) extraParams.dataOptions = dataOptions;
  if (items) extraParams.items = items;

  return (
    <Field
      key={param.name}
      name={param.name}
      label={param.displayName}
      required={param.required}
      component={component}
      {...extraParams}
    />
  );
}


function TemplatedQueryForm({ query, onSubmit, data }) {
  const { json } = query;
  const reportRepo = createReportRepo(query.config);
  const urlBase = reportRepo.urlBase(query.filename);

  const initialValues = {};
  json.parameters.forEach(param => {
    const v = param.default;
    if (v !== undefined) initialValues[param.name] = v;
  });

  return (
    <>
      <p>
        <b><FormattedMessage id="ui-ldp.templated-queries.source" /></b>
        :&nbsp;
        <a target="_blank" rel="noreferrer" href={`${urlBase}`}>
          [<FormattedMessage id="ui-ldp.templated-queries.source.sql" />]
        </a>
        &nbsp;
        <a target="_blank" rel="noreferrer" href={`${baseName(urlBase)}.json`}>
          [<FormattedMessage id="ui-ldp.templated-queries.source.json" />]
        </a>
      </p>
      {json.description && <p>{json.description}</p>}
      {json.instructions && (
        <>
          <h3><FormattedMessage id="ui-ldp.templated-queries.instructions" /></h3>
          <p>{json.instructions}</p>
        </>
      )}
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          data ? <ResultsList results={data} /> :
          <form onSubmit={handleSubmit}>
            {json.parameters
              .filter(param => !param.disabled)
              .map(param => parameterizedField(param))
            }
            <Button type="submit">
              <FormattedMessage id="ui-ldp.button.submit" />
            </Button>
            <br style={{ marginTop: '2em' }} />
            <Accordion closedByDefault label={<FormattedMessage id="ui-ldp.devinfo" />}>
              <pre>{JSON.stringify(query, null, 2)}</pre>
            </Accordion>
          </form>
        )}
      </Form>
    </>
  );
}

TemplatedQueryForm.propTypes = {
  query: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    config: PropTypes.shape({
      type: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      repo: PropTypes.string.isRequired,
      branch: PropTypes.string.isRequired,
      dir: PropTypes.string.isRequired,
    }).isRequired,
    json: PropTypes.shape({
      description: PropTypes.string.isRequired,
      instructions: PropTypes.string.isRequired,
      parameters: PropTypes.arrayOf(
        PropTypes.shape({
        }).isRequired,
      ).isRequired,
    }),
  }).isRequired,
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default TemplatedQueryForm;
