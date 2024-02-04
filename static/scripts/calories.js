// Mattes Warning + Jan Früh (modified for implementation in the website layout)
// Sarah Fiener
function generateCaloriesGraph() {
    var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var margin = { top: 25, right: 20, bottom: 45, left: (windowWidth / 2) * 0.05 },
        width = (windowWidth / 2.15) - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

    // create an SVG container that holds the chart
    svg = d3.select('#calories')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(dataset).then(function (data) {

        // Filter data to only show one day and aggregate values per hour
        data = preProcessAndAggregateData(data, 'Calories');

        // Replace corrupted calorie values with a default value
        data.forEach(function (d) {
            if (d.Calories > 1000) {
                d.Calories = 60;
            }
        });

        // X axis
        var x = d3.scaleUtc()
            .range([0, width - margin.right - margin.left + 7.5])
            .domain(d3.extent(data, function (d) { return d.date; }));

        // Set tick values of X axis to every 60 minutes
        var tickValues = d3.timeMinute.every(60).range(x.domain()[0], d3.timeHour.offset(x.domain()[1], 1));
        svg.append("g")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(function (date) {
                return customTickFormat(date, tickValues);
            }));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.Calories; })])
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
            .text("Calories burned / hour");

        //Draw a 'higlight line' at the same time slot like in the step.js graph.
        svg.on('mousemove', function date(event){
            //Use the variable 'globalVariable' from the step.js which includes the current requested time slot.
            var calo =dateHeartrate(gloabalVariable);
            //Exchange the old line with the new line.
            var lineOfInterest = d3.select(".line4");
            lineOfInterest.remove(); 
          
            
          //Draw and append the 'highlight line' with the value of the time spot in the step.js to the graph.
          svg.append("line")
                .style("stroke", "green")
                .attr("class", "line4")
                .attr("stroke-width", 21)
                .attr("opacity", 0.4)
                .attr("x1", (29 + 30 * calo))
                .attr("x2", (29 + 30 * calo))
                .attr("y1", 0)
                .attr("y2", 500);
          });

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.date) - 7.5; })
            .attr("y", function (d) { return y(d.Calories); })
            .attr("width", 20)
            .attr("height", function (d) { return height - margin.bottom - y(d.Calories); })
            .attr("fill", "rgb(86,180,233)")  // Sarah: changed colors to safeblind options.
            .attr("rx", 2)  // Sarah: bars to a more clean style
            .attr("ry", 2)  // Sarah: bars to a more clean style
            .style("stroke", "#333") // Color for the border of the bars
            .style("stroke-width", 1); // Width of the border


        // Calculate the mean of all calorie values
        var meanCalories = d3.mean(data, function (d) { return d.Calories; });

        // Add a horizontal line for the mean
        svg.append("line")
            .attr("class", "mean-line")
            .attr("x1", 0)
            .attr("y1", y(meanCalories))
            .attr("x2", width)
            .attr("y2", y(meanCalories))
            .attr("stroke", "rgb(213,94,0)") // Sarah: changed colors to safeblind options.
            .attr("stroke-width", 2);

        // Add a tick for the mean value on the y-axis
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).tickValues([meanCalories]))
            .selectAll("text")
            .style("fill", "rgb(213,94,0)");

        // Display the value of each bar
        svg.selectAll("mytext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "mytext")
            .attr("x", function (d) { return x(d.date); })
            .attr("y", function (d) { return y(d.Calories) + 10; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "8px")
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .text(function (d) { return d.Calories.toFixed(0); });

        // Find the data point with the least calories
        var minCaloriesData = data.reduce(function (prev, current) {
            return (prev.Calories < current.Calories) ? prev : current;
        });

        // Highlight the bar with the least calories
        svg.selectAll("rect")
            .filter(function (d) {
                return d.date === minCaloriesData.date;
            })
            .attr("fill", "lightblue");

        // Find the data point with the maximum calories
        var maxCaloriesData = data.reduce(function (prev, current) {
            return (prev.Calories > current.Calories) ? prev : current;
        });

        // Highlight the bar with the most calories
        svg.selectAll("rect")
            .filter(function (d) {
                return d.date === maxCaloriesData.date;
            })
            .attr("fill", "steelblue");

        // Add a star above the bar with the most caloriess
        svg.append("text")
            .attr("class", "star")
            .attr("x", x(maxCaloriesData.date))
            .attr("y", y(maxCaloriesData.Calories) - 5)
            .attr("text-anchor", "middle")
            .text("\u2605")
            .attr("fill", "orange")
            .attr("font-size", "20px")
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        // Find the data point with the least calories
        var minCaloriesData = data.reduce(function (prev, current) {
            return (prev.Calories < current.Calories) ? prev : current;
        });


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

        // Add a button in the upper left part of the graph to show the sum of all calories
        var infoButton = svg.append("g")
            .attr("class", "info-button")
            .attr("transform", "translate(" + 18 + "," + 8 + ")")
            .style("cursor", "pointer")
            .on("click", function () {
                showTotalCalories(); // Function to show the total sum of calories
            });

        // Info button background
        infoButton.append("rect")
            .attr("width", 30)
            .attr("height", 30)
            .attr("rx", 5)
            .attr("ry", 5)
            .style("fill", "lightgray")
            .on("mouseover", function () {
                // Add hover effect
                d3.select(this).style("fill", "gray");
            })
            .on("mouseout", function () {
                // Restore original color on mouseout
                d3.select(this).style("fill", "lightgray");
            });

        // Info button label (question mark)
        infoButton.append("text")
            .attr("x", 30 / 2)
            .attr("y", 30 / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .text("?")
            .style("fill", "black")
            .style("font-size", "20px")
            .style("pointer-events", "none"); // Prevent text from blocking mouse events

        // Function to show the total sum of calories
        function showTotalCalories() {
            // Calculate the total sum of all calories
            var totalCalories = d3.sum(data, function (d) {
                return d.Calories;
            });

            // Round to two decimal places
            totalCalories = totalCalories.toFixed(2);

            // Remove existing sum display if any
            svg.selectAll(".sum-display").remove();

            // Display the total sum of calories in the middle-top part of the graph
            svg.append("text")
                .attr("class", "sum-display")
                .attr("x", width / 2)
                .attr("y", margin.top)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "hanging")
                .text("Total Calories: " + totalCalories);
        }


    })
}
