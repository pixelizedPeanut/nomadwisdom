import d3 from 'd3'
let clock = document.getElementById('clock') ? document.getElementById('clock').offsetWidth : '100'
let width = parseInt(clock)
let height = width
let radius = Math.min(width, height) / 1.9
let spacing = 0.09

let formatSecond = d3.time.format('%S s')
let formatMinute = d3.time.format('%M m')
let formatHour = d3.time.format('%I h')

let color = d3.scale.linear()
               .range(['hsl(-180,50%,50%)', 'hsl(180,50%,50%)'])
               .interpolate(interpolateHsl)

let arc = d3.svg.arc()
             .startAngle(0)
             .endAngle(function (d) { return d.value * 2 * Math.PI })
             .innerRadius(function (d) { return d.index * radius })
             .outerRadius(function (d) { return (d.index + spacing) * radius })

let svg = d3.select('span').append('svg')
             .attr('width', width)
             .attr('height', height)
             .append('g')
             .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

let field = svg.selectAll('g')
               .data(fields)
               .enter().append('g')

function tick () {
  let newWidth = parseInt(document.getElementById('clock').offsetWidth)
  if (newWidth !== width) {
    width = newWidth
    height = width
    radius = Math.min(width, height) / 1.9

    d3.select('svg').attr('width', width).attr('height', height)
    d3.select('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
  }

  field = field.each(function (d) { this._value = d.value })
               .data(fields)
               .each(function (d) { d.previousValue = this._value })

  field.select('path')
       .transition()
       .ease('elastic')
       .attrTween('d', arcTween)
       .style('fill', function (d) { return color(d.value) })

  field.select('text')
       .attr('dy', function (d) { return d.value < 0.5 ? '-0.5em' : '1em' })
       .text(function (d) { return d.text })
       .transition()
       .ease('elastic')
       .attr('transform', function (d) {
         return 'rotate(' + 360 * d.value + ')' +
                'translate(0,' + -(d.index + spacing / 2) * radius + ')' +
                'rotate(' + (d.value < 0.5 ? -90 : 90) + ')'
       })

  setTimeout(tick, 1000 - Date.now() % 1000)
}

function arcTween (d) {
  let i = d3.interpolateNumber(d.previousValue, d.value)
  return function (t) { d.value = i(t); return arc(d) }
}

function fields () {
  let now = new Date()
  return [
    {index: 0.7, text: formatSecond(now), value: now.getSeconds() / 60},
    {index: 0.6, text: formatMinute(now), value: now.getMinutes() / 60},
    {index: 0.5, text: formatHour(now), value: this.shortHours(now)}
  ]
}

// 12 hour format short hours
// function shortHours (date) {
//   let hours = date.getHours()
//   hours %= 12
//   hours /= 12
//   return hours
// }

// Avoid shortest-path interpolation.
function interpolateHsl (a, b) {
  let i = d3.interpolateString(a, b)
  return function (t) {
    return d3.hsl(i(t))
  }
}

export default function create () {
  field.append('path')
  d3.transition().duration(0).each(tick)
  d3.select(self.frameElement).style('height', height + 'px')
}
