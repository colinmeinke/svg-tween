import 'babel-polyfill';

import tween from '../../src';
import { getPoints, toPath } from 'svg-shapes';

const shapes = [
  { shape: 'rect', height: 300, width: 300, x: 100, y: 100 },
  { shape: 'polyline', points: '100,250,400,250' },
  { shape: 'circle', cx: 250, cy: 250, r: 150 },
  { shape: 'path', d: 'M250,100L400,400L100,400Z' },
];

const path = document.getElementById( 'path' );

path.setAttribute( 'd', toPath( getPoints( shapes[ 0 ].shape, shapes[ 0 ])));

const move = c => {
  const isLast = !Boolean( shapes[ c + 1 ]);
  const n = isLast ? 0 : c + 1;

  tween({
    duration: 2000,
    from: shapes[ c ],
    to: shapes[ n ],
    next: d => path.setAttribute( 'd', d ),
    complete: () => setTimeout(() => { move( isLast ? 0 : c + 1 ) }, 1000 ),
  });
};

setTimeout(() => { move( 0 ) }, 1000 );
