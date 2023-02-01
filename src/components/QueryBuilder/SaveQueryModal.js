import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import { useStripes, CalloutContext } from '@folio/stripes/core';
import { ModalFooter, Button, Modal, Row, Col, TextField, Checkbox } from '@folio/stripes/components';
import stripesFetch from '../../util/stripesFetch';


function SaveQueryModal({ onClose, queryFormValues, autoUpdateName, metadataHasChanged }) {
  const callout = useContext(CalloutContext);
  const stripes = useStripes();
  const [updateName, setUpdateName] = useState(autoUpdateName);
  // console.log('SaveQueryModal: queryFormValues.META =', queryFormValues?.META);

  const [values, setValues] = useState({
    name: queryFormValues?.META?.name,
    displayName: queryFormValues?.META?.displayName,
    autoRun: queryFormValues?.META?.autoRun,
    creator: stripes.user?.user?.username,
    created: new Date(), // XXX handle updated
    comment: queryFormValues?.META?.comment,
  });

  const saveQuery = async () => {
    const META = {
      displayName: values.displayName,
      autoRun: values.autoRun,
      creator: values.creator,
      created: values.created.toISOString(),
      // XXX We should set `updated` instead if the query already exists
      comment: values.comment,
    };

    const content = { ...queryFormValues, META };

    let method, path, id; // eslint-disable-line one-var, one-var-declaration-per-line
    if (queryFormValues.META?.id) {
      method = 'PUT';
      path = `/settings/entries/${queryFormValues.META.id}`;
      id = queryFormValues.META.id;
    } else {
      method = 'POST';
      path = '/settings/entries';
      id = uuidv4();
    }

    const res = await stripesFetch(stripes, path, {
      method,
      body: JSON.stringify({
        id,
        scope: 'ui-ldp.queries',
        key: values.name,
        value: content,
      }),
    });

    console.log('saved, changing state to', content);
    metadataHasChanged(content);

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
  };

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
            value={values.displayName}
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
            value={values.comment}
          />
        </Col>
      </Row>
    </Modal>
  );
}


SaveQueryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  queryFormValues: PropTypes.shape({
    META: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      displayName: PropTypes.string.isRequired,
      autoRun: PropTypes.bool,
      comment: PropTypes.string,
    }),
    tables: PropTypes.arrayOf(
      PropTypes.shape({
        schema: PropTypes.string.isRequired,
        // etc.
      }).isRequired,
    ).isRequired
  }).isRequired,
  autoUpdateName: PropTypes.bool.isRequired,
  metadataHasChanged: PropTypes.func.isRequired,
};


export default SaveQueryModal;
