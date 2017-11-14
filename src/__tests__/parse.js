import parse from '../parse';

test('obj', () => {
  expect(parse({ selector: { rule1: 'value 1', rule2: 'value 2' } })).toMatchObject(
    ['selector{rule1:value 1;rule2:value 2}']
  );
});
