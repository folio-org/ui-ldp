import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import { TextField, Datepicker, Select, AutoSuggest, Button } from '@folio/stripes/components';
import baseName from '../../util/baseName';


function type2component(param) {
  if (param.type === 'date') {
    return [Datepicker, 'Datepicker'];
  } else if (param.type !== 'text') {
    // We could throw an "unsupported type" error, but it's probably friendlier to default to text
    return [TextField, 'DEFAULT'];
  } else if (param['controlled.options'] && param['controlled.allowOtherValues']) {
    return [AutoSuggest, 'AutoSuggest'];
  } else if (param['controlled.options']) {
    return [Select, 'Select'];
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
  if (param.displayName !== 'Permanent location filter') return undefined;
  const [component, _cname] = type2component(param);
  const dataOptions = type2options(param);
  const items = type2items(param);
  // console.log(`parameterizedField: component=${cname} dataOptions=${dataOptions} items=${items} for`, param);

  return (
    <Field
      key={param.name}
      name={param.name}
      label={param.displayName}
      required={param.required}
      component={component}
      dataOptions={dataOptions}
      items={items}
    />
  );
}


function TemplatedQueryForm({ query }) {
  const { json, config } = query;
  const urlBase = `https://github.com/${config.user}/${config.repo}/blob/${config.branch}/${config.dir}/${query.filename}`;

  const onSubmit = (a, b, c) => {
    // eslint-disable-next-line no-console
    console.log('onSubmit:', a, b, c);
  };

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
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {json.parameters.map(param => parameterizedField(param))}
            <Button type="submit">
              <FormattedMessage id="ui-ldp.button.submit" />
            </Button>
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
};

export default TemplatedQueryForm;
