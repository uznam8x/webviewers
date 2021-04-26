import num from './num';

describe('number', () => {
  test('random number', () => {
    expect(num.random(1, 10)).toBeLessThanOrEqual(10);
  });

  test('currency', () => {
    expect(num.currency(12345678)).toEqual('12,345,678');
  });
});
