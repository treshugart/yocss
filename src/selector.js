export default function selector(key, suffix = '') {
  const prefix = `._${suffix}`;

  if (key === '_') {
    return prefix;
  }

  const first = key[0];

  if (first === '&') {
    return prefix + key.substring(1);
  }

  if (first.match(/\w/)) {
    return `${prefix} .${key}`;
  }

  return prefix + key;
}
