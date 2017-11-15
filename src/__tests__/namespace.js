import namespace from '../namespace';

test('suffixes keys using the provided key', () => {
  expect(namespace({ key: 'val' }, '0')).toMatchObject({
    '._0 .key': 'val'
  });
  expect(namespace({ key: 'val' }, '1')).toMatchObject({
    '._1 .key': 'val'
  });
});
