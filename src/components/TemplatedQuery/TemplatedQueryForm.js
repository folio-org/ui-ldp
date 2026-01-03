import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import { useStripes, useOkapiKy } from '@folio/stripes/core';
import { TextField, Datepicker, Select, AutoSuggest, Loading, Button, Accordion } from '@folio/stripes/components';
import baseName from '../../util/baseName';
import { useLdp } from '../../LdpContext';
import { createReportRepo } from '../../util/repoTypes';
import ResultsList from '../QueryBuilder/ResultsList';
import loadReport from '../../util/loadReport';
import fetchOptions from '../../util/fetchOptions';
import QueryTimer from './QueryTimer';


function type2component(param) {
  if (param.type === 'date') {
    return [Datepicker, 'Datepicker'];
  } else if (param.type !== 'text') {
    // We could throw an "unsupported type" error, but it's probably friendlier to default to text
    return [TextField, 'DEFAULT'];
  } else if (param['controlled.fetchOptions']) {
    return [Select, 'Select'];
  } else if (param['controlled.options'] && !param['controlled.allowOtherValues']) {
    return [Select, 'Select'];
  } else if (param['controlled.options'] && param['controlled.allowOtherValues']) {
    return [AutoSuggest, 'AutoSuggest'];
  } else {
    return [TextField, 'TextField'];
  }
}


async function type2options(okapiKy, param) {
  const foVal = param['controlled.fetchOptions'];
  if (foVal) {
    return fetchOptions(okapiKy, foVal);
  }

  const rawData = param['controlled.options'];
  if (!rawData || param['controlled.allowOtherValues']) return undefined;
  return rawData.map(x => ({ value: x, label: x }));
}


// For some reason, <AutoSuggest> wants an `item` prop instead of `options`
function type2items(param) {
  const rawData = param['controlled.options'];
  if (!rawData || !param['controlled.allowOtherValues']) return undefined;
  return rawData.map(x => ({ value: x, label: x }));
}


async function parameterizedField(okapiKy, param) {
  const [component, _cname] = type2component(param);
  const dataOptions = await type2options(okapiKy, param);
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


function TemplatedQueryForm({ query, onSubmit, submitted, setSubmitted, data, setError }) {
  const intl = useIntl();
  const stripes = useStripes();
  const ldp = useLdp();
  const { json } = query;
  const reportRepo = createReportRepo(query.config);
  const urlBase = reportRepo.urlBase(query.filename);
  const okapiKy = useOkapiKy();
  const [fields, setFields] = useState(null);
  const makeSearchWithoutLimit = (values) => {
    const searchWithoutLimit = (setData) => {
      const url = reportRepo.rawFilePath(query.filename);
      loadReport(intl, stripes, url, values, setData, setError, ldp.maxExport);
    };
    return searchWithoutLimit;
  };

  // We have to omit okapiKy from the hook dependency below, otherwise
  // this hook gets called on each render, causing an infinite loop.
  useEffect(() => {
    const loadFields = async () => {
      const activeParams = json.parameters.filter(param => !param.disabled);
      const promises = activeParams.map(param => parameterizedField(okapiKy, param));
      const renderedFields = await Promise.all(promises);
      setFields(renderedFields);
    };

    loadFields();
  }, [json]); // eslint-disable-line react-hooks/exhaustive-deps

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
        {({ values, handleSubmit }) => (
          data ? <ResultsList results={data} searchWithoutLimit={makeSearchWithoutLimit(values)} /> :
          <form
            onSubmit={values2 => {
              setSubmitted(true);
              handleSubmit(values2);
            }}
          >
            {fields || <Loading />}
            <Button type="submit" disabled={submitted}>
              {!submitted ? (
                <FormattedMessage id="ui-ldp.button.submit" />
              ) : (
                <>
                  <FormattedMessage id="ui-ldp.button.submitted" />
                  {' '}
                  &mdash;
                  {' '}
                  <QueryTimer />
                </>
              )
              }
            </Button>
            {submitted && <Loading size="large" />}
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
  submitted: PropTypes.bool.isRequired,
  setSubmitted: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default TemplatedQueryForm;
