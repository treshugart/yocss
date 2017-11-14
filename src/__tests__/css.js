import css from '../css';

test('obj', () => {
  const className = css({
    rule1: 'value 1',
    rule2: 'value 2',
    rule3: {
      rule4: 'value 4'
    }
  });
  const sheet = document.head.lastElementChild.sheet;
  const rule1 = sheet.cssRules[0];
  const rule2 = sheet.cssRules[1];
  expect(className).toBe('_-0');
  expect(rule1.cssText).toBe('._-0 {rule-1: value 1; rule-2: value 2;}');
  expect(rule2.cssText).toBe('._-0.rule3-0 {rule-4: value 4;}');
});
