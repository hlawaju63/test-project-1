
const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause between clues
const nextClueWaitTime = 1000; // how long to wait before playing sequence


// prints "hi" in the browser's dev tools console
var pattern = [2, 2, 4, 3, 2, 1, 2, 4]
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}


/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */



function startGame(){
  //initialzing game variable
  progress = 0;
  gamePlaying = true;
  
document.getElementById("startBtn").classList.add("hidden");
document.getElementById("endBtn").classList.remove("hidden");
  playClueSequence();
}


function stopGame(){
  //swab start and stop buttons
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementByid("endBtn").classList.add("hidden");
  
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}


function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to inital wait time
  for(let i = 0; i <= progress; i++){
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue, delay, pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  
  }
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You won!")
  
}

function guess(btn){
  console.log("user gueesed: " + btn);
  if(!gamePlaying){
    return;
  }
  
  //add game logic here
  
  if(btn == pattern[guessCounter]){
    //check if turn is over
    if(progress == guessCounter){
      //check if this is last turn?
      if(progress == pattern.length - 1){
        //win game
        winGame();
      }  
      else{
        progress++;
        playClueSequence();
      }
        
    }
    else{
      guessCounter++;
    }
  }
  else{
    //lose game
    loseGame();
  }
    
    
}




