import flat from './flat';
import hash from './hash';
import insert from './insert';
import memoize from './memoize';
import namespace from './namespace';
import parse from './parse';

export default memoize(function(obj) {
  const suffix = hash(obj);
  const parsed = parse(namespace(flat(obj), suffix));
  const retval = () => parsed.join('');
  retval.toString = () => `_${suffix}`;
  insert(parsed);
  return retval;
});
