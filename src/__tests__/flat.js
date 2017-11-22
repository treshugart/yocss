import flat from '../flat';

test('_', () => {
  expect(
    flat({
      someProp: 'some value'
    })
  ).toMatchObject({
    _: {
      'some-prop': 'some value'
    }
  });
});

test('selectors', () => {
  expect(
    flat({
      selector: {
        someProp: 'some value'
      }
    })
  ).toMatchObject({
    selector: {
      'some-prop': 'some value'
    }
  });
});

test('does not add _ if not used', () => {
  expect(
    flat({
      selector: {
        'some-prop': 'some value'
      }
    })._
  ).toBe(undefined);
});

test('does not add selector if empty', () => {
  expect(
    flat({
      selector: {}
    }).selector
  ).toBe(undefined);
});
