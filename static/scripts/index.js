/*
Author: Jan Früh
Author: Mattes Warning
*/

//Variables for "Steps" button.
let firstbutton = false;
let clickCountSteps = 0;

//Variables for "Heartrate" button.
let secondbutton = false;
let clickCountHeartrate = 0;

//Variables for "Temperature" button.
let thirdbutton = false;
let clickCountTemp = 0;

//Variables for "Calories" button.
let fourthbutton = false;
let clickCountCalo = 0;



//Function which sets a graph-container visible through the ID.
function displayRow(item) {
    var currentHiddenRow = document.getElementById(item);
    if (currentHiddenRow.classList.contains('hidden-row')) currentHiddenRow.classList.remove('hidden-row');
}



//Code block will be executed when the button "Steps" is pressed.
document.getElementById("Steps").addEventListener("click", () => {
    //Count up for every click on the button.
    clickCountSteps++;
    //Call the graph-container "steps" with its ID.
    var steps = document.getElementById("steps");

    //When you activate the button "Steps" (uneven number of clicks), this branch will be executed.
    if (clickCountSteps % 2 != 0) {
        firstbutton = true;
        //Change color of button to "lightblue", when pressed.
        document.getElementById("Steps").style.backgroundColor = "lightblue";
        //Activate the graph-container with the content of the plot.
        steps.classList.remove('hidden-row');

        // Generate graph from steps.js
        if (clickCountSteps== 1) generateStepsGraph();

        //Distinguish which combination of buttons is pressed and call the function "displayRow".
        if (firstbutton && secondbutton) displayRow('heartrate');
        if (firstbutton && thirdbutton) displayRow('temperature');
        if (firstbutton && fourthbutton) displayRow('calories');

        //When you deactivate the button "Steps" (even number of clicks), this branch will be executed.
    } else {
        firstbutton = false;
        //Change color of button to "white", when release the button.
        document.getElementById("Steps").style.backgroundColor = "white";
        //Deactivate the graph-container with the plot of the button.
        steps.classList.add('hidden-row');
    }
});

//Functionality of button "Heartrate". For more information, see code block of button "Steps".
document.getElementById("Heartrate").addEventListener("click", () => {
    clickCountHeartrate++;
    var heartrate = document.getElementById("heartrate");

    if (clickCountHeartrate % 2 != 0) {
        secondbutton = true;
        displayRow('heartrate');
        heartrate.classList.remove('hidden-row');
        document.getElementById("Heartrate").style.backgroundColor = "lightblue";

        // Generate graph from heartrate.js
        if (clickCountHeartrate== 1) generateHeartrateGraph();
        if (firstbutton && secondbutton) displayRow();
    } else {
        secondbutton = false;
        heartrate.classList.add('hidden-row');
        document.getElementById("Heartrate").style.backgroundColor = "white";
    }
});

//Functionality of button "Temperature". For more information, see code block of button "Steps".
document.getElementById("Temperature").addEventListener("click", () => {
    clickCountTemp++;
    var temperature = document.getElementById("temperature");

    if (clickCountTemp % 2 != 0) {
        thirdbutton = true;
        temperature.classList.remove('hidden-row');
        document.getElementById("Temperature").style.backgroundColor = "lightblue";

        // Generate graph from temperature.js
        if (clickCountTemp== 1) generateTemperatureGraph();
        if (firstbutton && thirdbutton) displayRow();
    } else {
        thirdbutton = false;
        temperature.classList.add('hidden-row');
        document.getElementById("Temperature").style.backgroundColor = "white";
    }
});

//Functionality of button "Calories". For more information, see code block of button "Steps".
document.getElementById("Calories").addEventListener("click", () => {
    clickCountCalo++;
    var calories = document.getElementById("calories");

    if (clickCountCalo % 2 != 0) {
        fourthbutton = true;
        calories.classList.remove('hidden-row');
        document.getElementById("Calories").style.backgroundColor = "lightblue";

        // Generate graph from calories.js
        if (clickCountCalo== 1) generateCaloriesGraph();
        if (firstbutton && fourthbutton) displayRow();
    } else {
        fourthbutton = false;
        calories.classList.add('hidden-row');
        document.getElementById("Calories").style.backgroundColor = "white";
    }
});
