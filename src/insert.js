import memoize from './memoize';

const MAX_RULES_PER_SHEET = 10000;
const styles = [];

function current() {
  return styles[styles.length - 1];
}

const insertOne = memoize(function(rule) {
  let style = current();
  if (!style || style.sheet.cssRules.length > MAX_RULES_PER_SHEET) {
    style = document.createElement('style');
    document.head.appendChild(style);
    styles.push(style);
  }
  style.sheet.insertRule(rule, style.sheet.cssRules.length);
});

export default function insert(css) {
  css.forEach(rule => insertOne(rule));
}
