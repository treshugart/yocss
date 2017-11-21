import dashcase from './dashcase';

export default function flat(obj) {
  const ret = { _: {} };
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      ret[key] = obj[key];
    } else {
      ret._[dashcase(key)] = obj[key];
    }
  }
  return ret;
}
