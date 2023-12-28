//Variables for Steps
let firstbutton = false
let clickCountSteps = 0;
let Left = document.getElementById('Left');

//Variables for Heartrate
let secondbutton = false
let clickCountHeartrate = 0;
let Right = document.getElementById('Right');

//Variables for Temperature
let thirdbutton = false
let clickCountTemp = 0;
let middleleft = document.getElementById('middle-left');

//Variables for Calories
let fourthbutton = false
let clickCountCalo = 0;
let middleright = document.getElementById('middle-right');

function Split(e){
    if (e==2) Right.style.display = 'block';
    if (e==3) middleleft.style.display = 'block';
    if (e==4) middleright.style.display = 'block';
}


//Steps
document.getElementById('Steps').addEventListener('click', ()=>{
    clickCountSteps++;

    if (clickCountSteps % 2 != 0){
        firstbutton = true
        document.getElementById("Steps").style.backgroundColor = "lightblue";
        Left.style.display = 'block';
        if (firstbutton && secondbutton) Split(2);
        if (firstbutton && thirdbutton) Split(3);
        if (firstbutton && fourthbutton) Split(4);
    }else {
        firstbutton = false
        document.getElementById("Steps").style.backgroundColor = "white";
        Left.style.display = 'none';
    }
})


//Heartrate
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


//Temperature
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


//Calories
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

