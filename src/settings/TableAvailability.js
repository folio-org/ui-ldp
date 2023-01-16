import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'redux-form';
import { useStripes } from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';
import { Loading, Checkbox } from '@folio/stripes/components';
import { useLdp } from '../LdpContext';
import BigError from '../components/BigError';
import loadTables from '../util/loadTables';
import defaultConfig from '../util/defaultConfig';

function TableAvailability(props) {
  const intl = useIntl();
  const stripes = useStripes();
  const ldp = useLdp();
  const [error, setError] = useState(false);
  const [tables, setTables] = useState(false);
  const [ConnectedConfigManager, setConfigManager] = useState();

  useEffect(() => {
    setConfigManager(props.stripes.connect(ConfigManager));
  }, [props.stripes]);

  useEffect(() => {
    loadTables(intl, stripes, setTables, setError);
  }, [intl, stripes, stripes.okapi, setTables]);

  if (error) return <BigError message={error} />;
  if (!ConnectedConfigManager || !tables) return <Loading size="xlarge" />;

  const getInitialValues = (settings) => {
    const value = settings.length === 0 ? '' : settings[0].value;
    let config;

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    const res = {};
    config.disabledTables.forEach(key => {
      res[key] = true;
    });
    return res;
  };

  const beforeSave = (data) => {
    const disabledTables = [];
    Object.keys(data).sort().forEach(key => {
      if (data[key]) disabledTables.push(key);
    });

    ldp.disabledTables = disabledTables;
    return JSON.stringify(ldp);
  };

  return (
    <ConnectedConfigManager
      label={props.label}
      moduleName="LDP"
      configName="recordLimits"
      getInitialValues={getInitialValues}
      onBeforeSave={beforeSave}
    >
      <FormattedMessage id="ui-ldp.settings.table-availability.check-to-disable" />
      {
        Object.keys(tables).sort().map(key => (
          <div key={key}>
            <h3>
              <FormattedMessage
                id="ui-ldp.settings.table-availability.schema"
                values={{
                  name: key,
                  code: chunks => <code>{chunks}</code>,
                }}
              />
            </h3>
            <ul style={{ listStyleType: 'none' }}>
              {
                tables[key]
                  .sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0))
                  .map(entry => (
                    <li key={entry.value}>
                      <Field
                        component={Checkbox}
                        type="checkbox"
                        label={entry.label}
                        name={`${key}-${entry.value}`}
                        data-cy={`${key}-${entry.value}`}
                      />
                    </li>
                  ))
              }
            </ul>
          </div>
        ))
      }
    </ConnectedConfigManager>
  );
}


TableAvailability.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.node.isRequired,
};


export default TableAvailability;
