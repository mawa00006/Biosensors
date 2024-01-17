// Mattes Warning + Jan Früh (modified for implementation in the website layout)

function generateStepsGraph() {

    var margin = {top: 10, right: 20, bottom: 50, left: 50},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // create an SVG container that holds the chart
        const svg = d3.select('#steps')
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


        // Set year to 2015
        endDate.setUTCFullYear(2015);
        // Set year to 2015
        startDate.setUTCFullYear(2015);

        console.log(startDate)


        // We want to display all data from the start of the startDate till the end of endDay
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 0, 0);

        // When reading the data, format variables:
        var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

        // Parse data
        data.forEach(function(d) {
          d.date = parseTime(d.Time);
          d.Steps = +d.Steps;
        });

        // Filter the data based on the selected date range
        data = data.filter(function (d) {
        return d.date >= startDate && d.date <= endDate;
        });


        // X axis
        var x = d3.scaleUtc()
        .range([ 0, width ])
        .domain(d3.extent(data, function(d) { return d.date; }));

        svg.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x))

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Steps; })])
        .range([ height  - margin.bottom, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.Steps); })
        .attr("width", 15)
        .attr("height", function(d) { return height - margin.bottom - y(d.Steps); })
        .attr("fill", "#69b3a2")

        svg.selectAll("text")
            .data(data)
            .enter
            .append("text")
            .attr("x", function(d){ return x(d.date) + 7.5; })
            .attr("y", function(d){ return y(d.Steps) + 10; })
            .attr("font-family" , "sans-serif")
            .attr("font-size" , "9px")
            .attr("fill" , "white")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.Steps; });


})}