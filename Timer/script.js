let timerDisplay=document.getElementById('timer');
let startButton=document.getElementById('start-btn');
let stopButton=document.getElementById('stop-btn');
let resetButton=document.getElementById('reset-btn');

let timerInverval;
let elapsedTime=0;
let isRunning=false;

function formatTime(seconds){
    let minutes=Math.floor(seconds/60);
    let remainingSeconds=seconds % 60;
    return `${String(minutes).padStart(2,'0')}:${String(remainingSeconds).padStart(2,'0')}`;
}

function updateDisplay(){
    timerDisplay.textContent=formatTime(elapsedTime);

}

startButton.addEventListener('click',function(){
    if(!isRunning){
        isRunning=true;
        timerInverval=setInterval(function(){
            elapsedTime++;
            updateDisplay();

        },1000);
    }
});

stopButton.addEventListener('click',function(){
    if(isRunning){
        clearInterval(timerInverval);
        isRunning=false;
    }
})
resetButton.addEventListener('click',function(){
    clearInterval(timerInverval);
    elapsedTime=0;
    updateDisplay();
    isRunning=false;
});

updateDisplay();