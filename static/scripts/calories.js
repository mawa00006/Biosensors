// Mattes Warning + Jan Früh (modified for implementation in the website layout)

function generateCaloriesGraph() {
        var margin = {top: 10, right: 20, bottom: 50, left: 50},
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // create an SVG container that holds the chart
        const svg = d3.select('#calories')
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


        // Create an array of time intervals
        var timeIntervals = d3.timeHours(startDate, d3.timeHour.offset(endDate, 0));
        console.log(timeIntervals)

        // Aggregate data within each interval
       data = timeIntervals.map(function (intervalStart, i) {
            var intervalEnd = d3.timeHour.offset(intervalStart, 1);
            var valuesInInterval = data.filter(function (d) {
                return d.date >= intervalStart && d.date < intervalEnd;
            });
            return {
                date: intervalStart,
                Calories: d3.sum(valuesInInterval, function (d) { return d.Calories; })
            };
        });

        // Replace corrupted calorie values with a default value
        data.forEach(function(d) {
            if (d.Calories > 1000) {
                d.Calories = 60;
            }
        });

        // X axis
        var x = d3.scaleUtc()
        .range([ 0, width -300 ])
        .domain(d3.extent(data, function(d) { return d.date; }));

        // Set tick values of X axis to every 60 minutes
        var tickValues = d3.timeMinute.every(60).range(x.domain()[0], x.domain()[1]);

        svg.append("g")
        .attr("transform", "translate(0," + (height -margin.bottom) + ")")
        .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(d3.timeFormat("%H")));


        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Calories; })])
        .range([ height - margin.bottom , 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) {return x(d.date) -7.5; })
        .attr("y", function(d) { return y(d.Calories); })
        .attr("width", 15)
        .attr("height", function(d) { return height - margin.bottom - y(d.Calories); })
        .attr("fill", "#69b3a2")

        // Calculate the mean of all calorie values
        var meanCalories = d3.mean(data, function(d) { return d.Calories; });

        // Add a horizontal line for the mean
        svg.append("line")
            .attr("class", "mean-line")
            .attr("x1", 0)
            .attr("y1", y(meanCalories))
            .attr("x2", width - 300)
            .attr("y2", y(meanCalories))
            .attr("stroke", "red")
            .attr("stroke-width", 2);

        // Add a tick for the mean value on the y-axis
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).tickValues([meanCalories]))
            .selectAll("text")
            .style("fill", "red");

        // Display the value of each bar
        svg.selectAll("mytext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "mytext")
            .attr("x", function(d){ return x(d.date) ; })
            .attr("y", function(d){ return y(d.Calories) + 10; })
            .attr("font-family" , "sans-serif")
            .attr("font-size" , "9px")
            .attr("fill" , "white")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.Calories.toFixed(0); });

        })}