/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  $("#chooseMode").text('Pick the Gamemode At the Bottom');

  $("#onePlayer").on('click', OnePlayer);
  $("#twoPlayer").on('click', TwoPlayer);
  $("#resetButton").on('click', reset);

  function reset(){
    location.reload();
  }

  function OnePlayer() {
    console.log(13);
    playGame("onePlayer");

  }

  function TwoPlayer() {
    console.log(19);
    playGame("twoPlayer");

  }

  function playGame(mode){

    $('#chooseMode').hide();
    $('#onePlayer').hide();
    $('#twoPlayer').hide();

    // Constant Variables
    const FRAME_RATE = 60;
    const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

    const BOARD_WIDTH = $("#board").width();
    const BOARD_HEIGHT = $("#board").height();

    // Game Item Objects

    var rightPaddle = Paddle('#rightPaddle', 740);

    var leftPaddle = Paddle('#leftPaddle', 40);

    var rightScore = scoreBoard('#rightScore', 800);

    var leftScore = scoreBoard('#leftScore', 0);

    var updatedScoreL = 0;

    var updatedScoreR = 0;

    var ball = {};
    ball.id = "#ball"
    ball.x = 390;
    ball.y = 385;
    ball.width = 20;
    ball.height = 20;
    ball.speedX = 0;
    ball.speedY = 0;

    function Paddle(id, x) {
      var obj = {};
      obj.id = id;
      obj.x = x;
      obj.y = 345;
      obj.speedY = 0;
      obj.speedX = 0;
      obj.width = $(id).width();
      obj.height = $(id).height();
      return obj;
    }

    function scoreBoard(id, x) {
      var obj = {};
      obj.id = id;
      obj.x = x;
      obj.y = 20;
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
    startBall();

    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// CORE LOGIC ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    /* 
    On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
    by calling this function and executing the code inside.
    */
    function newFrame() {

      if(mode === "onePlayer"){
        moveBot();
      }

      moveObject(ball);
      moveObject(leftPaddle);
      moveObject(rightPaddle);

      wallCollision(rightPaddle);
      wallCollision(leftPaddle);
      wallCollision(ball);

      doCollide(leftPaddle, ball);
      doCollide(rightPaddle, ball);

      end();
    }

    // function newFrame2() {
    //   moveObject(ball);
    //   moveObject(leftPaddle);
    //   moveObject(rightPaddle);

    //   wallCollision(ball);
    //   wallCollision(rightPaddle);
    //   wallCollision(leftPaddle);

    //   doCollide(leftPaddle, ball);
    //   doCollide(rightPaddle, ball);

    //   end();
    // }

    /* 
    Called in response to events.
    */
    function handleKeyDown(event) {

      if (event.which === KEY.UP1) {
        leftPaddle.speedY = -7;
      }

      else if (event.which === KEY.DOWN1) {
        leftPaddle.speedY = 7;
      }
      if(mode === "twoPlayer"){
      if (event.which === KEY.UP2) {
        rightPaddle.speedY = -7;
      }

      else if (event.which === KEY.DOWN2) {
        rightPaddle.speedY = 7;
      }
    }
    }

    function handleKeyUp(event) {

      if (event.which === KEY.UP1) {
        leftPaddle.speedY = 0;
      }

      else if (event.which === KEY.UP2) {
        rightPaddle.speedY = 0;
      }

      else if (event.which === KEY.DOWN1) {
        leftPaddle.speedY = 0;
      }

      else if (event.which === KEY.DOWN2) {
        rightPaddle.speedY = 0;
      }

    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    
    function moveBot(){
      if(mode === "onePlayer"){

        if(ball.x < 390){
          rightPaddle.speedY = 0;
        }

        else if(rightPaddle.y + 40 < ball.y){
          rightPaddle.speedY = 2.5;
        }

        else if(rightPaddle.y + 40 > ball.y){
          rightPaddle.speedY = -2.5;
        }

        else{
          rightPaddle.speedY = 0;
        }

        if(($("#leftScore").text() >= '6')){
          if(ball.x < 390){
            rightPaddle.speedY = 0;
          }
  
          else if(rightPaddle.y + 40 < ball.y){
            rightPaddle.speedY = 3;
          }
  
          else if(rightPaddle.y + 40 > ball.y){
            rightPaddle.speedY = -3;
          }
  
          else{
            rightPaddle.speedY = 0;
          }
        }
      }
    }

    function endGame() {
      // stop the interval timer
      clearInterval(interval);

      // turn off event handlers
      $(document).off();
    }

    function startBall() {
      ball.x = 385;
      ball.y = 385;
      ball.speedX = (Math.random() * 3 + 1.5) * (Math.random() > 0.5 ? -1 : 1);
      ball.speedY = (Math.random() * 3 + 1.5) * (Math.random() > 0.5 ? -1 : 1);
    }

    function moveObject(obj) {
      obj.x += obj.speedX;
      obj.y += obj.speedY;

      $(obj.id).css('left', obj.x);
      $(obj.id).css('top', obj.y);

    }

    function wallCollision(obj) {

      //moveObject(ball);

      if (obj.x >= BOARD_WIDTH - obj.width) {
        obj.speedX = 0;
        obj.speedY = 0;
        updatedScoreR++;
        $("#leftScore").text(updatedScoreR);
        startBall();
      }

      else if (obj.x <= 0) {
        obj.speedX = 0;
        obj.speedY = 0;
        updatedScoreL++;
        $("#rightScore").text(updatedScoreL);
        startBall();
      }

      else if (obj.y < 0) {
        obj.speedY = -1 * obj.speedY;
        obj.y = 0;
      }

      else if (obj.y >= BOARD_HEIGHT - obj.height) {
        obj.speedY = -obj.speedY;
        obj.y = BOARD_HEIGHT - obj.height;
      }

    }

    function doCollide(obj1, obj2) {
      if (obj1.x + obj1.width >= obj2.x && obj1.x <= obj2.x + obj2.width && obj1.y + obj1.height >= obj2.y && obj1.y <= obj2.y + obj2.height) {
        obj2.speedX = -obj2.speedX;
        //ball.speedX++;
        //ball.speedY++;
        return true;
      } else {
        return false;
      }
    }

    function end() {
      if ($("#rightScore").text() === '7') {
        $("#winnerText").text("Blue player wins!");
        endGame();
      }
      else if ($("#leftScore").text() === '7') {
        $("#winnerText").text("Red player wins!");
        endGame();
      }
    }
  }
}
