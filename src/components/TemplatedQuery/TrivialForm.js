/* eslint-disable @calm/react-intl/missing-formatted-message */
/* eslint-disable no-console */
import React from 'react';
import { Form, Field } from 'react-final-form';
import { AutoSuggest, Button } from '@folio/stripes/components';

const testItems = [
  { value: 'book', label: 'Book' },
  { value: 'cd', label: 'CD' },
  { value: 'ebook', label: 'eBook' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'audiobook', label: 'Audiobook' },
];

function TrivialForm() {
  const onSubmit = () => {};

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <AutoSuggest
            label="autoSuggestTest raw"
            items={testItems}
            onChange={(e) => { console.log('raw changed, e =', e); }}
          />
          <Field
            name="astf"
            label="autoSuggestTest form"
            items={testItems}
            component={AutoSuggest}
            withFinalForm
            onChange={(e) => { console.log('changed to', e); }}
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Form>
  );
}

export default TrivialForm;
