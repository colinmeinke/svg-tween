import 'babel-polyfill'

import { tweenPaths } from './tmp'

const body = document.documentElement

const paths = [
  document.getElementById('tile-floor'),
  document.getElementById('tile-right'),
  document.getElementById('tile-left'),
  document.getElementById('drive'),
  document.getElementById('tree-earth-left'),
  document.getElementById('tree-earth-right'),
  document.getElementById('tree-trunk-left'),
  document.getElementById('tree-trunk-right'),
  document.getElementById('tree-leaves-left'),
  document.getElementById('tree-leaves-right'),
  document.getElementById('tree-leaves-top'),
  document.getElementById('building-earth-left'),
  document.getElementById('building-earth-right'),
  document.getElementById('building-tower-left'),
  document.getElementById('building-tower-right'),
  document.getElementById('building-tower-top'),
  document.getElementById('building-roof-left'),
  document.getElementById('building-roof-right'),
  document.getElementById('building-door-frame-bottom'),
  document.getElementById('building-door-frame-right'),
  document.getElementById('building-door-block'),
  document.getElementById('building-door-trim')
]

const keyframes1 = [
  'M0,370l280,140l280,-140l-280,-140z',
  'M0,370l0,5l280,140l0,-5z',
  'M280,510l0,5l280,-140l0,-5z',
  'M312,416l78,39l60,-30l-78,-39z',
  'M420,381l16,8l0,-16z',
  'M436,373l0,16l16,-8z',
  'M432,369l-1,12.5l5,2.5l0,-13z',
  'M436,371l0,13l5,-2.5l-1,-12.5z',
  'M426,357l0,10l10,5l0,-10z',
  'M436,362l0,10l10,-5l0,-10z',
  'M426,357l10,5l10,-5l-10,-5z',
  'M156,370l124,62l0,-2l-120,-60l0,-2z',
  'M280,430l0,2l124,-62l-4,-2l0,2z',
  'M160,365l0,5l120,60l0,-5z',
  'M280,425l0,5l120,-60l0,-5z',
  'M160,365l120,60l120,-60l-120,-60z',
  'M180,60l0.1,0.05l99.9,-49.95l0,-0.1z',
  'M280,10l0,0.05l99.9,49.95l0.1,-0.05z',
  'M310,414.9l0,0.1l60,-30l-0.1,-0.05z',
  'M370,340l-0.1,0.05l0,44.9l0.1,0.05z',
  'M310,414.9l0,0.1l60,-30l0,-0.1z',
  'M339,400.4l0,0.1l2,-1l0,-0.1z'
]

const keyframes2 = [
  'M0,370l280,140l280,-140l-280,-140z',
  'M0,370l0,5l280,140l0,-5z',
  'M280,510l0,5l280,-140l0,-5z',
  'M312,416l78,39l60,-30l-78,-39z',
  'M420,381l16,8l0,-16z',
  'M436,373l0,16l16,-8z',
  'M426,347l-2,34l12,6l0,-35z',
  'M436,352l0,35l12,-6l-2,-34z',
  'M406,307l0,30l30,15l0,-30z',
  'M436,322l0,30l30,-15l0,-30z',
  'M406,307l30,15l30,-15l-30,-15z',
  'M156,370l124,62l0,-2l-120,-60l0,-2z',
  'M280,430l0,2l124,-62l-4,-2l0,2z',
  'M160,60l0,310l120,60l0,-310z',
  'M280,120l0,310l120,-60l0,-310z',
  'M160,60l120,60l120,-60l-120,-60z',
  'M180,60l0.1,0.05l99.9,-49.95l0,-0.1z',
  'M280,10l0,0.05l99.9,49.95l0.1,-0.05z',
  'M310,414.9l0,0.1l60,-30l-0.1,-0.05z',
  'M370,340l-0.1,0.05l0,44.9l0.1,0.05z',
  'M310,414.9l0,0.1l60,-30l0,-0.1z',
  'M339,400.4l0,0.1l2,-1l0,-0.1z'
]

const keyframes3 = [
  'M0,370l280,140l280,-140l-280,-140z',
  'M0,370l0,5l280,140l0,-5z',
  'M280,510l0,5l280,-140l0,-5z',
  'M312,416l78,39l60,-30l-78,-39z',
  'M420,381l16,8l0,-16z',
  'M436,373l0,16l16,-8z',
  'M426,347l-2,34l12,6l0,-35z',
  'M436,352l0,35l12,-6l-2,-34z',
  'M406,307l0,30l30,15l0,-30z',
  'M436,322l0,30l30,-15l0,-30z',
  'M406,307l30,15l30,-15l-30,-15z',
  'M156,370l124,62l0,-2l-120,-60l0,-2z',
  'M280,430l0,2l124,-62l-4,-2l0,2z',
  'M160,60l0,310l120,60l0,-310z',
  'M280,120l0,310l120,-60l0,-310z',
  'M160,60l120,60l120,-60l-120,-60z',
  'M180,60l0.1,0.05l99.9,-49.95l0,-0.1z',
  'M280,10l0,0.05l99.9,49.95l0.1,-0.05z',
  'M310,414.9l0,0.1l60,-30l-0.1,-0.05z',
  'M370,340l-0.1,0.05l0,44.9l0.1,0.05z',
  'M310,370l0,45l60,-30l0,-45z',
  'M339,355.5l0,45l2,-1l0,-45z'
]

const keyframes4 = [
  'M0,370l280,140l280,-140l-280,-140z',
  'M0,370l0,5l280,140l0,-5z',
  'M280,510l0,5l280,-140l0,-5z',
  'M312,416l78,39l60,-30l-78,-39z',
  'M420,381l16,8l0,-16z',
  'M436,373l0,16l16,-8z',
  'M426,347l-2,34l12,6l0,-35z',
  'M436,352l0,35l12,-6l-2,-34z',
  'M406,307l0,30l30,15l0,-30z',
  'M436,322l0,30l30,-15l0,-30z',
  'M406,307l30,15l30,-15l-30,-15z',
  'M156,370l124,62l0,-2l-120,-60l0,-2z',
  'M280,430l0,2l124,-62l-4,-2l0,2z',
  'M160,60l0,310l120,60l0,-310z',
  'M280,120l0,310l120,-60l0,-310z',
  'M160,60l120,60l120,-60l-120,-60z',
  'M180,60l10,5l90,-45l0,-10z',
  'M280,10l0,10l90,45l10,-5z',
  'M310,411l0,4l60,-30l-4,-2z',
  'M370,340l-4,2l0,41l4,2z',
  'M310,370l0,41l56,-28l0,-41z',
  'M335,357.5l0,41l2,-1l0,-41z'
]

paths.forEach((p, i) => p.setAttribute('d', keyframes1[ i ]))

const animate = ({ className, duration, easing, from, to }) => {
  tweenPaths({
    duration,
    easing,
    from,
    to,
    next: (d, i) => paths[ i ].setAttribute('d', d),
    complete: () => {
      body.classList.add(className)
      nextAnimation()
    }
  })
}

const animations = [
  { className: 'one', duration: 1000, easing: 'easeInExpo', from: keyframes1, to: keyframes2 },
  { className: 'two', duration: 200, easing: 'easeOutBack', from: keyframes2, to: keyframes3 },
  { className: 'three', duration: 400, easing: 'easeOutBounce', from: keyframes3, to: keyframes4 }
]

const nextAnimation = () => {
  if (animations.length) {
    animate(animations.shift())
  }
}

setTimeout(nextAnimation, 1000)
