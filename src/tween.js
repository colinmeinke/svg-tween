import twn from 'tweening';
import { getPoints, toPath } from 'svg-shapes';

import matchPoints from './matchPoints';

const shapeToPoints = shp => {
  const { shape, ...attributes } = shp;
  return getPoints( shape, attributes );
};

const matchPointArrays = ( a, b ) => {
  const x = [];
  const y = [];

  for ( let i = 0, l = a.length; i < l; i++ ) {
    const [ c, d ] = matchPoints( a[ i ], b[ i ]);
    x.push( c );
    y.push( d );
  }

  return [ x, y ];
};

const tweenPaths = ({ complete, duration, easing, from, next, to }) => {
  const f = Array.isArray( from ) ?
    from.map( d => ({ shape: 'path', d })) :
    { shape: 'path', d: from };

  const t = Array.isArray( to ) ?
    to.map( d => ({ shape: 'path', d })) :
    { shape: 'path', d: to };

  tween({ complete, duration, easing, from: f, next, to: t });
}

const tween = ({ complete, duration, easing, from, next, to }) => {
  const fromShapes = Array.isArray( from ) ? from : [ from ];
  const toShapes = Array.isArray( to ) ? to : [ to ];

  const fromPoints = fromShapes.map( shapeToPoints );
  const toPoints = toShapes.map( shapeToPoints );

  const [ f, t ] = matchPointArrays( fromPoints, toPoints );

  twn({
    complete: () => {
      if ( typeof next === 'function' ) {
        toPoints.forEach(( p, i ) => next( toPath( p ), i ));
      }

      if ( typeof complete === 'function' ) {
        complete();
      }
    },
    duration,
    easing,
    from: f,
    next: points => {
      if ( typeof next === 'function' ) {
        points.forEach(( p, i ) => next( toPath( p ), i ));
      }
    },
    to: t,
  });
};

export { tweenPaths };
export default tween;
