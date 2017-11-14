const cache = {};
let count = 0;

function getKey(obj) {
  let str = '';
  for (const name in obj) {
    str += `${name}${obj[name]}`;
  }
  return str;
}

export default function(obj) {
  const key = getKey(obj);
  return key in cache ? cache[key] : (cache[key] = count++);
}
