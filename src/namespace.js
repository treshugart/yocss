import hash from './hash';
import selector from './selector';

export default function namespace(obj, suffix) {
  const copy = {};
  for (const key in obj) {
    copy[selector(key, suffix)] = obj[key];
  }
  return copy;
}
