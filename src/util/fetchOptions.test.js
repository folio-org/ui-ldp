import fetchOptions from './fetchOptions';
import vocabDescriptors from './vocabDescriptors';

const okapiKy = (body, ok = true) => jest.fn().mockResolvedValue({
  ok,
  status: ok ? 200 : 500,
  json: async () => body,
  text: async () => JSON.stringify(body),
});

const searchParamsOf = ky => ky.mock.calls[0][1].searchParams;

let warn;

beforeEach(() => {
  warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  warn.mockRestore();
});

describe('fetchOptions', () => {
  describe('choosing what to fetch', () => {
    it('looks a named controlled vocabulary up in the descriptor table', async () => {
      const ky = okapiKy({ mtypes: [] });
      await fetchOptions(ky, 'materialTypes');

      expect(ky.mock.calls[0][0]).toEqual(vocabDescriptors.materialTypes.wsapiPath);
    });

    it('accepts a descriptor object directly, for vocabularies not in the table', async () => {
      const ky = okapiKy({ things: [{ id: 'a', name: 'Thing' }] });
      const options = await fetchOptions(ky, {
        wsapiPath: 'things',
        resultPath: 'things',
        queryField: 'id',
        displaySpec: '{{name}}',
      });

      expect(ky.mock.calls[0][0]).toEqual('things');
      expect(options).toEqual([{ value: '', label: '' }, { value: 'a', label: 'Thing' }]);
    });

    it('warns and yields nothing for an unknown vocabulary name', async () => {
      const ky = okapiKy({});
      expect(await fetchOptions(ky, 'noSuchVocabulary')).toEqual([]);

      expect(ky).not.toHaveBeenCalled();
      expect(warn).toHaveBeenCalledWith('no such controlled vocabulary: ', 'noSuchVocabulary');
    });
  });

  describe('building the search parameters', () => {
    it('sorts across all records when there is a sort order but no query', async () => {
      const ky = okapiKy({ holdingsTypes: [] });
      await fetchOptions(ky, 'holdingsTypes');

      expect(searchParamsOf(ky))
        .toEqual({ query: 'cql.allRecords=1 sortby name', limit: 2000 });
    });

    it('appends the sort order to a query when there is both', async () => {
      const ky = okapiKy({ items: [] });
      await fetchOptions(ky, { ...vocabDescriptors.savedQueries, sortSpec: 'value.META.displayName' });

      expect(searchParamsOf(ky).query)
        .toEqual('scope=="ui-ldp.queries" sortby value.META.displayName');
    });

    it('uses the query alone when there is no sort order', async () => {
      const ky = okapiKy({ items: [] });
      await fetchOptions(ky, 'savedQueries');

      expect(searchParamsOf(ky).query).toEqual('scope=="ui-ldp.queries"');
    });

    it('sends no query at all when there is neither', async () => {
      const ky = okapiKy({ statisticalCodeTypes: [] });
      await fetchOptions(ky, 'statisticalCodeTypes');

      expect(searchParamsOf(ky)).not.toHaveProperty('query');
      expect(searchParamsOf(ky).limit).toEqual(500);
    });

    it('omits the limit when the descriptor sets none', async () => {
      const ky = okapiKy({ things: [] });
      await fetchOptions(ky, {
        wsapiPath: 'things', resultPath: 'things', queryField: 'id', displaySpec: '{{name}}',
      });

      expect(searchParamsOf(ky)).not.toHaveProperty('limit');
    });

    it('does not let a failed lookup throw', async () => {
      const ky = okapiKy({});
      await fetchOptions(ky, 'holdingsTypes');

      expect(ky.mock.calls[0][1].throwHttpErrors).toBe(false);
    });
  });

  describe('turning records into options', () => {
    it('prepends an empty option, so the field can be left unset', async () => {
      const ky = okapiKy({ mtypes: [{ id: 'bk', name: 'Book' }] });

      expect(await fetchOptions(ky, 'materialTypes'))
        .toEqual([{ value: '', label: '' }, { value: 'bk', label: 'Book' }]);
    });

    it('labels each record with the descriptor display spec', async () => {
      const ky = okapiKy({
        locations: [
          { id: '1', name: 'Main Library', code: 'ML' },
          { id: '2', name: 'Annex', code: 'AX' },
        ],
      });

      expect(await fetchOptions(ky, 'locations')).toEqual([
        { value: '', label: '' },
        { value: '1', label: 'Main Library (ML)' },
        { value: '2', label: 'Annex (AX)' },
      ]);
    });

    it('reads a nested display field', async () => {
      const ky = okapiKy({ items: [{ id: 'q1', value: { META: { displayName: 'Overdue loans' } } }] });

      expect(await fetchOptions(ky, 'savedQueries'))
        .toEqual([{ value: '', label: '' }, { value: 'q1', label: 'Overdue loans' }]);
    });

    it('finds the records down a nested result path', async () => {
      const ky = okapiKy({ a: { b: [{ id: 'x', name: 'Deep' }] } });
      const options = await fetchOptions(ky, {
        wsapiPath: 'things', resultPath: 'a.b', queryField: 'id', displaySpec: '{{name}}',
      });

      expect(options).toEqual([{ value: '', label: '' }, { value: 'x', label: 'Deep' }]);
    });
  });

  describe('when the vocabulary cannot be fetched', () => {
    it('warns and yields nothing on an HTTP error', async () => {
      const ky = okapiKy({ message: 'nope' }, false);

      expect(await fetchOptions(ky, 'holdingsTypes')).toEqual([]);
      expect(warn).toHaveBeenCalled();
    });

    it('warns and yields nothing when the result path is absent from the body', async () => {
      const ky = okapiKy({ somethingElse: [] });

      expect(await fetchOptions(ky, 'holdingsTypes')).toEqual([]);
      expect(warn).toHaveBeenCalledWith(
        'cannot extract controlled vocabulary holdingsTypes from response',
        { somethingElse: [] },
      );
    });
  });
});
