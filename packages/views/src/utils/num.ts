import { curry } from 'ramda';
/**
 * 범위내 무작위 숫자
 * @example
 * num.random(1, 10); // '8'
 */
export const random = curry((min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
});

/**
 * 숫자 3자리 마다 ,(콤마) 추가
 * @example
 * num.currency(12345678); // '12,345,678'
 */
export const currency = curry((num: number | string): string => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

export default { random, currency };
