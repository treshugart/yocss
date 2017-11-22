import selector from '../selector';

test('_', () => {
  expect(selector('_')).toBe('._');
  expect(selector('_', 'test')).toBe('._test');
});

test('&', () => {
  expect(selector('&.test')).toBe('._.test');
  expect(selector('&.test', 'test')).toBe('._test.test');
});

test('&[tag] - special case because tag comes before the scoping class', () => {
  expect(selector('&test')).toBe('test._');
  expect(selector('&test', 'test')).toBe('test._test');
});

test(':pseudo', () => {
  expect(selector(':test')).toBe('._:test');
  expect(selector(':test', 'test')).toBe('._test:test');
});

test('* (global)', () => {
  expect(selector('**')).toBe('*');
  expect(selector('**', 'test')).toBe('*');
  expect(selector('* body')).toBe('body');
  expect(selector('* body', 'test')).toBe('body');
});

test('[identifier]', () => {
  expect(selector('identifier')).toBe('._ .identifier');
  expect(selector('identifier', 'test')).toBe('._test .identifier');
});

test('[space][identifier]', () => {
  expect(selector(' > test .test [test]')).toBe('._ > test .test [test]');
  expect(selector(' > test .test [test]', 'test')).toBe(
    '._test > test .test [test]'
  );
});
