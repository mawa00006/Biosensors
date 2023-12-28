/*
Author: Jan Früh
*/

//Variables for "Steps" button.
let firstbutton = false
let clickCountSteps = 0;
let Left = document.getElementById('Left');

//Variables for "Heartrate" button.
let secondbutton = false
let clickCountHeartrate = 0;
let Right = document.getElementById('Right');

//Variables for "Temperature" button.
let thirdbutton = false
let clickCountTemp = 0;
let middleleft = document.getElementById('middle-left');

//Variables for "Calories" button.
let fourthbutton = false
let clickCountCalo = 0;
let middleright = document.getElementById('middle-right');

//Function which splits the website for the given parameter "e" in the wanted cells.
function Split(e){
    if (e==2) Right.style.display = 'block';
    if (e==3) middleleft.style.display = 'block';
    if (e==4) middleright.style.display = 'block';
}


//Code block will be executed when the button "Steps" is pressed.
document.getElementById('Steps').addEventListener('click', ()=>{
    //Count up for every click on the button.
    clickCountSteps++;

    //When you activate the button "Steps" (uneven number of clicks), this branch will be executed.
    if (clickCountSteps % 2 != 0){
        firstbutton = true
        //Change color of button to "lightblue", when pressed.
        document.getElementById("Steps").style.backgroundColor = "lightblue";
        //Activate the cell with the content of the button.
        Left.style.display = 'block';
        //Distinguish which combination of buttons is pressed and call the function "Split".
        if (firstbutton && secondbutton) Split(2);
        if (firstbutton && thirdbutton) Split(3);
        if (firstbutton && fourthbutton) Split(4);


    //When you deactivate the button "Steps" (even number of clicks), this branch will be executed.
    }else {
        firstbutton = false
        //Change color of button to "white", when release the button.
        document.getElementById("Steps").style.backgroundColor = "white";
        //Deactivate the cell with the content of the button.
        Left.style.display = 'none';
    }
})


//Functionality of button "Heartrate". For more information, see code block of button "Steps".
document.getElementById('Heartrate').addEventListener('click', ()=>{
    clickCountHeartrate++;
    if (clickCountHeartrate % 2 != 0){
        secondbutton = true
        document.getElementById("Heartrate").style.backgroundColor = "lightblue";
        Right.style.display = 'block';
    }else {
        secondbutton = false
        document.getElementById("Heartrate").style.backgroundColor = "white";
        Right.style.display = 'none';
    }
})


//Functionality of button "Temperature". For more information, see code block of button "Steps".
document.getElementById('Temperature').addEventListener('click', ()=>{
    clickCountTemp++;
    if (clickCountTemp % 2 != 0){
        thirdbutton = true
        document.getElementById("Temperature").style.backgroundColor = "lightblue";
        middleleft.style.display = 'block';
        if (firstbutton && secondbutton) Split();
    }else {
        thirdbutton = false
        document.getElementById("Temperature").style.backgroundColor = "white";
        middleleft.style.display = 'none';
    }
})


//Functionality of button "Calories". For more information, see code block of button "Steps".
document.getElementById('Calories').addEventListener('click', ()=>{
    clickCountCalo++;
    if (clickCountCalo % 2 != 0){
        fourthbutton = true
        document.getElementById("Calories").style.backgroundColor = "lightblue";
        middleright.style.display = 'block';
        if (firstbutton && secondbutton) Split();
    }else {
        fourthbutton = false
        document.getElementById("Calories").style.backgroundColor = "white";
        middleright.style.display = 'none';
    }
})

