import namespace from '../namespace';

test('suffixes keys using the provided key', () => {
  expect(namespace({ key: 'val' }, '0')).toMatchObject({
    '._-0.key-0': 'val'
  });
  expect(namespace({ key: 'val' }, '1')).toMatchObject({
    '._-1.key-1': 'val'
  });
});
