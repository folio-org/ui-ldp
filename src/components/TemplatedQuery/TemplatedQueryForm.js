import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import { TextField, Datepicker, Button } from '@folio/stripes/components';
import baseName from '../../util/baseName';


function type2component(type) {
  if (type === 'date') return Datepicker;
  // Others?
  return TextField;
}


function TemplatedQueryForm({ query }) {
  const { json, config } = query;
  const urlBase = `https://github.com/${config.user}/${config.repo}/blob/${config.branch}/${config.dir}/${query.filename}`;

  function onSubmit(a, b, c) {
    console.log('onSubmit:', a, b, c);
  }

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
            {json.parameters.map(param => (
              <Field
                key={param.name}
                name={param.name}
                label={param.displayName}
                required={param.required}
                component={type2component(param.type)}
              />
            ))}
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
