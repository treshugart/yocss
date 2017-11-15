const cache = {};
let count = 0;

export default function(obj) {
  const key = JSON.stringify(obj);
  return key in cache ? cache[key] : (cache[key] = count++);
}
