import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes, CalloutContext } from '@folio/stripes/core';
import { LoadingPane, ModalFooter, Button, Modal, Row, Col, TextField, Checkbox } from '@folio/stripes/components';
import fetchSavedQueryConfig from '../../util/fetchSavedQueryConfig';
import gitHubFetch from '../../util/gitHubFetch';
import BigError from '../BigError';


function SaveQueryModal({ onClose, queryFormValues, autoUpdateName }) {
  const callout = useContext(CalloutContext);
  const stripes = useStripes();
  const [config, setConfig] = useState();
  const [error, setError] = useState();
  const [updateName, setUpdateName] = useState(autoUpdateName);

  useEffect(() => {
    fetchSavedQueryConfig(stripes, setConfig, setError);
  }, [stripes]);

  const [values, setValues] = useState({
    autoRun: true,
    creator: stripes.user?.user?.username,
    created: new Date(),
  });

  if (error) return <BigError message={error} />;
  if (!config) return <LoadingPane />;


  function saveQuery() {
    const content = {
      ...queryFormValues,
      META: {
        displayName: values.displayName,
        autoRun: values.autoRun,
        creator: values.creator,
        created: values.created.toISOString(),
        // XXX We should set `updated` instead if the query already exists
        comment: values.comment,
      },
    };

    const data = {
      branch: config.branch,
      path: `/ldp-queries/${values.name}.json`,
      committer: {
        name: stripes.user?.user?.firstName + ' ' + stripes.user?.user?.lastName,
        email: stripes.user?.user?.email,
      },
      message: 'Saved from LDP app',

      content: btoa(JSON.stringify(content, null, 2)),
    };

    gitHubFetch(
      config,
      `repos/${config.owner}/${config.repo}/contents/queries/${values.name}.json`,
      { method: 'PUT', body: JSON.stringify(data) }
    )
      .then(async res => {
        onClose();
        const { displayName } = values;
        if (res.ok) {
          callout.sendCallout({
            message: <FormattedMessage id="ui-ldp.save-query.update.ok" values={{ displayName }} />
          });
        } else {
          const { code, statusText } = res;
          const detail = await res.text();
          callout.sendCallout({
            type: 'error',
            message: <FormattedMessage id="ui-ldp.save-query.update.fail" values={{ displayName, code, statusText, detail }} />
          });
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.error("can't happen, err =", err);
      });
  }


  const footer = (
    <ModalFooter>
      <Button
        buttonStyle="primary"
        onClick={saveQuery}
      >
        <FormattedMessage id="ui-ldp.button.save" />
      </Button>
      <Button onClick={onClose}>
        <FormattedMessage id="ui-ldp.button.cancel" />
      </Button>
    </ModalFooter>
  );

  return (
    <Modal
      id="save-query-modal"
      open
      onClose={onClose}
      dismissible
      label={<FormattedMessage id="ui-ldp.save-query" />}
      footer={footer}
    >
      <Row>
        <Col xs={4}>
          <TextField
            id="save-query-modal-name"
            label={<FormattedMessage id="ui-ldp.saved-queries.name" />}
            onChange={
              e => {
                setUpdateName(false);
                setValues({ ...values, name: e.target.value });
              }
            }
            value={values.name}
          />
        </Col>
        <Col xs={8}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.displayName" />}
            onChange={
              e => {
                const newValues = { ...values, displayName: e.target.value };
                if (updateName) {
                  newValues.name = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_');
                }
                setValues(newValues);
              }
            }
            autoFocus
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Checkbox
            checked={values.autoRun}
            label={<FormattedMessage id="ui-ldp.saved-queries.autoRun" />}
            onChange={e => setValues({ ...values, autoRun: e.target.checked })}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.creator" />}
            value={values.creator}
            disabled
          />
        </Col>
        <Col xs={8}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.created" />}
            value={values.created.toString()}
            disabled
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.comment" />}
            onChange={e => setValues({ ...values, comment: e.target.value })}
          />
        </Col>
      </Row>
    </Modal>
  );
}


SaveQueryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  queryFormValues: PropTypes.shape({
    tables: PropTypes.arrayOf(
      PropTypes.shape({
        schema: PropTypes.string.isRequired,
        // etc.
      }).isRequired,
    ).isRequired
  }).isRequired,
  autoUpdateName: PropTypes.bool.isRequired,
};


export default SaveQueryModal;
