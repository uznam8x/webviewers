import { curry } from 'ramda';
import num from './num';

/**
 * 무작위 문자
 * @example
 * str.random(); // 'JvDzLoS-_9p'
 */
export const random = (n: number = 11): string => {
  const characters =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  let result = '';
  for (let i = 0; i < n; i++) {
    result += characters[num.random(0, characters.length - 1)];
  }
  return result;
};

/**
 * 기존 문자열에 문자 채워넣기
 * @example
 * str.pad('7', 4, '0'); // '0007'
 */
export const pad = curry(
  (
    str: string,
    len: number = 2,
    char: string = '0',
    direction: 'left' | 'right' = 'left'
  ): string => {
    const r = repeat(char, len - str.length);
    if (str.length < len) {
      return direction === 'left' ? r + str : str + r;
    } else {
      return str;
    }
  }
);

/**
 * 문자열 반복
 * @example
 * str.repeat('7', 4); // '7777'
 */
export const repeat = curry((str: string, num: number): string => {
  return new Array(num + 1).join(str);
});

/**
 * 템플릿 치환
 * @example
 * str.compile('/user/{user.id}', {user: {id: 4}}); => /user/4
 */
export const compile = curry((template: string, data: any) => {
  return template.replace(/({([^}]+)})/g, ($1) => {
    const match = $1.replace(/\{/g, '').replace(/\}/g, '');
    return match.split('.').reduce((a: any, b: any) => {
      return a.hasOwnProperty(b) ? a[b] : '';
    }, data);
  });
});

/**
 * camel case로 변환
 * @example
 * str.camalize('abcd_efg'); => abcdEfg
 */

export const camelcase = (str: string) => {
  return str
    .replace(/[\s|_|-](.)/g, ($1) => $1.toUpperCase())
    .replace(/[\s|_|-]/g, '')
    .replace(/^(.)/, ($1) => $1.toLowerCase());
};

/**
 * snake case로 변환
 * @example
 * str.snakecase('abcdEfg'); => abcd_efg
 */
export const snakecase = (str: string | number) => {
  return str
    .toString()
    .replace(/[^A-Za-z0-9u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((char) => char.toLowerCase())
    .join('_');
};

/**
 * 3자리 마다 (,)콤마
 * @example
 * str.currency('1234' || 1234); => '1,234'
 */

export const currency = (str: string | number) => {
  const value = str.toString();
  return value.length
    ? parseInt(value.replace(/\D+/g, ''))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '0';
};

/**
 * 숫자만
 * @example
 * str.number('t1e2s3t4'); => '1234'
 */
export const number = (str: string) => {
  return str.replace(/\D+/g, '');
};

/**
 * 영문만
 * @example
 * str.alphabet('a1%%^l!_p+-h=a&*bet'); => 'Alphabet'
 */
export const alphabet = (str: string) => {
  return str.replace(/\W+|\d+|_/g, '');
};

/**
 * 영문만
 * @example
 * str.letter('$#L?!e[t](t)*e#r'); => 'Letter'
 */
export const letter = (str: string) => {
  return str.replace(/[^a-zA-Z0-9\-_]/g, '');
};
/**
 * 전화번호 쪼개기
 * @example
 * split('029118562'); => ['02', '911', '8562'];
 * @case
 * 1. 010-XXXX-XXXX : 11자리 휴대폰번호
 * 2. 019-XXX-XXXX : 10자리 전화번호
 * 3. 02-XXXX-XXXX : 10자리 서울 전화번호
 * 4. 02-XXX-XXXX :  9자리 서울 전화번호
 */
export function phoneNumber(value: string) {
  const regex = /(02|\d{2,3})(\d{3,4})(\d{4})/g;
  const match = regex.exec(value);
  if (match) {
    const [, ...rest] = match;
    return rest;
  }
  return [];
}
/**
 * 전화번호 사이에 대쉬 추가
 * @example
 * dashed('029118562'); => '02-911-8562';
 *
 */
export function dashed(value: string[]) {
  return value.join('-');
}

export default {
  random,
  repeat,
  pad,
  compile,
  camelcase,
  snakecase,
  currency,
  number,
  alphabet,
  letter,
  phoneNumber,
  dashed,
};
