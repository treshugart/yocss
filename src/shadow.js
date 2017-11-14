import flat from './flat';
import parse from './parse';

export default function shadow(obj) {
  return parse(flat(obj)).join('');
}
