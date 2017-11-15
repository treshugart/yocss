# YoCSS

> A zero-dependency, 900 byte CSS-in-JS library for purists.

*The goal of this was to learn the ins and outs of CSS in JS intricacies, but happy to evolve and maintain it. Since it's in the early stages, it's experimental, but if you have any ideas, suggestions or want to contribute, please do!*

## Install

```sh
npm install yocss
```

## Usage

YoCSS is all about objects. Do whatever you want with an object and just pass it off to the YoCSS functions. The most common function is probably `css()`. This takes an object, converts it to CSS and appends it to the head if it needs to be, and returns the unique class name.

```js
import { css } from 'yocss';

const className = css({
  backgroundColor: 'black',
  color: 'white'
});
```

You can take this return value and do whatever you want with it. You may be using React:

```js
import { css } from 'yocss';
import React from 'react';

const Div = props => <div {...props} className={css({
  backgroundColor: 'black',
  color: 'white'
})} />
```

You can even create a very simplistic function to stamp out primitives for you:

```js
import { css } from 'yocss';
import React from 'react';

const styled = (Type, styles) => props => <Type {...props} className={css(styles)} />;
const Div = styled('div', {
  backgroundColor: 'black',
  color: 'white'
});
```

And you can even respond to props:

```js
import { css } from 'yocss';
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

### Class name format

YoCSS scopes styles using a class name format of `_${suffix}` where `${suffix}` is a number unique to that set of CSS rules. So, wherever you see something like `._0`, it's representing the class name or a selector for it.

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

  // ._0>.link
  '>.link': {}

  // ._0.link
  '&.link': {}
});
```

Rules that are contained in separate blocks, but eventually end up as the same selector will be merged into the same set of rules. For example:

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

### Shadow DOM

There's not much you have to do to support shadow DOM. Basically you just don't append to the head, and don't scope the styles. You still get the sugar of using objects - which is awesome :D - but without having to emulate scoping and deal with minification - which is more awesome :D.

```js
import { shadow } from 'yocss';

class Test extends HTMLElement {
  constructor() {
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>${shadow({
        ':host': {
          backgroundColor: 'black',
          color: 'white'
        }
      })}</style>
      <slot></slot>
    `;
  }
}

customElements.define('x-test', Test);
```

### Global styles

To juxtapose shadow DOM encapsulation, we've created a `light()` function that is similar to both `css()` and `shadow()`. It doesn't scope styles, but it does manage them in a global style sheet.

```js
import { light } from 'yocss';

light({
  body: {
    backgroundColor: 'black',
    color: 'white'
  }
});
```
