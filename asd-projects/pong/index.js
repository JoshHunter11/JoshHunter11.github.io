/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects

  var rightPaddle = Paddle('#rightPaddle', 380);
  console.log(rightPaddle);


  var leftPaddle = Paddle('#leftPaddle', 40);
  console.log(leftPaddle);

  var ball = {};
  ball.id = "#ball"
  ball.x = 210;
  ball.y = 210;
  ball.speedX = 0;
  ball.speedY = 0;

  function Paddle(id, x) {
    var obj = {};
    obj.id = id;
    obj.x = x;
    obj.y = 175;
    obj.speedY = 0;
    obj.speedX = 0;
    obj.width = $(id).width();
    obj.height = $(id).height();
    return obj;
  }

  var KEY = {
    //player 1 up and down
    "UP1": 87,
    "DOWN1": 83,

    //player 2 up and down
    "UP2": 38,
    "DOWN2": 40
  }


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    moveObject();

  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {

    if (event.which === KEY.UP1) {
      console.log("w key pressed");
      leftPaddle.speedY = 5;
    }

    else if (event.which === KEY.UP2) {
      console.log("up arrow key pressed");
      rightPaddle.speedY = 5;
    }

    else if (event.which === KEY.DOWN1) {
      console.log("s key pressed");
      leftPaddle.speedY = -5;
    }

    else if (event.which === KEY.DOWN2) {
      console.log("down arrow key pressed");
      rightPaddle.speedY = -5;
    }

  }

  function handleKeyUp(event) {

    if (event.which === KEY.UP1) {
      console.log("w key released");
      leftPaddle.speedY = 0;
    }

    else if (event.which === KEY.UP2) {
      console.log("up arrow key released");
      rightPaddle.speedY = 0;
    }

    else if (event.which === KEY.DOWN1) {
      console.log("s key released");
      leftPaddle.speedY = 0;
    }

    else if (event.which === KEY.DOWN2) {
      console.log("down arrow key released");
      rightPaddle.speedY = 0;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function startBall(){
    ball.x = 210;
    ball.y = 210;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveObject(object){
    object.x += object.speedX;
    object.y += object.speedY;

    $(object.id).css('left', object.x);
    $(object.id).css('top', object.y);

  }

}
