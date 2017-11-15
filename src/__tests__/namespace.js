import namespace from '../namespace';

test('suffixes keys using the provided key', () => {
  expect(namespace({ key: 'val' }, '0')).toMatchObject({
    '._0 .key': 'val'
  });
  expect(namespace({ key: 'val' }, '1')).toMatchObject({
    '._1 .key': 'val'
  });
});

test('nesting', () => {
  expect(
    Object.keys(
      namespace(
        {
          link: {},
          ' .link': {},
          ' link': {},
          '>.link': {},
          '&.link': {}
        },
        0
      )
    )
  ).toMatchObject(['._0 .link', '._0 link', '._0>.link', '._0.link']);
});

test('should merge namespaces that have identical keys', () => {
  expect(
    namespace(
      {
        link: { key1: 'val1' },
        ' .link': { key2: 'val2' }
      },
      0
    )
  ).toMatchObject({
    '._0 .link': {
      key1: 'val1',
      key2: 'val2'
    }
  });
});
