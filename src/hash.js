import memoize from './memoize';

let count = 0;

export default memoize(function(obj) {
  return count++;
});
