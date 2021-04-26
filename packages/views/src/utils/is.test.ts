import is from './is';

describe('is', () => {
  test('array', () => {
    expect(is.array([])).toBeTruthy();
    expect(is.array({})).toBeFalsy();
  });
  test('object', () => {
    expect(is.object({})).toBeTruthy();
    expect(is.object([])).toBeFalsy();
  });
  test('empty', () => {
    expect(is.empty([])).toBeTruthy();
    expect(is.empty({})).toBeTruthy();
    expect(is.empty([{ a: 1 }])).toBeFalsy();
    expect(is.empty({ a: 1 })).toBeFalsy();
  });
});
