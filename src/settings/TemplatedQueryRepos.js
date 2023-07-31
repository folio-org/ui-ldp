import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { ConfigManager } from '@folio/stripes/smart-components';
import { Loading, Row, Col, TextField, IconButton } from '@folio/stripes/components';



function TemplatedQueryRepos(props) {
  const [ConnectedConfigManager, setConfigManager] = useState();

  useEffect(() => {
    setConfigManager(props.stripes.connect(ConfigManager));
  }, [props.stripes]);

  if (!ConnectedConfigManager) return <Loading size="xlarge" />;

  const getInitialValues = (settings) => {
    const res = settings.length === 0 ? '{}' : settings[0].value;
    return { repos: res };
  };

  const beforeSave = (data) => {
    return data.repos || [];
  };

  const userLabel = <FormattedMessage id="ui-ldp.settings.tqrepos.user" />;
  const repoLabel = <FormattedMessage id="ui-ldp.settings.tqrepos.repo" />;
  const dirLabel = <FormattedMessage id="ui-ldp.settings.tqrepos.directory" />;

  return (
    <ConnectedConfigManager
      formType="final-form"
      label={props.label}
      scope="ui-ldp.admin"
      configName="tqrepos"
      getInitialValues={getInitialValues}
      onBeforeSave={beforeSave}
    >
      <>
        <FieldArray name="repos">
          {({ fields }) => (
            <>
              {fields.map((subname, index) => (
                <div key={index}>
                  <Row>
                    <Col xs={11}>
                      <Field name={`${subname}.user`} label={userLabel} component={TextField} />
                      <Field name={`${subname}.repo`} label={repoLabel} component={TextField} />
                      <Field name={`${subname}.branch`} label={repoLabel} component={TextField} />
                      <Field name={`${subname}.dir`} label={dirLabel} component={TextField} />
                    </Col>
                    <Col xs={1}>
                      <IconButton icon="trash" onClick={() => fields.remove(index)} />
                    </Col>
                    <Col xs={12}>{
                        // eslint-disable-next-line @calm/react-intl/missing-formatted-message
                      }
                      https://github.com/
                      {fields.value[index].user}
                      /
                      {fields.value[index].repo}
                      /tree/
                      {fields.value[index].branch}
                      /
                      {fields.value[index].dir}
                      <hr />
                      <br />
                    </Col>
                  </Row>
                </div>
              ))}
              <IconButton icon="plus-sign" onClick={() => fields.push('')} />
            </>
          )}
        </FieldArray>
      </>
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
