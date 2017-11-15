function defaultHash(args) {
  return JSON.stringify(args);
}

export default function memoize(fn, hash = defaultHash) {
  const cache = {};
  return function(...args) {
    const key = hash(args);
    return key in cache ? cache[key] : (cache[key] = fn(...args));
  };
}
