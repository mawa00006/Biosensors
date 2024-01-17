/*
Author: Jan Früh
Author: Mattes Warning
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

        // Generate graph from steps.js
        generateStepsGraph();

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

        // Generate graph from heartrate.js
        generateHeartrateGraph();
        if (firstbutton && secondbutton) Split();
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

        // Generate graph from temperature.js
        generateTemperatureGraph();

        if (firstbutton && secondbutton) Split();
        }
    else {
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

        // Generate graph from calories.js
        generateCaloriesGraph();

        if (firstbutton && secondbutton) Split();
    }else {
        fourthbutton = false
        calories.style.display = "none";
        document.getElementById("Calories").style.backgroundColor = "white";
    }
})

