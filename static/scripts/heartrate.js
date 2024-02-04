// Mattes Warning + Jan Früh (modified for implementation in the website layout)
// Sarah Fiener changes to background of graph, add mean, highest and lowest HR

function generateHeartrateGraph() {
  var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var margin = { top: 25, right: 20, bottom: 45, left: (windowWidth / 2) * 0.05 },
    width = (windowWidth / 2.15) - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  // create an SVG container that holds the chart
  const svg = d3.select('#heartrate')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(dataset).then(function (data) {
    var range = getSelectedDateRange();
    var startDate = range.startDate._d; // Access the start date
    var endDate = new Date(range.startDate._d.getTime()); // Access the end date

    // Set year to 2015
    endDate.setUTCFullYear(2015);
    // Set year to 2015
    startDate.setUTCFullYear(2015);

    // We want to display all data from the start of the startDate till the end of endDay
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 0, 0);

    startDate = d3.timeHour.offset(startDate, -2)
    endDate = d3.timeHour.offset(endDate, -2)

    // When reading the data, format variables:
    var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

    data.forEach(function (d) {
      d.date = parseTime(d.Time);
      d.HR = +d.HR;
    });

    // Filter the data based on the selected date range
    data = data.filter(function (d) {
      return d.date >= startDate && d.date <= endDate;
    });

    // Add X axis --> date format
    var x = d3.scaleUtc()
      .domain(d3.extent(data, function (d) { return d.date; }))
      .range([0, width - margin.left - margin.right]);
    // Set tick values of X axis to every 60 minutes
    var tickValues = d3.timeMinute.every(60).range(x.domain()[0], d3.timeHour.offset(x.domain()[1], 1));
    svg.append("g")
      .attr("transform", "translate(0," + (height - margin.bottom) + ")")
      .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(function (date) {
        return customTickFormat(date, tickValues, 'Heartrate');
      }));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return d.HR; })])
      .range([height - margin.bottom, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Y-Axis label
    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Heartrate (bpm)");

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
        { offset: "30%", color: "black" },
        { offset: "50%", color: "lightgrey" },
        { offset: "60%", color: "blue" },
        { offset: "70%", color: "green" },
        { offset: "80%", color: "yellow" },
        { offset: "90%", color: "red" },
      ])
      .enter().append("stop")
      .attr("offset", function (d) { return d.offset; })
      .attr("stop-color", function (d) { return d.color; });

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.HR); })
      );

    // Calculate mean, lowest, and highest heart rate
    var meanHeartRate = d3.mean(data, function (d) { return d.HR; });
    var lowestHeartRate = d3.min(data, function (d) { return d.HR; });
    var highestHeartRate = d3.max(data, function (d) { return d.HR; });

    svg.append("text")
      .attr("x", 10)
      .attr("y", height - margin.bottom - 10) // Adjusted the y position
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .text("Mean HR: " + meanHeartRate.toFixed(1) + " | Lowest HR: " + lowestHeartRate.toFixed(1) + " | Highest HR: " + highestHeartRate.toFixed(1));

    // Set the background color and opacity
    var backgroundColor = "lightgray";
    var backgroundOpacity = 0.2;

    // Set the dimensions for the background (make it larger than the graph)
    var backgroundWidth = width + 100;
    var backgroundHeight = height + 100;

    // Create a background rectangle for the container
    svg.append("rect")
      .attr("width", backgroundWidth)
      .attr("height", backgroundHeight)
      .attr("fill", backgroundColor)
      .attr("opacity", backgroundOpacity)
      .attr("x", -50)
      .attr("y", -50);
  });

}
