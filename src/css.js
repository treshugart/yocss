import flat from './flat';
import hash from './hash';
import insert from './insert';
import namespace from './namespace';
import parse from './parse';

export default function css(obj) {
  const suffix = hash(obj);
  insert(parse(namespace(flat(obj), suffix)));
  return `_-${suffix}`;
}
