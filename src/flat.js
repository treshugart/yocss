import dashcase from './dashcase';
import { classToObjMap } from './maps';

export default function flat(obj) {
  const ret = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      for (let sub in obj[key]) {
        if (!ret[key]) ret[key] = {};
        ret[key][dashcase(sub)] = obj[key][sub];
      }
    } else {
      if (!ret._) ret._ = {};
      ret._[dashcase(key)] = obj[key];
    }
  }
  return ret;
}
