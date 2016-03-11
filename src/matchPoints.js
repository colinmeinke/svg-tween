const isBetween = ( a, b, c ) => {
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

const addPoints = ( points, pointsRequired ) => {
  const p = [];

  const joins = points.length - 1;
  const extraPoints = pointsRequired - points.length;
  const extraPointsPerJoin = Math.ceil( extraPoints / joins );

  for ( let i = 0, pointsAdded = 0; i < points.length; i++ ) {
    p.push( points[ i ]);

    if ( i < joins ) {
      const extraPointsForThisJoin = Math.min( extraPointsPerJoin, extraPoints - pointsAdded );

      for ( let j = 0; j < extraPointsForThisJoin; j++ ) {
        const c = points[ i ];
        const n = points[ i + 1 ];

        const xSpacing = c.x === n.x ? 0 : Math.abs( n.x - c.x ) / ( extraPointsForThisJoin + 1 );
        const ySpacing = c.y === n.y ? 0 : Math.abs( n.y - c.y ) / ( extraPointsForThisJoin + 1 );

        const x = xSpacing === 0 ? c.x : ( c.x < n.x ? c.x + ( xSpacing * ( j + 1 )) : c.x - ( xSpacing * ( j + 1 )));
        const y = ySpacing === 0 ? c.y : ( c.y < n.y ? c.y + ( ySpacing * ( j + 1 )) : c.y - ( ySpacing * ( j + 1 )));

        p.push({ x, y });

        pointsAdded++;
      }
    }
  }

  return p;
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
