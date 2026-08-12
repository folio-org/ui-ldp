// We know we have stripes-components, because we depend on @folio/stripes
// eslint-disable-next-line import/no-extraneous-dependencies
import stripesComponentsTranslations from '@folio/stripes-components/translations/stripes-components/en';

// Test-owned dummies rather than translations/ui-ldp/en.json, which the
// translation service rewrites. The stripes-components messages below
// are the real ones: they belong to an upstream package rather than to
// this repository's translation pipeline, and its components need them
// to render their own furniture sensibly.
import translations from './translations';

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
