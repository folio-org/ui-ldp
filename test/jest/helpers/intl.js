import { createIntl } from 'react-intl';

import translations from '../../helpers/translations';
import prefixKeys from '../../helpers/prefixKeys';

// A real intl object, for testing the many utility functions that take
// an intl and format a message. The messages are the test-owned dummies
// in test/helpers/translations.js, not the real en.json -- see the note
// there. The Harness renders components with the same messages, so
// component and utility tests agree on what any given id formats to.
//
// Any intl error -- a missing id, an unsupplied placeholder -- throws
// rather than being reported and worked around, so that a key renamed in
// src/ without being renamed here fails the test instead of quietly
// producing plausible-looking output.
//
const intl = createIntl({
  locale: 'en',
  messages: prefixKeys(translations),
  onError: (e) => { throw e; },
});

export default intl;
