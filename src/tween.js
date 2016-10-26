import twn from 'tweening'
import { toPath, toPoints } from 'svg-points'

import { matchPointArrays } from './match'

const tweenPaths = ({ complete, duration, easing, from, next, to }) => {
  const f = Array.isArray(from)
    ? from.map(d => ({ type: 'path', d }))
    : { type: 'path', d: from }

  const t = Array.isArray(to)
    ? to.map(d => ({ type: 'path', d }))
    : { type: 'path', d: to }

  tween({ complete, duration, easing, from: f, next, to: t })
}

const tween = ({ complete, duration, easing, from, middleware = [], next, to }) => {
  const fs = Array.isArray(from) ? from : [ from ]
  const ts = Array.isArray(to) ? to : [ to ]

  const fp = fs.map(toPoints)
  const tp = ts.map(toPoints)

  const [ f, t ] = matchPointArrays(fp, tp)

  twn({
    complete: () => {
      if (typeof next === 'function') {
        tp.forEach((p, i) => next(toPath(p), i))
      }

      if (typeof complete === 'function') {
        complete()
      }
    },
    duration,
    easing,
    from: f,
    middleware,
    next: points => {
      if (typeof next === 'function') {
        points.forEach((p, i) => next(toPath(p), i))
      }
    },
    to: t
  })
}

export { tweenPaths }
export default tween
