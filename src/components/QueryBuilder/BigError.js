import React from 'react';
import PropTypes from 'prop-types';
import { Button, Headline, Icon } from '@folio/stripes-components';

import css from './css/BigError.css';

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
Something went wrong.
      </Headline>
      <Headline
        tag="h2"
        size="medium"
        faded
        className={css.Subheader}
      >
        {message}
      </Headline>
      <Button buttonStyle="primary" onClick={refresh}>Refresh</Button>
    </div>
  );
};

BigError.propTypes = {
  message: PropTypes.string
};

export default BigError;
