import light from '../light';

test('obj', () => {
  light({
    body: {
      fontFamily: 'Helvetica'
    },
    h1: {
      fontSize: '1em'
    }
  });
  const sheet = document.head.lastElementChild.sheet;
  const rule1 = sheet.cssRules[0];
  const rule2 = sheet.cssRules[1];
  expect(rule1.cssText).toBe('body {font-family: Helvetica;}');
  expect(rule2.cssText).toBe('h1 {font-size: 1em;}');
});
