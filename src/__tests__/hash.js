import hash from '../hash';

test('returns number', () => {
  expect(typeof hash({})).toBe('number');
});

test('returns the same number for the same object', () => {
  const obj = {};
  expect(hash(obj)).toBe(0);
  expect(hash(obj)).toBe(0);
});

test('returns the same number for different "like" objects', () => {
  expect(hash({})).toBe(0);
  expect(hash({})).toBe(0);
  expect(hash({ test: true })).toBe(1);
  expect(hash({ test: true })).toBe(1);
});

test('returns different numbers for "unlike" objects', () => {
  expect(hash({ one: 1 })).toBe(2);
  expect(hash({ one: 2 })).toBe(3);
});
