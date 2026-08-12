import generateOptions from './generateOptions';

describe('generateOptions', () => {
  it('generates successive powers of ten from the given exponent', () => {
    expect(generateOptions(1, 3)).toEqual([
      { value: 10, label: 10 },
      { value: 100, label: 100 },
      { value: 1000, label: 1000 },
    ]);
  });

  it('starts at 10^0 when startFrom is zero', () => {
    expect(generateOptions(0, 2)).toEqual([
      { value: 1, label: 1 },
      { value: 10, label: 10 },
    ]);
  });

  it('returns an empty list for a count of zero', () => {
    expect(generateOptions(1, 0)).toEqual([]);
  });

  it('uses the same number for value and label', () => {
    generateOptions(2, 10).forEach(option => {
      expect(option.value).toBe(option.label);
      expect(typeof option.value).toEqual('number');
    });
  });
});
