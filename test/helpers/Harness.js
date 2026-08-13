import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { noop } from 'lodash';
// import {
//   QueryClientProvider,
//   QueryClient,
// } from 'react-query';

// We know we have stripes-core, because we depend on @folio/stripes
// eslint-disable-next-line import/no-extraneous-dependencies
import { StripesContext } from '@folio/stripes-core/src/StripesContext';
// import createReactQueryClient from '@folio/stripes-core/src/createReactQueryClient';

import translationsProperties from './translationsProperties';
import prefixKeys from './prefixKeys';
import mockOffsetSize from './mockOffsetSize';

const stripesDefaultProps = {
  okapi: { url: '' },
  logger: { log: noop },
  connect: Component => props => (
    <Component
      {... props}
      mutator={{}}
      resources={{}}
    />
  ),
};
// const reactQueryClient = new QueryClient(createReactQueryClient());

// react-intl renders a message id verbatim when it has no translation
// for it, so a component asking for an id that is not in
// test/helpers/translations.js would render `ui-ldp.whatever` and still
// satisfy an assertion written against that text. Fail instead.
//
// Only our own ids are policed. The stripes-components messages come
// from the installed package rather than from us: a missing one means
// that package's translations have moved on, which is not this
// repository's test failing.
//
function onIntlError(e) {
  if (e.code === 'MISSING_TRANSLATION' && e.descriptor?.id?.startsWith('ui-ldp.')) {
    throw e;
  }
}

function Harness({
  // translations: translationsConfig,
  shouldMockOffsetSize = true,
  width = 500,
  height = 500,
  stripesCustomProps = {},
  children,
}) {
  const allTranslations = {}; // prefixKeys(translations);
  const stripes = { ...stripesDefaultProps, ...stripesCustomProps };

  translationsProperties.forEach(tx => {
    Object.assign(allTranslations, prefixKeys(tx.translations, tx.prefix));
  });

  if (shouldMockOffsetSize) {
    mockOffsetSize(width, height);
  }

  return (
    <StripesContext.Provider value={stripes}>
      <IntlProvider
        locale="en"
        key="en"
        timeZone="UTC"
        messages={allTranslations}
        onError={onIntlError}
      >
        {children}
      </IntlProvider>
    </StripesContext.Provider>
  );
}

Harness.propTypes = {
  children: PropTypes.node,
  // translations: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     prefix: PropTypes.string,
  //     translations: PropTypes.object,
  //   })
  // ),
  stripesCustomProps: PropTypes.object,
  shouldMockOffsetSize: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Harness;
