import { add, cubify, remove } from 'points'

const matchCurves = (a, b) => {
  const c = []
  const d = []

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[ i ].curve && !b[ i ].curve) {
      c.push(a[ i ])
      d.push({
        ...b[ i ],
        curve: {
          type: 'cubic',
          x1: b[ i - 1 ].x,
          y1: b[ i - 1 ].y,
          x2: b[ i ].x,
          y2: b[ i ].y
        }
      })
    } else if (b[ i ].curve && !a[ i ].curve) {
      d.push(b[ i ])
      c.push({
        ...a[ i ],
        curve: {
          type: 'cubic',
          x1: a[ i - 1 ].x,
          y1: a[ i - 1 ].y,
          x2: a[ i ].x,
          y2: a[ i ].y
        }
      })
    } else {
      c.push(a[ i ])
      d.push(b[ i ])
    }
  }

  return [ c, d ]
}

const matchPoints = (a, b) => {
  let c = cubify(remove(a))
  let d = cubify(remove(b))

  if (d.length > c.length) {
    c = add(c, d.length)
  } else if (c.length > d.length) {
    d = add(d, c.length)
  }

  return matchCurves(c, d)
}

const matchPointArrays = (a, b) => {
  const x = []
  const y = []

  for (let i = 0, l = a.length; i < l; i++) {
    const [ c, d ] = matchPoints(a[ i ], b[ i ])
    x.push(c)
    y.push(d)
  }

  return [ x, y ]
}

export { matchPoints, matchPointArrays }
