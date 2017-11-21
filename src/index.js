import flat from './flat';
import hash from './hash';
import insert from './insert';
import memoize from './memoize';
import namespace from './namespace';
import parse from './parse';

const classToCssMap = {};
const classToObjMap = {};

const process = memoize(function(obj) {
  const suffix = hash(obj);
  const className = `_${suffix}`;
  const flattened = flat(obj, classToObjMap);
  const parsed = parse(namespace(flattened, suffix));
  classToCssMap[className] = parsed.join('');
  classToObjMap[className] = flattened._;
  return { className, parsed };
});

export default function css(obj) {
  const { className, parsed } = process(obj);
  insert(parsed);
  return className;
}

export function raw(obj) {
  return process(obj).className;
}

export function names(...css) {
  return css.filter(Boolean).join(' ');
}

export function rules(...css) {
  return css.reduce((p, c) => ({ ...p, ...classToObjMap[c] }), {});
}

export function value(...css) {
  return css.map(c => classToCssMap[c]).join('');
}
