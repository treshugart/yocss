import selector from './selector';

export default function(obj, suffix) {
  const copy = {};
  for (const key in obj) {
    const newKey = selector(key, suffix);
    const oldVal = copy[newKey];
    const newVal = obj[key];
    copy[newKey] =
      typeof oldVal === 'object' && typeof newVal === 'object'
        ? { ...oldVal, ...newVal }
        : newVal;
  }
  return copy;
}
