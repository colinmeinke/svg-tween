# SVG tween

Animate between SVG shapes.

**5.4kb gzipped.**

A size comparison of libraries that allow morphing of SVG
shapes (with differing number of points).

| Library | Size |
| --- | --- |
| SVG tween | 5.4kb |
| [SVG Morpheus](https://alexk111.github.io/SVG-Morpheus) | 7.2kb |
| [SnapSVG](http://snapsvg.io) | 26kb |
| [RaphaelJS](http://dmitrybaranovskiy.github.io/raphael) | 32kb |
| [GreenSock morphSVG](http://greensock.com/morphSVG) | 41.5kb |
| [Bonsai](http://bonsaijs.org) | 43kb |

If you know of any others, please
[open an issue](https://github.com/colinmeinke/svg-tween/issues/new)
or even better – submit a pull request.

## Polyfill generators

However, you're currently also going to have to bring
[babel polyfill](https://cdnjs.com/libraries/babel-polyfill)
to the party at an additional 30.8kb gzipped. This is to
support Javascript generators which a dependency of this library
makes use of.

## Examples

![Basic shapes example](https://www.dropbox.com/s/9czewgnfkp59yfn/basic-shapes.gif?raw=1)

[View basic shapes example code](./examples/basic-shapes)

![Batman example](https://www.dropbox.com/s/2n92b1uqh6rao8q/batman.gif?raw=1)

[View batman example code](./examples/batman)

![Line example](https://www.dropbox.com/s/y3rn6r62c07ln36/line.gif?raw=1)

[View line example code](./examples/line)

[](./examples/basic-shapes)

## Installation

```
npm install svg-tween
```

## Usage

SVG tween has two functions – `tween` and `tweenPaths`.

### tween

The `tween` function takes all the same options as
[**Tweening**'s `tween` function](https://github.com/colinmeinke/tweening#options).
However, the `from` and `to` options take the form of shape
objects.

```js
import tween from 'svg-tween';

// The shape we want to animate from
const from = {
  shape: 'path',
  d: 'M5,50L80,60v40,l-15,10l-15,-10z',
};

// The shape we want to animate to
const to = {
  shape: 'rect',
  width: 100,
  height: 100,
  x: 50,
  y: 50,
};

// Create a new path node
const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );

// Set the node's initial d attribute to match the from shape
path.setAttribute( 'd', from.d );

// Add the path node to the dom
document.getElementById( 'svg' ).appendChild( path );

// Let's move!
// On each frame our next callback is run
// this is where we update our path node's d attribute
tween({
  duration: 500,
  from,
  to,
  next: d => path.setAttribute( 'd', d ),
});
```

### tweenPaths

The `tweenPaths` function is much the same as `tween`, except
it takes `d` attribute strings as it's `from` and `to` options.

```js
import { tweenPaths } from 'svg-tween';

// The path we want to animate from
const from = 'M5,50L80,60v40,l-15,10l-15,-10z';

// The path we want to animate to
const to = 'M50,50h100v100h-100Z';

// Create a new path node
const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );

// Set the node's initial d attribute to match from
path.setAttribute( 'd', from );

// Add the path node to the dom
document.getElementById( 'svg' ).appendChild( path );

// Let's move!
// On each frame our next callback is run
// this is where we update our path node's d attribute
tweenPaths({
  duration: 500,
  from,
  to,
  next: d => path.setAttribute( 'd', d ),
});
```

## CommonJS

This is how you get to the good stuff if you're using
`require`.

```js
const SVGTween = require( 'svg-tween' );
const tween = SVGTween.default;
const tweenPaths = SVGTween.tweenPaths;
```

## UMD

And if you just want to smash in a Javascript file you're
also covered. Drop this in place ...

[https://npmcdn.com/svg-tween@1.3.0/dist/svg-tween.min.js](https://npmcdn.com/svg-tween@1.3.0/dist/svg-tween.min.js)

Then access it on the `SVGTween` global variable.

```js
const tween = SVGTween.default;
const tweenPaths = SVGTween.tweenPaths;
```

## Help make this better

[Issues](https://github.com/colinmeinke/svg-tween/issues/new)
and pull requests gratefully received!

I'm also on twitter [@colinmeinke](https://twitter.com/colinmeinke).

Thanks :star2:

## License

[ISC](./LICENSE.md).
