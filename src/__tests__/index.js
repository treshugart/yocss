import css, { merge, names, stringify } from '..';

function rule(index) {
  return document.head.lastElementChild.sheet.cssRules[index].cssText;
}

test('css', () => {
  const className = css({
    rule1: 'value 1',
    selector1: {
      rule2: 'value 2'
    },
    ' .selector2': {
      rule3: 'value 3'
    },
    ' > .selector3': {
      rule4: 'value 4'
    }
  });

  // Returns correct class name.
  expect(className.toString()).toBe('_0');

  // Inserts to head.
  expect(rule(0)).toBe('._0 {rule-1: value 1;}');
  expect(rule(1)).toBe('._0 .selector1 {rule-2: value 2;}');
  expect(rule(2)).toBe('._0 .selector2 {rule-3: value 3;}');
  expect(rule(3)).toBe('._0 > .selector3 {rule-4: value 4;}');
});

test('merge', () => {
  const merged = merge({
    cx1: { rule1: 'value 1' },
    cx2: css({ rule2: 'value 2' })
  });
  expect(merged.cx1).toBe('_2');
  expect(merged.cx2).toBe('_1');
});

test('names', () => {
  expect(names(merge({
    cx1: { rule1: 'value 1' },
    cx2: { rule2: 'value 2' }
  }))).toBe('_2 _1');
});

test('styles', () => {
  expect(stringify(merge({
    cx1: { rule1: 'value 1' },
    cx2: { rule2: 'value 2' }
  }))).toBe('._2{rule-1:value 1}._1{rule-2:value 2}');
});
