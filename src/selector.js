const R_WORD = /\w/;

export default function selector(key, suffix = '') {
  const prefix = `._${suffix}`;

  // Reserved top-level.
  if (key === '_') {
    return prefix;
  }

  const first = key[0];

  // Descendants / pesudos.
  if (first === ' ' || first === ':') {
    return prefix + key;
  }

  // Children.
  if (first === '>') {
    return `${prefix}>${key.substring(1).trim()}`;
  }

  // Global.
  if (first === '*') {
    return key.substring(1).trim();
  }

  // Additive.
  if (first === '&') {
    const rest = key.substring(1);
    return rest[0].match(R_WORD) ? rest + prefix : prefix + rest;
  }

  // Unquoted keys.
  if (first.match(R_WORD)) {
    return `${prefix} .${key}`;
  }

  return prefix + key;
}
