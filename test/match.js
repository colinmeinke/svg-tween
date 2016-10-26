/* eslint-env mocha */

import expect from 'expect'

import { matchPoints } from '../src/match'

describe('matchPoints', () => {
  it('should return two sets of points of the same length', () => {
    const a = [
      { x: 10, y: 20 },
      { x: 60, y: 20 },
      { x: 60, y: 100 },
      { x: 10, y: 100 },
      { x: 10, y: 20 }
    ]

    const b = [
      { x: 5, y: 10 },
      { x: 15, y: 15 },
      { x: 35, y: 20 },
      { x: 65, y: 25 },
      { x: 105, y: 30 },
      { x: 155, y: 35 },
      { x: 215, y: 40 },
      { x: 285, y: 45 }
    ]

    const [ c, d ] = matchPoints(a, b)

    expect(c.length).toBe(d.length)
  })
})
