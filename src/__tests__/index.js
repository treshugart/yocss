import css, { merge, names, raw, rules, value } from '..';

function rule(index) {
  const r = document.head.lastElementChild.sheet.cssRules[index];
  return r && r.cssText;
}

test('css', () => {
  // _0
  const nested1 = raw({
    rule3: 'value 3'
  });

  // _1
  const nested2 = raw({
    rule4: 'value 4'
  });

  // _2
  const className = css({
    rule1: 'value 1',
    selector1: {
      rule2: 'value 2'
    },
    [nested1]: rules(nested1),
    [` > .${nested2}`]: rules(nested2)
  });

  expect(className).toBe('_2');
  expect(rule(0)).toBe('._2 {rule1: value 1;}');
  expect(rule(1)).toBe('._2 .selector1 {rule2: value 2;}');
  expect(rule(2)).toBe('._2 ._0 {rule3: value 3;}');
  expect(rule(3)).toBe('._2 > ._1 {rule4: value 4;}');
});

test('names', () => {
  expect(names(...[{ rule1: 'value 1' }, { rule2: 'value 2' }].map(css))).toBe(
    '_3 _4'
  );
});

test('value', () => {
  expect(value(...[{ rule1: 'value 1' }, { rule2: 'value 2' }].map(css))).toBe(
    '._3{rule1:value 1}._4{rule2:value 2}'
  );
});
