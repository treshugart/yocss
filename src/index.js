import flat from './flat';
import hash from './hash';
import insert from './insert';
import memoize from './memoize';
import namespace from './namespace';
import parse from './parse';

const classToCssMap = {};

export default memoize(function(obj) {
  const suffix = hash(obj);
  const parsed = parse(namespace(flat(obj), suffix));
  const className = `_${suffix}`;
  classToCssMap[className] = parsed.join('');
  insert(parsed);
  return className;
});

export function cssFor(className) {
  return classToCssMap[className];
}
