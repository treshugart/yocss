import shadow from '../shadow';

test('obj', () => {
  expect(
    shadow({
      ':host': {
        display: 'block'
      },
      '::slotted(*)': {
        fontWeight: 'bold'
      }
    })
  ).toBe(':host{display:block}::slotted(*){font-weight:bold}');
});
