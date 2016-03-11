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

const matchPoints = ( a, b ) => {
  const c = removePoints( a );
  const d = removePoints( b );

  if ( c > d ) {
    return [ c, addPoints( d, c.length )];
  } else if ( d > c ) {
    return [ addPoints( c, d.length ), d ];
  }

  return [ c, d ];
};

export { addPoints, removePoints };
export default matchPoints;
