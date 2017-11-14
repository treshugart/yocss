# YoCSS

> An 800 byte CSS-in-JS library for purists.

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
