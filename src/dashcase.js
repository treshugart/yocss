import memoize from './memoize';

export default memoize(function(str) {
  return str.replace(/([A-Z0-9]{1})/g, (match, parens, offset) => {
    return `${offset ? '-' : ''}${parens.toLowerCase()}`;
  });
});
