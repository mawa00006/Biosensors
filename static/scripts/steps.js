// Mattes Warning + Jan Früh (modified for implementation in the website layout)
// + Sarah Fiener (changed to safeblind colors)
// Sarah Fiener: added comment for commit check

function generateStepsGraph() {
        var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var margin = {top: 10, right: 20, bottom: 30, left: (windowWidth/2)*0.05 },
        width = (windowWidth/2.15) - margin.left - margin.right,
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

        data = preProcessAndAggregateData(data, 'Steps');

        // X axis
        var x = d3.scaleUtc()
        .range([ 0, width - margin.right - margin.left])
        .domain(d3.extent(data, function(d) { return d.date; }));

        // Set tick values of X axis to every 60 minutes
        var tickValues = d3.timeMinute.every(60).range(x.domain()[0], d3.timeHour.offset(x.domain()[1], 1));
        svg.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(function(date) {
            return customTickFormat(date, tickValues);
        }));


        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Steps; })])
        .range([ height  - margin.bottom, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Y-Axis label
        svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Steps / hour");

        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.date) -10; })
        .attr("y", function(d) { return y(d.Steps); })
        .attr("width", 20)
        .attr("height", function (d) { return height - margin.bottom - y(d.Steps); })
        .attr("fill", "rgb(86,180,233)")  // Sarah: changed colors to safeblind options.
            .attr("rx", 2)  // Sarah: bars to a more clean style
            .attr("ry", 2)  // Sarah: bars to a more clean style
            .style("stroke", "#333") // Color for the border of the bars
            .style("stroke-width", 1); // Width of the border


            // Calculate the mean of all step values
        var meanSteps = d3.mean(data, function(d) { return d.Steps; });

            // Add a horizontal line for the mean
        svg.append("line")
            .attr("class", "mean-line")
            .attr("x1", 0)
            .attr("y1", y(meanSteps))
            .attr("x2", width)
            .attr("y2", y(meanSteps))
            .attr("stroke", "rgb(213,94,0)") // Sarah: changed colors to safeblind options.
            .attr("stroke-width", 2);

            // Add a tick for the mean value on the Y axis
            svg.append("g")
                .attr("class", "y-axis")
                .call(d3.axisLeft(y).tickValues([meanSteps]))
                .selectAll("text")
                .style("fill", "red");

       // Display the value of each bar
        svg.selectAll("mytext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "mytext")
            .attr("x", function(d){ return x(d.date) ; })
            .attr("y", function(d){ return y(d.Steps) + 10; })
            .attr("font-family" , "sans-serif")
            .attr("font-size" , "9px")
            .attr("fill" , "white")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.Steps.toFixed(0); });


})}