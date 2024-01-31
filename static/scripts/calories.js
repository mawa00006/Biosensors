// Mattes Warning + Jan Früh (modified for implementation in the website layout)
function generateCaloriesGraph() {
        var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var margin = {top: 10, right: 20, bottom: 30, left: (windowWidth/2)*0.05},
        width = (windowWidth/2.15) - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // create an SVG container that holds the chart
        svg = d3.select('#calories')
        .append('svg')
          .attr('width', width)
          .attr('height', height)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        d3.csv(dataset).then(function(data) {

        // Filter data to only show one day and aggregate values per hour
        data = preProcessAndAggregateData(data, 'Calories');

        // Replace corrupted calorie values with a default value
        data.forEach(function(d) {
            if (d.Calories > 1000) {
                d.Calories = 60;
            }
        });

        // X axis
        var x = d3.scaleUtc()
        .range([ 0, width - margin.right - margin.left + 7.5])
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
        .domain([0, d3.max(data, function(d) { return d.Calories; })])
        .range([ height - margin.bottom , 0]);
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
            .attr("x2", width)
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