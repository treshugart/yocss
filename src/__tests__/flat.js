import flat from '../flat';

test('flat object is same as input', () => {
  expect(
    flat({
      backgroundColor: 'black',
      color: 'white'
    })
  ).toMatchObject({ _: { 'background-color': 'black', color: 'white' } });
});

test('merges sub objects', () => {
  expect(
    flat({
      backgroundColor: 'black',
      test1: {
        color: 'white',
        test2: {
          display: 'block'
        }
      }
    })
  ).toMatchObject({
    _: { 'background-color': 'black' },
    test1: { color: 'white', test1test2: { display: 'block' } }
  });
});

test('merges sub objecst in order', () => {
  expect(
    flat({
      backgroundColor: 'black',
      test1: {
        color: 'white'
      },
      display: 'block',
      anotherTest1: {
        fontFamily: 'Helvetica',
        anotherTest2: {
          display: 'inline-block'
        }
      }
    })
  ).toMatchObject({
    _: { 'background-color': 'black', display: 'block' },
    anotherTest1: {
      anotherTest1anotherTest2: { display: 'inline-block' },
      'font-family': 'Helvetica'
    },
    test1: { color: 'white' }
  });
});
