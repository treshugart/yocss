import hash from './hash';

export default function namespace(obj, suffix) {
  const copy = {};
  for (const key in obj) {
    if (key[0] === ':') continue;
    const prefix = key === '_' ? '' : `._-${suffix}`;
    copy[`${prefix}.${key}-${suffix}`] = obj[key];
  }
  return copy;
}
