import flat from './flat';
import insert from './insert';
import parse from './parse';

export default function light(obj) {
  insert(parse(flat(obj)));
}
