import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Headline, Icon } from '@folio/stripes/components';

import css from './BigError.css';

const refresh = () => {
  window.location.reload();
};

const BigError = ({ message }) => {
  return (
    <div style={{ textAlign: 'center', margin: 20 }}>
      <Icon icon="exclamation-circle" iconRootClass={css.ErrorIcon} />
      <Headline
        tag="h1"
        size="xx-large"
        margin="xx-small"
      >
        <FormattedMessage id="ui-ldp.something-went-wrong" />
      </Headline>
      <Headline
        tag="h2"
        size="medium"
        faded
        className={css.Subheader}
      >
        {message}
      </Headline>
      <Button buttonStyle="primary" onClick={refresh}>
        <FormattedMessage id="ui-ldp.refresh" />
      </Button>
    </div>
  );
};

BigError.propTypes = {
  message: PropTypes.string
};

export default BigError;
