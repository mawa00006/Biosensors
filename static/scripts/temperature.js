// Mattes Warning + Jan Früh (modified for implementation in the website layout)
// Sarah Fiener changes to color and bar design

function generateTemperatureGraph() {
    var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var margin = { top: 25, right: 20, bottom: 45, left: (windowWidth / 2) * 0.05 },
        width = (windowWidth / 2.15) - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

    // create an SVG container that holds the chart
    const svg = d3.select('#temperature')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(dataset).then(function (data) {

        data = preProcessAndAggregateData(data, 'Temperature')

        // X axis
        var x = d3.scaleUtc()
            .range([0, width - margin.left - margin.right])
            .domain(d3.extent(data, function (d) { return d.date; }));

        // Set tick values of X axis to every 60 minutes
        var tickValues = d3.timeMinute.every(60).range(x.domain()[0], d3.timeHour.offset(x.domain()[1], 1));
        svg.append("g")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(function (date) {
                return customTickFormat(date, tickValues);
            }));

        // Calculate the mean of all temperature values
        var meanTemperature = d3.mean(data, function (d) { return d.Temperature; });

        data.forEach(function (d) {
            d.Temperature = d.Temperature - meanTemperature
        });

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.Temperature; }) + -1, d3.max(data, function (d) { return d.Temperature; }) + 1])
            .range([height - margin.bottom, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Define color scale based on temperature values
        var colorScale = d3.scaleSequential()
            .domain([d3.min(data, function (d) { return d.Temperature; }), d3.max(data, function (d) { return d.Temperature; })])
            .interpolator(d3.interpolateHcl(d3.rgb("steelblue"), d3.rgb("rgb(213,94,0)")));

        // Y-Axis label
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Deviation from the mean skin temperature in °F");

        //Draw a 'higlight line' at the same time slot like in the step.js graph.
        svg.on('mousemove', function date(event){
            //Use the variable 'globalVariable' from the step.js which includes the current requested time slot.
            var temp =dateHeartrate(gloabalVariable);
            //Exchange the old line with the new line.
            var lineOfInterest = d3.select(".line3");
            lineOfInterest.remove(); 
          
            
          //Draw and append the 'highlight line' with the value of the time spot in the step.js to the graph.
          svg.append("line")
                .style("stroke", "green")
                .attr("class", "line3")
                .attr("stroke-width", 21)
                .attr("opacity", 0.4)
                .attr("x1", (29 + 30 * temp))
                .attr("x2", (29 + 30 * temp))
                .attr("y1", 0)
                .attr("y2", 500);
          });

        // Draw mean line
        svg.append("line")
            .attr("class", "mean-line")
            .attr("x1", 0)
            .attr("y1", y(0))
            .attr("x2", width)
            .attr("y2", y(0))
            .attr("stroke", "red")
            .attr("stroke-width", 2);

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.date) - 8.5; })
            .attr("y", function (d) { return d.Temperature > 0 ? y(d.Temperature) : y(0); })
            .attr("width", 20)
            .attr("height", function (d) { return Math.abs(y(d.Temperature) - y(0)); })
            .attr("fill", function (d) { return colorScale(d.Temperature); })
            .attr("rx", 2)
            .attr("ry", 2)
            .style("stroke", "#333")
            .style("stroke-width", 1);

        // Display the value of each bar
        svg.selectAll("mytext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "mytext")
            .attr("x", function (d) { return x(d.date); })
            .attr("y", function (d) { return d.Temperature > 0 ? y(d.Temperature) + 10 : y(d.Temperature) - 5; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "8px")
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .text(function (d) { return d.Temperature.toFixed(1); });

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
