import str from './str';

describe('string', () => {
  test('random string', () => {
    expect(str.random()).toHaveLength(11);
    expect(str.random(12)).toHaveLength(12);
  });

  test(`repeat`, () => {
    expect(str.repeat('0', 2)).toEqual('00');
  });

  test(`pad`, () => {
    expect(str.pad('7', 4, '0')).toEqual('0007');
    expect(str.pad('7', 4, '0', 'right')).toEqual('7000');
  });

  test(`compile`, () => {
    expect(str.compile('/user/{user.id}', { user: { id: 4 } })).toEqual(
      '/user/4'
    );
  });

  test(`camelcase`, () => {
    expect(str.camelcase('abcd_efg')).toEqual('abcdEfg');
  });

  test(`snakecase`, () => {
    expect(str.snakecase('abcdEfg')).toEqual('abcd_efg');
  });

  //
  test(`currency`, () => {
    expect(str.currency('1234')).toEqual('1,234');
    expect(str.currency(1234)).toEqual('1,234');
  });

  test(`number`, () => {
    expect(str.number('t1e2s3t4')).toEqual('1234');
  });

  test(`alphabet`, () => {
    expect(str.alphabet('A1%%^l!_p+-h=a&*b(e@t(')).toEqual('Alphabet');
  });

  test(`letter`, () => {
    expect(str.letter('$#L?!e[t](t)*e#r')).toEqual('Letter');
  });
});
