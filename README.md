# YoCSS

> A zero-dependency, <1k CSS-in-JS library for purists.

*The goal of this was to learn the ins and outs of CSS in JS intricacies, but happy to evolve and maintain it. Since it's in the early stages, it's experimental, but if you have any ideas, suggestions or want to contribute, please do!*

## Install

```sh
npm install yocss
```

## Usage

YoCSS is all about objects. Do whatever you want with an object and just pass it off to `css()`. It will then take your object, convert it to a CSS rule and insert it into a global stylesheet.

The `css()` function returns a function that, when converted to a string, will return the class name.

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

Since `css()` returns a function, using it with Shadow DOM is super simple because you can call the returned function to get the CSS string and insert that directly into your `<style>` element.

```js
import css from 'yocss';

class Test extends HTMLElement {
  connectedCallback() {
    const styles = css({
      backgroundColor: 'black',
      color: 'white'
    });
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>${styles()}</style>
      <div class="${styles}">Woot!</div>
    `;
  }
}

customElements.define('x-test', Test);
```

Something unique to this methodology, is that if you were to server-side render your custom element, scoped styles would still apply to it even without a shadow root. This is because `css()` has inserted pre-scoped styles to a global stylesheet, and your `<div>` would have the appropriate class name already on it.

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

Globals styles can be specified using the `:global(selector)` syntax where `selector` is the selector you want to use globally.

```js
css({
  ':global(body)': {
    fontFamily: 'Helvetica'
  }
})
```
