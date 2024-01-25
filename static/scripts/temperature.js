// Mattes Warning + Jan Früh (modified for implementation in the website layout)

function generateTemperatureGraph() {

        var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var margin = {top: 10, right: 20, bottom: 30, left: (windowWidth/2)*0.05},
        width = (windowWidth/2.15) - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // create an SVG container that holds the chart
        const svg = d3.select('#temperature')
        .append('svg')
          .attr('width', width)
          .attr('height', height)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        d3.csv(dataset).then(function(data) {
        var range = getSelectedDateRange();
        var startDate = range.startDate._d; // Access the start date
        var endDate = range.endDate._d; // Access the end date

        // TODO only display data for the first day
        // Set year to 2015
        endDate.setUTCFullYear(2015);
        // Set year to 2015
        startDate.setUTCFullYear(2015);

        // We want to display all data from the start of the startDate till the end of endDay
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 0, 0);

        // When reading the data, format variables:
        var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

        data.forEach(function(d) {
          d.date = parseTime(d.Time);
          d.HR = +d.HR;
        });

        // Filter the data based on the selected date range
        data = data.filter(function (d) {
        return d.date >= startDate && d.date <= endDate;
        });

        // TODO show exactly 24 bins for each day
        // X axis
        var x = d3.scaleUtc()
        .range([ 0, width - margin.left - margin.right])
        .domain(d3.extent(data, function(d) { return d.date; }));
        svg.append("g")
        .attr("transform", "translate(0," + (height -margin.bottom) + ")")
        .call(d3.axisBottom(x))

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Temperature; })])
        .range([height - margin.bottom , 0]);
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

        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.Temperature); })
        .attr("width", 15)
        .attr("height", function(d) { return height - margin.bottom - y(d.Temperature); })
        .attr("fill", "#69b3a2")
})}