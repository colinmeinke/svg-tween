import expect from 'expect';

import matchPoints, {
  addPoints,
  removePoints,
  isDuplicate,
  isMidpoint,
} from '../src/matchPoints';

describe( 'addPoints', () => {
  it( 'should add correct number of extra points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( addPoints( points, 5 ).length ).toBe( 5 );
  });

  it( 'should add correct extra points at midpoints', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 25, y: 12.5 },
      { x: 50, y: 25 },
      { x: 20, y: -37.5 },
      { x: -10, y: -100 },
    ];

    expect( addPoints( points, 5 )).toEqual( expectedPoints );
  });

  it( 'should add correct extra midpoints at midpoints when less than one per join', () => {
    const points = [
      { x: 50, y: 50 },
      { x: 150, y: 50 },
      { x: 150, y: 150 },
      { x: 50, y: 150 },
      { x: 50, y: 50 },
    ];

    const expectedPoints = [
      { x: 50, y: 50 },
      { x: 100, y: 50 },
      { x: 150, y: 50 },
      { x: 150, y: 150 },
      { x: 50, y: 150 },
      { x: 50, y: 50 },
    ];

    expect( addPoints( points, 6 )).toEqual( expectedPoints );
  });

  it( 'should add correct number of extra points when more than one per join', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( addPoints( points, 8 ).length ).toBe( 8 );
  });

  it( 'should spread multiple midpoints', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 20 },
      { x: -10, y: -10 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 12.5, y: 5 },
      { x: 25, y: 10 },
      { x: 37.5, y: 15 },
      { x: 50, y: 20 },
      { x: 30, y: 10 },
      { x: 10, y: 0 },
      { x: -10, y: -10 },
    ];

    expect( addPoints( points, 8 )).toEqual( expectedPoints );
  });
});

describe( 'removePoints', () => {
  it( 'should remove midpoint', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 25, y: 0 },
      { x: 50, y: 0 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
    ];

    expect( removePoints( points )).toEqual( expectedPoints );
  });

  it( 'should remove multiple midpoints', () => {
    const points = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ];

    const expectedPoints = [
      { x: 1, y: 1 },
      { x: 4, y: 4 },
    ];

    expect( removePoints( points )).toEqual( expectedPoints );
  });

  it( 'should remove duplicate point', () => {
    const points = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 50, y: 50 },
    ];

    const expectedPoints = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 50, y: 50 },
    ];

    expect( removePoints( points )).toEqual( expectedPoints );
  });

  it( 'should remove multiple duplicate points', () => {
    const points = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 50, y: 50 },
    ];

    const expectedPoints = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 50, y: 50 },
    ];

    expect( removePoints( points )).toEqual( expectedPoints );
  });
});


describe( 'matchPoints', () => {
  it( 'should return two sets of points of the same length', () => {
    const a = [
      { x: 10, y: 20 },
      { x: 60, y: 20 },
      { x: 60, y: 100 },
      { x: 10, y: 100 },
      { x: 10, y: 20 },
    ];

    const b = [
      { x: 5, y: 10 },
      { x: 15, y: 15 },
      { x: 35, y: 20 },
      { x: 65, y: 25 },
      { x: 105, y: 30 },
      { x: 155, y: 35 },
      { x: 215, y: 40 },
      { x: 285, y: 45 },
    ];

    const [ c, d ] = matchPoints( a, b );

    expect( c.length ).toBe( d.length );
  });
})
