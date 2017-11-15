import css from '../css';

test('obj', () => {
  const className = css({
    rule1: 'value 1',
    selector1: {
      rule2: 'value 2'
    },
    ' .selector2': {
      rule3: 'value 3'
    },
    '> .selector3': {
      rule4: 'value 4'
    }
  });
  const sheet = document.head.lastElementChild.sheet;
  const rule1 = sheet.cssRules[0];
  const rule2 = sheet.cssRules[1];
  const rule3 = sheet.cssRules[2];
  const rule4 = sheet.cssRules[3];
  expect(className).toBe('_0');
  expect(rule1.cssText).toBe('._0 {rule-1: value 1;}');
  expect(rule2.cssText).toBe('._0 .selector1 {rule-2: value 2;}');
  expect(rule3.cssText).toBe('._0 .selector2 {rule-3: value 3;}');
  expect(rule4.cssText).toBe('._0> .selector3 {rule-4: value 4;}');
});
