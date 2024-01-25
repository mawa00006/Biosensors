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

        data = preProcessAndAggregateData(data, 'Temperature')

        // X axis
        var x = d3.scaleUtc()
        .range([ 0, width - margin.left - margin.right])
        .domain(d3.extent(data, function(d) { return d.date; }));

        // Set tick values of X axis to every 60 minutes
        var tickValues = d3.timeMinute.every(60).range(x.domain()[0], d3.timeHour.offset(x.domain()[1], 1));
        svg.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(function(date) {
            return customTickFormat(date, tickValues);
        }));

        // Calculate the mean of all temperature values
        var meanTemperature = d3.mean(data, function(d) { return d.Temperature; });

        data.forEach(function(d) {
                d.Temperature = d.Temperature - meanTemperature
                });

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return d.Temperature; }) + -1, d3.max(data, function(d) { return d.Temperature; }) + 1])
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
        .text("Deviation from the mean skin temperature in °F");

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
        .attr("x", function(d) { return x(d.date) -8.5; })
         // When the value is positive we draw a bar from y(d.Temperature) to y(0) else from y(0) to y(d.Temperature)
        .attr("y", function(d) {return d.Temperature > 0 ? y(d.Temperature) : y(0);})
        .attr("width", 17)
         // The height is the absolute deviation from the mean
        .attr("height",function(d) { return Math.abs(y(d.Temperature) - y(0));})
         // Change color based on positive / negative deviation
        .attr("fill", function(d){ return  d.Temperature > 0 ? "#69b3a2"  : "#4b4bff"; })

        // Display the value of each bar
        svg.selectAll("mytext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "mytext")
            .attr("x", function(d){ return x(d.date) ; })
            .attr("y", function(d){ return  d.Temperature > 0 ? y(d.Temperature) + 10 : y(d.Temperature) - 5; })
            .attr("font-family" , "sans-serif")
            .attr("font-size" , "9px")
            .attr("fill" , "white")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.Temperature.toFixed(1); });
})}