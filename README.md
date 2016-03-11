# SVG tween

Animate between SVG shapes.

Uses [SVG shapes](https://github.com/colinmeinke/svg-shapes)
and [Tweening](https://github.com/colinmeinke/tweening) under
the hood.

As Tweening uses a Javascript generator you're going to have
to bring your own generator polyfill to the party if you wish
to [support all browsers](http://kangax.github.io/compat-table/es6/#test-generators).

Both `tween` and `tweenPath` functions take the same arguments
as Tweening's [tween function](https://github.com/colinmeinke/tweening#options),
but with modified `from` and `to` options.

## Installation

```
npm install svg-tween
```

## Usage

To tween between different SVG shapes use `tween`. Take a
look at the SVG shapes
[getPoints function](https://github.com/colinmeinke/svg-shapes#usage)
to understand the format the `from` and `to` options expect
to receive.

```js
import tween from 'svg-tween';

tween({
  from: {
    shape: 'path',
    d: 'M5,50L80,60v40,l-15,10l-15,-10z',
  },
  to: {
    shape: 'rect',
    width: 100,
    height: 100,
    x: 50,
    y: 50,
  },
  next: d => console.log( `Update SVG path to ${ d }` ),
});
```

Or if you're just tweening between paths then use the
`tweenPaths` function, passing in SVG path `d` attributes as
the `from` and `to` options.

```js
import { tweenPaths } from 'svg-tween';

tweenPaths({
  from: 'M5,50L80,60v40,l-15,10l-15,-10z',
  to: 'M50,50h100v100h-100Z',
  next: d => console.log( `Update SVG path to ${ d }` ),
})
```
