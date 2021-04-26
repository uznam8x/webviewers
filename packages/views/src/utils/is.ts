export const array = (value: any) => Array.isArray(value);
export const object = (value: any) =>
  typeof value === 'object' && value instanceof Object && !array(value);
export const empty = (instance: any) => {
  if (array(instance)) return !instance.length;
  if (object(instance)) return !Object.getOwnPropertyNames(instance).length;
};

export default { array, object, empty };
