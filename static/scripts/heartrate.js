// Mattes Warning + Jan Früh (modified for implementation in the website layout)

function generateHeartrateGraph() {
var margin = {top: 10, right: 20, bottom: 50, left: 50},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // create an SVG container that holds the chart
        const svg = d3.select('#heartrate')
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
          d.HR = +d.HR;
        });

        // Add X axis --> date format
        var x = d3.scaleUtc()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + (height -margin.bottom) + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return d.HR; })])
          .range([height - margin.bottom, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));


            // Set the gradient
        svg.append("linearGradient")
          .attr("id", "line-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", y(0))
          .attr("x2", 0)
          .attr("y2", y(190))
          .selectAll("stop")
            .data([
                {offset: "0%", color: "black"},
                {offset: "50%", color: "grey"},
                {offset: "60%", color: "blue"},
                {offset: "70%", color: "green"},
                {offset: "80%", color: "yellow"},
                {offset: "90%", color: "red"},
            ])
          .enter().append("stop")
            .attr("offset", function(d) { return d.offset; })
            .attr("stop-color", function(d) { return d.color; });
        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "url(#line-gradient)")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.HR); })
          );
            });

}