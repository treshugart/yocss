import namespace from '../namespace';

test('suffixes keys using the provided key', () => {
  expect(namespace({ key: 'val' }, '0')).toMatchObject({
    '.key-0': 'val'
  });
  expect(namespace({ key: 'val' }, '1')).toMatchObject({
    '.key-1': 'val'
  });
});
