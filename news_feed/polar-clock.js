var width = parseInt(document.getElementById('clock').offsetWidth),
    height = width,
    radius = Math.min(width, height) / 1.9,
    spacing = .09;

var formatSecond = d3.time.format("%S s"),
    formatMinute = d3.time.format("%M m"),
    formatHour = d3.time.format("%I h");

var color = d3.scale.linear()
    .range(["hsl(-180,50%,50%)", "hsl(180,50%,50%)"])
    .interpolate(interpolateHsl);

var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d) { return d.value * 2 * Math.PI; })
    .innerRadius(function(d) { return d.index * radius; })
    .outerRadius(function(d) { return (d.index + spacing) * radius; });

var svg = d3.select("span").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var field = svg.selectAll("g")
    .data(fields)
    .enter().append("g");

field.append("path");

//field.append("text");

d3.transition().duration(0).each(tick);

d3.select(self.frameElement).style("height", height + "px");

function tick() {
    
    // getting params every second
    var new_width = parseInt(document.getElementById('clock').offsetWidth);
    if(new_width != width)
    {
        width = new_width
        height = width;
        radius = Math.min(width, height) / 1.9;

        d3.select("svg").attr("width", width).attr("height", height);
        d3.select("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    }
    // end
    
  field = field
      .each(function(d) { this._value = d.value; })
      .data(fields)
      .each(function(d) { d.previousValue = this._value; });

  field.select("path")
    .transition()
      .ease("elastic")
      .attrTween("d", arcTween)
      .style("fill", function(d) { return color(d.value); });

  field.select("text")
      .attr("dy", function(d) { return d.value < .5 ? "-.5em" : "1em"; })
      .text(function(d) { return d.text; })
    .transition()
      .ease("elastic")
      .attr("transform", function(d) {
        return "rotate(" + 360 * d.value + ")"
            + "translate(0," + -(d.index + spacing / 2) * radius + ")"
            + "rotate(" + (d.value < .5 ? -90 : 90) + ")"
      });

  setTimeout(tick, 1000 - Date.now() % 1000);
}

function arcTween(d) {
  var i = d3.interpolateNumber(d.previousValue, d.value);
  return function(t) { d.value = i(t); return arc(d); };
}

function fields() {
  var now = new Date;
  return [
    {index: .7, text: formatSecond(now), value: now.getSeconds() / 60},
    {index: .6, text: formatMinute(now), value: now.getMinutes() / 60},
    {index: .5, text: formatHour(now),   value: shortHours(now)}
  ];
}

// 12 hour format short hours
function shortHours(date){
    var hours = date.getHours();
    hours %= 12;
    hours /= 12;
    return hours;
}


// Avoid shortest-path interpolation.
function interpolateHsl(a, b) {
  var i = d3.interpolateString(a, b);
  return function(t) {
    return d3.hsl(i(t));
  };
}