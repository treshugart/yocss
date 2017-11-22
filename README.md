# YoCSS

> A zero-dependency, 1k CSS-in-JS library for purists.

*The goal of this was to learn the ins and outs of CSS in JS intricacies, but happy to evolve and maintain it. Since it's in the early stages, it's experimental, but if you have any ideas, suggestions or want to contribute, please do!*

*This reflects latest master. For docs on specific versions, refer to their corresponding tags.*

## Install

```sh
npm install yocss
```

## Usage

YoCSS is all about objects. Do whatever you want with an object and just pass it off to `css()`. It will then take your object, convert it to a CSS rule and insert it into a global stylesheet, returning the resulting `className` for the set of rules as a string.

```js
import css from 'yocss';

const className = css({
  backgroundColor: 'black',
  color: 'white'
});
```

### React et al

You can take this return value and do whatever you want with it. You may be using React:

```js
import css from 'yocss';
import React from 'react';

const Div = props => <div {...props} className={css({
  backgroundColor: 'black',
  color: 'white'
})} />
```

You can even create a very simplistic function to stamp out primitives for you:

```js
import css from 'yocss';
import React from 'react';

const styled = (Type, styles) => props => <Type {...props} className={css(styles)} />;
const Div = styled('div', {
  backgroundColor: 'black',
  color: 'white'
});
```

And you can even respond to props:

```js
import css from 'yocss';
import React from 'react';

const styled = (Type, styles) =>
  props =>
    <Type
      {...props}
      className={css(typeof styles === 'function' ? styles(props) : styles)}
    />;

const Div = styled('div', props => ({
  backgroundColor: props.dark ? 'black' : 'white',
  color: props.dark ? 'white' : 'black'
}));
```

### Shadow DOM

The `css()` function returns a string and inserts styles to the head. Calling `raw()` does the same thing except it doesn't insert styles to the head. You can use this with the `value()` function to return the CSS value of the specified classes and put content inside of the `<style>` tag in the shadow root.

```js
import { raw, names, value } from 'yocss';

const styles = [{
  backgroundColor: 'black'
}, {
  color: 'white'
}].map(raw);

class Test extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>${value(...styles)}</style>
      <div class="${names(...styles)}">Woot!</div>
    `;
  }
}

customElements.define('x-test', Test);
```

### Class name format

YoCSS scopes styles using a class name format of `_${suffix}` where `${suffix}` is a number unique to that set of CSS rules. So, wherever you see something like `._0`, it's representing the scoping class or a selector for it.

### Nesting

Nesting works similarly to other libraries.

```js
css({
  // ._0 .link
  link: {},

  // ._0 .link
  ' .link': {},

  // ._0 link
  ' link': {},

  // ._0 >.link
  ' >.link': {}

  // ._0.link
  '&.link': {}

  // tag._0
  '&tag': {}
});
```

However, if you do that, the selectors you use are only scoped to the class name generated by `css()`. You can combine `css()` and `raw()` to scope descendant:

```js
const nested1 = raw({
  backgroundColor: 'black'
});
const nested2 = raw({
  color: 'white'
});

const className = css({
  [nested1]: rules(nested1),
  [`> ${nested2}`]: rules(nested2)
});
```

Rules that are contained in separate blocks, but eventually end up as the same selector, will be merged into the same set of rules. For example:

```js
css({
  link: { key1: 'val1' },
  ' .link': { key2: 'val2' }
});
```

Would merge into:

```js
{
  '._0 .link': {
    key1: 'val1',
    key2: 'val2'
  }
}
```

### Global styles

Globals styles can be specified by prefixing your selector with `* selector` syntax where `selector` is the selector you want to use globally.

```js
css({
  '* body': {
    fontFamily: 'Helvetica'
  }
})
```
