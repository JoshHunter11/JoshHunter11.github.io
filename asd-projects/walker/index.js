/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var speedX = 0;
  var speedY = 0;
  var positionX = 0;
  var positionY = 0;

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
    if (event.which === 40) {
      console.log("down arrow pressed");
      speedY = 5
    }
    else if (event.which === 38) {
      console.log("up arrow pressed");
      speedY = -5
    }
    else if (event.which === 37) {
      console.log("left arrow pressed");
      speedX = -5
    }
    else if (event.which === 39) {
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

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
