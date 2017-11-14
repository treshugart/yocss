const inserted = {};
const styles = [];

function current() {
  return styles[styles.length - 1];
}

function insertOne(rule) {
  if (rule in inserted) {
    return;
  }
  let style = current();
  if (!style || style.sheet.cssRules.length > 10000) {
    style = document.createElement('style');
    document.head.appendChild(style);
    styles.push(style);
  }
  inserted[rule] = style.sheet.insertRule(rule, style.sheet.cssRules.length);
}

export default function insert(css) {
  css.forEach(rule => insertOne(rule));
}
