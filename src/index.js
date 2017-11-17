import flat from './flat';
import hash from './hash';
import insert from './insert';
import memoize from './memoize';
import namespace from './namespace';
import parse from './parse';

const classToCssMap = {};
const values = obj => Object.keys(obj).reduce((p, c) => p.concat(obj[c]), []);

const css = memoize(function (obj) {
  if (typeof obj === 'string') return obj;
  const suffix = hash(obj);
  const parsed = parse(namespace(flat(obj), suffix));
  const className = `_${suffix}`;
  classToCssMap[className] = parsed.join('');
  insert(parsed);
  return className;
});

export function merge(obj) {
  return Object.keys(obj).reduce((p, c) => {
    p[c] = css(obj[c]);
    return p;
  }, {});
}

export function names(obj) {
  return values(obj).filter(Boolean).join(' ');
}

export function styles(obj) {
  return values(obj).map(v => classToCssMap[v]).filter(Boolean).join('');
}

export default css;
