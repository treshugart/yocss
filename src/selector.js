const R_WORD = /\w/;

export default function selector(key, suffix = '') {
  const prefix = `._${suffix}`;

  if (key === '_') {
    return prefix;
  }

  const first = key[0];

  if (first === '&') {
    const rest = key.substring(1);
    if (rest[0].match(R_WORD)) {
      return rest + prefix;
    }
    return prefix + rest;
  }

  if (first.match(R_WORD)) {
    return `${prefix} .${key}`;
  }

  const globalSelector = ':global(';
  if (key.indexOf(globalSelector) === 0) {
    return key.substring(globalSelector.length, key.length - 1);
  }

  return prefix + key;
}
