// Mattes Warning + Jan Früh (modified for implementation in the website layout)
// + Sarah Fiener (changed to safeblind colors)
// Sarah Fiener: added comment for commit check

function generateStepsGraph() {
    var windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var margin = { top: 25, right: 20, bottom: 45, left: (windowWidth / 2) * 0.05 },
        width = (windowWidth / 2.2) - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

    // create an SVG container that holds the chart
    const svg = d3.select('#steps')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(dataset).then(function (data) {

        data = preProcessAndAggregateData(data, 'Steps');

        // X axis
        var x = d3.scaleUtc()
            .range([0, width - margin.right - margin.left])
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
            .domain([0, d3.max(data, function (d) { return d.Steps; })])
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
            .text("Steps / hour");

        /*
        Add a callback function to extract the 'time' value of the svg.on('click', function date(event){}) 
        to use it in a other javascript.
        */
        function handleClickCallback(time, callback){
            var gloabalVariable = time;
            callback(time);
           }       

        /*
        Add a function to the svg container of the d3 graph which waits until the user clicks on a datapoint
        in the graph and gives the exakt time slot of the requested position of the graph in the terminal back. 
        */
        svg.on('click', function date(event){
            //Get the coordinates of the mouse related to the chart.
            let [mouseX, mouseY] = d3.pointer(event);
            //Get the time of the UTC time scale and create a new object of the type 'Date'.
            const mouseTime =new Date([x.invert(mouseX)]);
            //Get only the hour of the whole 'Date' object.
            var time = mouseTime.getHours();
            //Print the results for constructing in the console.
            console.log("mouse X time: ", time);
            console.log("mouse X : ", mouseX);
            console.log(typeof(time));


            //Call the dateHeartrate function from outside of the current function body.
            handleClickCallback(time, function(gloabalVariable){
                dateHeartrate(gloabalVariable);
            })

            //Assign the time slot to the global variable 'gloabalVariable'.
            gloabalVariable = time;

             //Remove the vertical line if a other position in the graph is selected.
             if (clipboard != time){
                var lineOfInterest = d3.select(".line1");
                lineOfInterest.remove(); 
            }


            //Insert a vertical highlighting line in green to visualize the current spot.
            for (let i= 0; i< 24; i++){
                if (time == i){
                    var clipboard = time;
                    svg.append("line")
                        .style("stroke", "green")
                        .attr("class", "line1")
                        .attr("stroke-width", 21)
                        .attr("opacity", 0.4)
                        .attr("x1", (29 + 28.95 * i))
                        .attr("x2", (29 + 28.95 * i))
                        .attr("y1", 0)
                        .attr("y2", 300);
                }
            }
        });

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.date) - 10; })
            .attr("y", function (d) { return y(d.Steps); })
            .attr("width", 20)
            .attr("height", function (d) { return height - margin.bottom - y(d.Steps); })
            .attr("fill", "rgb(86,180,233)")  // Sarah: changed colors to safeblind options.
            .attr("rx", 2)  // Sarah: bars to a more clean style
            .attr("ry", 2)  // Sarah: bars to a more clean style
            .style("stroke", "#333") // Color for the border of the bars
            .style("stroke-width", 1); // Width of the border

        // Calculate the mean of all step values
        var meanSteps = d3.mean(data, function (d) { return d.Steps; });

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
            .style("fill", "rgb(213,94,0)");

        // Display the value of each bar
        svg.selectAll("mytext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "mytext")
            .attr("x", function (d) { return x(d.date); })
            .attr("y", function (d) { return y(d.Steps) + 9; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "8px")
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .text(function (d) { return d.Steps.toFixed(0); });

        // Find the data point with the maximum steps
        var maxStepsData = data.reduce(function (prev, current) {
            return (prev.Steps > current.Steps) ? prev : current;
        });

        // Highlight the bar with the most steps
        svg.selectAll("rect")
            .filter(function (d) {
                return d.date === maxStepsData.date;
            })
            .attr("fill", "steelblue");

        // Add a star above the bar with the most steps
        svg.append("text")
            .attr("class", "star")
            .attr("x", x(maxStepsData.date))
            .attr("y", y(maxStepsData.Steps) - 5)
            .attr("text-anchor", "middle")
            .text("\u2605")
            .attr("fill", "orange")
            .attr("font-size", "20px")
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        // Find the data point with the least steps
        var minStepsData = data.reduce(function (prev, current) {
            return (prev.Steps < current.Steps) ? prev : current;
        });

        // Highlight the bar with the least steps
        svg.selectAll("rect")
            .filter(function (d) {
                return d.date === minStepsData.date;
            })
            .attr("fill", "lightblue");


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

        // Add a button in the upper left part of the graph to show the sum of all steps
        var infoButton = svg.append("g")
            .attr("class", "info-button")
            .attr("transform", "translate(" + 18 + "," + 8 + ")")
            .style("cursor", "pointer")
            .on("click", function () {
                showTotalSteps(); // Function to show the total sum of steps
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

        // Function to show the total sum of steps
        function showTotalSteps() {
            // Calculate the total sum of all steps
            var totalSteps = d3.sum(data, function (d) {
                return d.Steps;
            });

            // Remove existing sum display if any
            svg.selectAll(".sum-display").remove();

            // Display the total sum of steps in the middle-top part of the graph
            svg.append("text")
                .attr("class", "sum-display")
                .attr("x", width / 2)
                .attr("y", margin.top)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "hanging")
                .text("Total Steps: " + totalSteps);
        }





    })
}

/*
Define a function which takes the time value from the local function with 
the callback function and makes it accessable for other scripts.
*/
function dateHeartrate(gloabalVariable){
        return gloabalVariable;
}