$(document).ready(function () {
  // create an array of objects for questions and answers
  var questions = [
    ["What color is the sky?", "red", "blue", "green", "yellow"],
    ["Question 2", "Q2 A1", "Q2 A2", "Q2 A3", "Q2 A4"],
  ];

  // create an empty variable for the current score, and prove I can increase it
  var score = 0;
  var questionIndex = 0;

  // create a function to refresh the html on the screen each time the question is changed
  function refreshList() {
    // clear out the main area
    $("#questions").html("");
    // prepend each item in the object to the screen
    for (var i = 0; i < Object.keys(questions[questionIndex]).length; i++) {
      if (i === 0) {
        $("#header").append(`
          <h1 data-id=${i}>
            ${questions[questionIndex][i]}
          </h1>`);
      } else {
        $("#questions").append(`<div class="card mb-3">
        <div class="card-body">
          <button data-id=${i} class="card-text answerBtn" style="width: 100px;">
            ${questions[questionIndex][i]}
          </button>
        </div>
      </div>`);
      }
    }
  }
  refreshList();
});

// add a timer
var timerEl = document.querySelector("#timerEl");
var secondsLeft = 30;

function setSpeed() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft + " seconds left!";
    // console.log(secondsLeft);
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}
setSpeed();

function sendMessage() {
  // clear everything from the screen and display notification
  $("#header").html("<h1>Time's Up!</h1>");
  $("#questions").html("<button>View Score</button>");
}
