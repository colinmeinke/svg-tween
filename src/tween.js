import t from 'tweening';
import { getPoints, toPath } from 'svg-shapes';

import matchPoints from './matchPoints';

const tweenPaths = ({ complete, duration, easing, from, next, to }) => {
  const a = { shape: 'path', d: from };
  const b = { shape: 'path', d: to };
  tween({ complete, duration, easing, from: a, next, to: b });
}

const tween = ({ complete, duration, easing, from, next, to }) => {
  const c = complete;
  const n = next;

  const { shape: aShape, ...aAttributes } = from;
  const { shape: bShape, ...bAttributes } = to;

  const a = getPoints( aShape, aAttributes );
  const b = getPoints( bShape, bAttributes );

  const [ x, y ] = matchPoints( a, b );

  t({
    complete: () => {
      if ( typeof n === 'function' ) {
        n( toPath( b ));
      }

      if ( typeof c === 'function' ) {
        c();
      }
    },
    duration,
    easing,
    from: x,
    next: value => {
      if ( typeof n === 'function' ) {
        n( toPath( value ));
      }
    },
    to: y,
  });
};

export { tweenPaths };
export default tween;
