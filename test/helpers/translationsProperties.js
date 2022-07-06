// We know we have stripes-components, because we depend on @folio/stripes
// eslint-disable-next-line import/no-extraneous-dependencies
import stripesComponentsTranslations from '@folio/stripes-components/translations/stripes-components/en';

import translations from '../../translations/ui-ldp/en';

const translationsProperties = [
  {
    prefix: 'ui-ldp',
    translations,
  },
  {
    prefix: 'stripes-components',
    translations: stripesComponentsTranslations,
  },
  {
    prefix: 'stripes-smart-components',
    translations: {
      hideSearchPane: 'hideSearchPane',
      showSearchPane: 'showSearchPane',
      numberOfFilters: 'numberOfFilters',
    },
  },
];

export default translationsProperties;
