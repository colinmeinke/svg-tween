import 'babel-polyfill'

import { toPath } from 'svg-points'

import { tweenPaths } from './tmp'

const paths = [
  'M0,2L1,4L2,5L3,3L4,4L5,3L6,4L7,1L8,2',
  'M0,4L1,5L2,3L3,4L4,3L5,4L6,1L7,2L8,2',
  'M0,5L1,3L2,4L3,3L4,4L5,1L6,2L7,2L8,4',
  'M0,3L1,4L2,3L3,4L4,1L5,2L6,2L7,4L8,5',
  'M0,4L1,3L2,4L3,1L4,2L5,2L6,4L7,5L8,3',
  'M0,3L1,4L2,1L3,2L4,2L5,4L6,5L7,3L8,4',
  'M0,4L1,1L2,2L3,2L4,4L5,5L6,3L7,4L8,3',
  'M0,1L1,2L2,2L3,4L4,5L5,3L6,4L7,3L8,4',
  'M0,2L1,2L2,4L3,5L4,3L5,4L6,3L7,4L8,1'
]

const path = document.getElementById('path')

path.setAttribute('d', toPath({ type: 'path', d: paths[ 0 ] }))

const move = c => {
  const isLast = !paths[ c + 1 ]
  const n = isLast ? 0 : c + 1

  tweenPaths({
    duration: 700,
    easing: 'easeInOutQuart',
    from: paths[ c ],
    to: paths[ n ],
    next: d => path.setAttribute('d', d),
    complete: () => move(isLast ? 0 : c + 1)
  })
}

move(0)
