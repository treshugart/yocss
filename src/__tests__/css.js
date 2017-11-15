import css from '../css';

function rule(index) {
  return document.head.lastElementChild.sheet.cssRules[index].cssText;
}

test('obj', () => {
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
  expect(className).toBe('_0');
  expect(rule(0)).toBe('._0 {rule-1: value 1;}');
  expect(rule(1)).toBe('._0 .selector1 {rule-2: value 2;}');
  expect(rule(2)).toBe('._0 .selector2 {rule-3: value 3;}');
  expect(rule(3)).toBe('._0 > .selector3 {rule-4: value 4;}');
});
