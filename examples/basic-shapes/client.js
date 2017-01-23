import 'babel-polyfill'

import { toPath, toPoints } from 'svg-points'

import tween from './tmp'

const colors = [
  '#3df55c',
  '#47eb47',
  '#69e052',
  '#85d65c',
  '#9c6'
]

const plotPoints = shape => {
  toPoints(shape).forEach((p, i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', p.x)
    circle.setAttribute('cy', p.y)
    circle.setAttribute('r', 10)
    circle.setAttribute('fill', colors[ i ])
    document.getElementById('svg').appendChild(circle)
  })
}

const shapes = [
  { type: 'path', d: toPath(toPoints({ type: 'rect', height: 300, width: 300, x: 100, y: 100 })) },
  { type: 'polyline', points: '400,250,100,250' },
  { type: 'circle', cx: 250, cy: 250, r: 150 },
  { type: 'path', d: toPath(toPoints({ type: 'path', d: 'M250,100L400,400L100,400Z' })) }
]

const path = document.getElementById('path')

path.setAttribute('d', toPath(shapes[ 0 ]))

shapes.forEach(plotPoints)

const move = c => {
  const isLast = !shapes[ c + 1 ]
  const n = isLast ? 0 : c + 1

  tween({
    duration: 1000,
    from: shapes[ c ],
    to: shapes[ n ],
    next: d => path.setAttribute('d', d),
    complete: () => setTimeout(() => { move(isLast ? 0 : c + 1) }, 1000)
  })
}

setTimeout(() => { move(0) }, 1000)
