/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  //Position and speed variables for the walker
  var speedX = 0;
  var speedY = 0;
  var positionX = 0;
  var positionY = 0;

  //Variables to define the width and height of the board
  var boardWidth = parseInt($('#board').css('width'));
  var boardHeight = parseInt($('#board').css('height')); 

  //Variables to define the width and height of the walker
  var walkerSizeX = parseInt($('#walker').css('width'));
  var walkerSizeY = parseInt($('#walker').css('height'));

  //console.log(typeof boardWidth);

  // Game Item Objects

  var KEY = {
    "UP": 38,
    "DOWN": 40,
    "LEFT": 37,
    "RIGHT": 39
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    repositionGameItem();
    boardLimitX();
    boardLimitY();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */

  function handleKeyUp(event){
    console.log("no input");
    speedY = 0;
    speedX = 0;
  }

  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
      console.log("down arrow pressed");
      speedY = 5
    }
    else if (event.which === KEY.UP) {
      console.log("up arrow pressed");
      speedY = -5
    }
    else if (event.which === KEY.LEFT) {
      console.log("left arrow pressed");
      speedX = -5
    }
    else if (event.which === KEY.RIGHT) {
      console.log("right arrow pressed");
      speedX = 5
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
  }

  function redrawGameItem(){
    $('#walker').css('left', positionX);
    $('#walker').css('top', positionY);
  }

  //This function stops the walker when it meets the left or right side of the board, no matter the size of the board or walker
  function boardLimitX(){
    if(positionX >= (boardWidth - walkerSizeX)){
      positionX = (boardWidth - walkerSizeX);
      speedX = 0;
    }
    else if(positionX <= 0){
      positionX = 0;
      speedX = 0;
    }
  }

  //This function stops the walker when it meets the top or bottom sides of the board, once again no matter the size of the board or walker
  function boardLimitY(){
    if(positionY >= (boardHeight - walkerSizeY)){
      positionY = (boardHeight - walkerSizeY);
      speedY = 0;
    }
    else if(positionY <= 0){
      positionY = 0;
      speedY =0; 
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
