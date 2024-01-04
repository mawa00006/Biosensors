/*
Author: Jan Früh
*/

//Variables for "Steps" button.
let firstbutton = false
let clickCountSteps = 0;

//Variables for "Heartrate" button.
let secondbutton = false
let clickCountHeartrate = 0;

//Variables for "Temperature" button.
let thirdbutton = false
let clickCountTemp = 0;

//Variables for "Calories" button.
let fourthbutton = false
let clickCountCalo = 0;

//Function which splits the website for the given parameter "e" in the wanted cells.
function Split(e){
    if (e==2) heartrate.style.display = 'block';
    if (e==3) temperature.style.display = 'block';
    if (e==4) calories.style.display = 'block';
}


//Code block will be executed when the button "Steps" is pressed.
document.getElementById('Steps').addEventListener('click', ()=>{
    //Count up for every click on the button.
    clickCountSteps++;
    //Call the plot "steps" with its ID.
    const steps = document.getElementById("steps");

    //When you activate the button "Steps" (uneven number of clicks), this branch will be executed.
    if (clickCountSteps % 2 != 0){
        firstbutton = true
        //Change color of button to "lightblue", when pressed.
        document.getElementById("Steps").style.backgroundColor = "lightblue";
        //Activate the cell with the content of the plot.
        steps.style.display = "block";
    

        // Take demo dataset for steps and visualize the bar chart after pressing the button
        // Mattes Warning + Jan Früh (modified for implementation in the website layout)
        // Set graph dimensions
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

        // When reading the data, format variables:
        var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

        data.forEach(function(d) {
          d.date = parseTime(d.Time);
          d.Steps = +d.Steps;
        });

        // X axis
        var x = d3.scaleTime()
        .range([ 0, width ])
        .domain(d3.extent(data, function(d) { return d.date; }));

        svg.append("g")
        .attr("transform", "translate(0," + (height -margin.bottom) + ")")
        .call(d3.axisBottom(x))

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Steps; })])
        .range([ height , 0]);
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

        })

        //Distinguish which combination of buttons is pressed and call the function "Split".
        if (firstbutton && secondbutton) Split(2);
        if (firstbutton && thirdbutton) Split(3);
        if (firstbutton && fourthbutton) Split(4);


    //When you deactivate the button "Steps" (even number of clicks), this branch will be executed.
    }else {
        firstbutton = false
        //Change color of button to "white", when release the button.
        document.getElementById("Steps").style.backgroundColor = "white";
        //Deactivate the cell with the plot of the button.
        steps.style.display = "none";
    }
})


//Functionality of button "Heartrate". For more information, see code block of button "Steps".
document.getElementById('Heartrate').addEventListener('click', ()=>{
    clickCountHeartrate++;
    const heartrate = document.getElementById("heartrate");


    if (clickCountHeartrate % 2 != 0){
        secondbutton = true
        heartrate.style.display = "block";
        document.getElementById("Heartrate").style.backgroundColor = "lightblue";

        // Take demo dataset for steps and visualize the bar chart after pressing the button
        // Mattes Warning + Jan Früh (modified for implementation in the website layout)
        // Set graph dimensions
        var margin = {top: 10, right: 20, bottom: 50, left: 50},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // create an SVG container that holds the chart
        const svg = d3.select('#heartrate')
        .append('svg')
          .attr('width', width)
          .attr('height', height)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        d3.csv(dataset).then(function(data) {

        // When reading the data, format variables:
        var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

        data.forEach(function(d) {
          d.date = parseTime(d.Time);
          d.HR = +d.HR;
        });

        // Add X axis --> date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + (height -margin.bottom) + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return d.HR; })])
          .range([height - margin.bottom, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.HR); })
          );
        });
    }else {
        secondbutton = false
        heartrate.style.display = "none";
        document.getElementById("Heartrate").style.backgroundColor = "white";
    }
})


//Functionality of button "Temperature". For more information, see code block of button "Steps".
document.getElementById('Temperature').addEventListener('click', ()=>{
    clickCountTemp++;
    const temperature = document.getElementById("temperature");

    if (clickCountTemp % 2 != 0){
        thirdbutton = true
        temperature.style.display = "block";
        document.getElementById("Temperature").style.backgroundColor = "lightblue";

        // Take demo dataset for steps and visualize the bar chart after pressing the button
        // Mattes Warning + Jan Früh (modified for implementation in the website layout)
        // Set graph dimensions
        var margin = {top: 10, right: 20, bottom: 50, left: 50},
        width = 700 - margin.left - margin.right,
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

        // When reading the data, format variables:
        var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

        data.forEach(function(d) {
          d.date = parseTime(d.Time);
          d.Temperature = +d.Temperature;
        });

        // X axis
        var x = d3.scaleTime()
        .range([ 0, width ])
        .domain(d3.extent(data, function(d) { return d.date; }));
        svg.append("g")
        .attr("transform", "translate(0," + (height -margin.bottom) + ")")
        .call(d3.axisBottom(x))

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Temperature; })])
        .range([ height , 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

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

        })

        if (firstbutton && secondbutton) Split();
    }else {
        thirdbutton = false
        temperature.style.display = "none";
        document.getElementById("Temperature").style.backgroundColor = "white";
    }
})


//Functionality of button "Calories". For more information, see code block of button "Steps".
document.getElementById('Calories').addEventListener('click', ()=>{
    clickCountCalo++;
    const calories = document.getElementById("calories");

    if (clickCountCalo % 2 != 0){
        fourthbutton = true
        calories.style.display = "block";
        document.getElementById("Calories").style.backgroundColor = "lightblue";

        // Take demo dataset for steps and visualize the bar chart after pressing the button
        // Mattes Warning + Jan Früh (modified for implementation in the website layout)
        // Set graph dimensions
        var margin = {top: 10, right: 20, bottom: 50, left: 50},
        width = 700 - margin.left - margin.right,
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

        // When reading the data, format variables:
        var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

        data.forEach(function(d) {
          d.date = parseTime(d.Time);
          d.Calories = +d.Calories;
        });

        // X axis
        var x = d3.scaleTime()
        .range([ 0, width ])
        .domain(d3.extent(data, function(d) { return d.date; }));
        svg.append("g")
        .attr("transform", "translate(0," + (height -margin.bottom) + ")")
        .call(d3.axisBottom(x))


        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.Calories; })])
        .range([ height , 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.Calories); })
        .attr("width", 15)
        .attr("height", function(d) { return height - margin.bottom - y(d.Calories); })
        .attr("fill", "#69b3a2")

        })
        if (firstbutton && secondbutton) Split();
    }else {
        fourthbutton = false
        calories.style.display = "none";
        document.getElementById("Calories").style.backgroundColor = "white";
    }
})

