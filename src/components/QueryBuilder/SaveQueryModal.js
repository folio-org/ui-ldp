import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { ModalFooter, Button, Modal, Row, Col, TextField, Checkbox } from '@folio/stripes/components';


function SaveQueryModal({ open, onClose }) {
  const stripes = useStripes();
  const [values, setValues] = useState({
    creator: stripes.user?.user?.username,
    created: new Date(),
  });

  const footer = (
    <ModalFooter>
      <Button
        buttonStyle="primary"
        onClick={() => console.log('XXX save', values)}
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
      open={open}
      onClose={onClose}
      dismissible
      label={<FormattedMessage id="ui-ldp.save-query" />}
      footer={footer}
    >
      <Row>
        <Col xs={4}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.name" />}
            onChange={e => setValues({ ...values, name: e.target.value })}
          />
        </Col>
        <Col xs={8}>
          <TextField
            label={<FormattedMessage id="ui-ldp.saved-queries.displayName" />}
            onChange={e => setValues({ ...values, displayName: e.target.value })}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Checkbox
            label={<FormattedMessage id="ui-ldp.saved-queries.autoRun" />}
            value="TBA"
            onChange={e => setValues({ ...values, autoRun: e.target.value })}
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
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};


export default SaveQueryModal;
