import dashcase from '../dashcase';

test('camelCased', () => {
  expect(dashcase('someString')).toBe('some-string');
});

test('CamelCapped', () => {
  expect(dashcase('SomeString')).toBe('some-string');
});

test('M1x3d', () => {
  expect(dashcase('M1X3d')).toBe('m1-x3d');
});
