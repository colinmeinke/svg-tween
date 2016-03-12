import arcToBezier from 'svg-arc-to-cubic-bezier';

const isBetween = ( a, b, c ) => {
  if ( b.curve || c.curve ) {
    return false;
  }

  const crossProduct =
    ( c.y - a.y ) *
    ( b.x - a.x ) -
    ( c.x - a.x ) *
    ( b.y - a.y );

  if ( Math.abs( crossProduct ) > Number.EPSILON ) {
    return false;
  }

  const dotProduct =
    ( c.x - a.x ) *
    ( b.x - a.x ) +
    ( c.y - a.y ) *
    ( b.y - a.y );

  if ( dotProduct < 0 ) {
    return false;
  }

  const squaredLengthBA =
    ( b.x - a.x ) *
    ( b.x - a.x ) +
    ( b.y - a.y ) *
    ( b.y - a.y );

  if ( dotProduct > squaredLengthBA ) {
    return false;
  }

  return true;
};

const straightMidPoint = ( a, b ) => {
  const x = a.x === b.x ? 0 : Math.abs( b.x - a.x );
  const y = a.y === b.y ? 0 : Math.abs( b.y - a.y );

  return {
    x: x === 0 ? a.x : ( a.x < b.x ? a.x + x / 2 : a.x - x / 2 ),
    y: y === 0 ? a.y : ( a.y < b.y ? a.y + y / 2 : a.y - y / 2 ),
  };
};

const midPoint = ( a, b ) => {
  if ( !b.curve ) {
    return straightMidPoint( a, b );
  }

  return false;
};

const addPoints = ( points, pointsRequired ) => {
  const p = [ ...points ];

  for ( let i = 1; i < p.length; ) {
    const m = midPoint( p[ i - 1 ], p[ i ]);

    if ( m ) {
      p.splice( i, 0, m );

      if ( p.length === pointsRequired ) {
        return p;
      }

      i += 2;
    } else {
      i++;
    }
  }

  if ( p.length === points.length ) {
    const additionalPoints = pointsRequired - p.length;
    const newPoint = { x: p[ 0 ].x, y: p[ 0 ].y };

    for ( let i = 0; i < additionalPoints; i++ ) {
      p.unshift( newPoint );
    }

    return p;
  }

  return addPoints( p, pointsRequired );
}

const removePoints = points => {
  const result = [];

  for ( let i = 0, l = points.length; i < l; i++ ) {
    const a = result[ result.length - 1 ];
    const b = points[ i + 1 ];
    const c = points[ i ];

    if ( !( a && b && c ) || !( isBetween( a, b, c ))) {
      result.push( c );
    }
  }

  return result;
};

const matchCurves = ( a, b ) => {
  const c = [];
  const d = [];

  for ( let i = 0, l = a.length; i < l; i++ ) {
    if ( a[ i ].curve && !b[ i ].curve ) {
      c.push( a[ i ]);
      d.push({ ...b[ i ], curve: {
        type: 'cubic',
        x1: b[ i - 1 ].x,
        y1: b[ i - 1 ].y,
        x2: b[ i ].x,
        y2: b[ i ].y,
      }});
    } else if ( b[ i ].curve && !a[ i ].curve ) {
      d.push( b[ i ]);
      c.push({ ...a[ i ], curve: {
        type: 'cubic',
        x1: a[ i - 1 ].x,
        y1: a[ i - 1 ].y,
        x2: a[ i ].x,
        y2: a[ i ].y,
      }});
    } else {
      c.push( a[ i ]);
      d.push( b[ i ]);
    }
  }

  return [ c, d ];
};

const convertCurvesToCubic = points => {
  const p = [];

  for ( let i = 0, l = points.length; i < l; i++ ) {
    const point = points[ i ];

    if ( point.curve && point.curve.type !== 'cubic' ) {
      const { x: px, y: py } = points[ i - 1 ];
      const { x: cx, y: cy } = point;

      if ( point.curve.type === 'arc' ) {
        const curves = arcToBezier({
          px,
          py,
          cx,
          cy,
          rx: point.curve.rx,
          ry: point.curve.ry,
          xAxisRotation: point.curve.xAxisRotation,
          largeArcFlag: point.curve.largeArcFlag,
          sweepFlag: point.curve.sweepFlag,
        });

        curves.forEach(({ x1, y1, x2, y2, x, y }) => {
          p.push({ x, y, curve: { type: 'cubic', x1, y1, x2, y2 }});
        });
      } else if ( point.curve.type === 'quadratic' ) {
        const x1 = px + ( 2/3 * ( point.curve.x1 - px ));
        const y1 = py + ( 2/3 * ( point.curve.y1 - py ));
        const x2 = cx + ( 2/3 * ( point.curve.x1 - cx ));
        const y2 = cy + ( 2/3 * ( point.curve.y1 - cy ));

        p.push({ x: cx, y: cy, curve: { type: 'cubic', x1, y1, x2, y2 }});
      }
    } else {
      p.push( point );
    }
  }

  return p;
};

const matchPoints = ( a, b ) => {
  let c = convertCurvesToCubic( removePoints( a ));
  let d = convertCurvesToCubic( removePoints( b ));

  if ( d.length > c.length ) {
    c = addPoints( c, d.length );
  } else if ( c.length > d.length ) {
    d = addPoints( d, c.length );
  }

  return matchCurves( c, d );
};

export { addPoints, removePoints };
export default matchPoints;
