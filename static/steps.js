// Mattes Warning
// Set graph dimensions
var margin = {top: 10, right: 20, bottom: 50, left: 50},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// create an SVG container that holds the chart
const svg = d3.select('body')
  .append('svg')
      .attr('width', width)
      .attr('height', height)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv(dataset).then(function(data) {

    // When reading the data, format variables:
    var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

    data.forEach(function(d) {
      d.date = parseTime(d.Time);
      d.Steps = +d.Steps;
    });

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.date; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + (height -margin.bottom) + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.Steps; })])
  .range([ height , 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.date); })
    .attr("y", function(d) { return y(d.Steps); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - margin.bottom - y(d.Steps); })
    .attr("fill", "#69b3a2")

})