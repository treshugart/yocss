import insert from '../insert';

test('inserts rules', () => {
  insert([
    'body{background-color:black}',
    'body{color:white}'
  ]);
  const sheet = document.head.lastElementChild.sheet;
  const rule1 = sheet.cssRules[0];
  const rule2 = sheet.cssRules[1];
  expect(rule1.cssText).toBe('body {background-color: black;}');
  expect(rule2.cssText).toBe('body {color: white;}');
});

test('does not insert more than once', () => {
  const rules = ['body{color:black}'];
  insert(rules);
  const cssRules = document.head.lastElementChild.sheet.cssRules;
  const cssCount = cssRules.length;
  insert(rules);
  expect(cssCount).toBe(cssRules.length);
});
