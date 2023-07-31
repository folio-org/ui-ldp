import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { ConfigManager } from '@folio/stripes/smart-components';
import { Loading, TextField } from '@folio/stripes/components';


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
      label={props.label}
      scope="ui-ldp.admin"
      configName="tqrepos"
      getInitialValues={getInitialValues}
      onBeforeSave={beforeSave}
    >
      <FormattedMessage id="ui-ldp.settings.tqrepos.githubRepos">
        {label => (
          <Field
            component={TextField}
            id="repos"
            name="repos"
            label={label}
          />
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
