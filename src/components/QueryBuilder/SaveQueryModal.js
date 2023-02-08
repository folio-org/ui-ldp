import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import { useStripes, CalloutContext } from '@folio/stripes/core';
import { ModalFooter, Button, Modal, Row, Col, TextField, Checkbox } from '@folio/stripes/components';
import stripesFetch from '../../util/stripesFetch';


function SaveQueryModal({ onClose, queryFormValues, metadataHasChanged }) {
  const callout = useContext(CalloutContext);
  const stripes = useStripes();
  // console.log('SaveQueryModal: queryFormValues.META =', queryFormValues?.META);

  const isNew = !queryFormValues.META?.id;
  const [values, setValues] = useState({
    ...queryFormValues?.META,
    [isNew ? 'creator' : 'updater']: stripes.user?.user?.username,
    [isNew ? 'created' : 'updated']: new Date(),
  });

  const saveQuery = async () => {
    const META = {
      displayName: values.displayName,
      autoRun: values.autoRun,
      creator: values.creator,
      created: values.created,
      updater: values.updater,
      updated: values.updated,
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
      content.META.id = id = uuidv4(); // eslint-disable-line no-multi-assign
    }

    const res = await stripesFetch(stripes, path, {
      method,
      body: JSON.stringify({
        id,
        scope: 'ui-ldp.queries',
        key: id, // We don't actually use this, it's just a disambigutor
        value: content,
      }),
    });

    content.META.id = id;
    metadataHasChanged(content);

    onClose();
    const { displayName } = values;
    if (res.ok) {
      callout.sendCallout({
        message: <FormattedMessage id="ui-ldp.save-query.update.ok" values={{ displayName }} />
      });
    } else {
      const { status, statusText } = res;
      const detail = await res.text();
      const messageTag = status === 404 ? 'notFound' : 'fail';
      callout.sendCallout({
        type: 'error',
        message: <FormattedMessage
          id={`ui-ldp.save-query.update.${messageTag}`}
          values={{ displayName, code: status, statusText, detail }}
        />
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
        <Col xs={12}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.displayName" />}
            onChange={e => setValues({ ...values, displayName: e.target.value })}
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
            value={values.created ? new Date(values.created).toLocaleString() : ''}
            disabled
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.updater" />}
            value={values.updater || ''}
            disabled
          />
        </Col>
        <Col xs={8}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.updated" />}
            value={values.updated ? new Date(values.updated).toLocaleString() : ''}
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
      displayName: PropTypes.string,
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
  metadataHasChanged: PropTypes.func.isRequired,
};


export default SaveQueryModal;
