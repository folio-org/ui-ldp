import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { ConfigManager } from '@folio/stripes/smart-components';
import { Loading, Row, Col, TextField, Label, IconButton, Button } from '@folio/stripes/components';



function TemplatedQueryRepos(props) {
  const [ConnectedConfigManager, setConfigManager] = useState();

  useEffect(() => {
    setConfigManager(props.stripes.connect(ConfigManager));
  }, [props.stripes]);

  if (!ConnectedConfigManager) return <Loading size="xlarge" />;

  const getInitialValues = (settings) => {
    console.log('getInitialValues', settings);
    const res = settings.length === 0 ? '{}' : settings[0].value;
    console.log('-->', res);
    return { repos: res };
  };

  const beforeSave = (data) => {
    console.log('beforeSave: data =', data);
    return data.repos;
  };

  return (
    <ConnectedConfigManager
      formType="final-form"
      label={props.label}
      scope="ui-ldp.admin"
      configName="tqrepos"
      getInitialValues={getInitialValues}
      onBeforeSave={beforeSave}
    >
      <FormattedMessage id="ui-ldp.settings.tqrepos.githubRepos">
        {label => (
          <>
            {label && <Label>{label}</Label>}
            <FieldArray name="repos">
              {({ fields }) => (
                <>
                  {fields.map((subname, index) => (
                    <Row>
                      <Col xs={11}>
                        <Field name={subname} component={TextField} />
                      </Col>
                      <Col xs={1}>
                        <IconButton icon="trash" onClick={() => fields.remove(index)} />
                      </Col>
                    </Row>
                  ))}
                    <Row>
                      <Col xs={11} />
                      <Col xs={1}>
                        <IconButton icon="plus-sign" onClick={() => fields.push('')} />
                      </Col>
                    </Row>
                </>
              )}
            </FieldArray>
          </>
        )}
      </FormattedMessage>
    </ConnectedConfigManager>
  );
}


TemplatedQueryRepos.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.node.isRequired,
};


export default TemplatedQueryRepos;
