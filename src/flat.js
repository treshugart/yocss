import dashcase from './dashcase';

export default function flat(obj, pre = '') {
  let main;
  let copy = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      copy[pre + key] = { ...copy[key], ...flat(obj[key], key) };
    } else if (pre) {
      copy[dashcase(key)] = obj[key];
    } else {
      if (!copy._) {
        main = copy._ = {};
      }
      main[dashcase(key)] = obj[key];
    }
  }
  return copy;
}
