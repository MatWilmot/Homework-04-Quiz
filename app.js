$(document).ready(function () {
  // create an array of objects for questions and answers
  var questions = [
    ["Question 1", "Q1 A1", "Q1 A2", "Q1 A3", "Q1 A4"],
    ["Question 2", "Q2 A1", "Q2 A2", "Q2 A3", "Q2 A4"],
  ];

  // create an empty variable for the current score, and prove I can increase it
  var score = 0;

  $("#plusOne").on("click", function () {
    score++;
    console.log(score);
  });
  var questionIndex;

  // create a function to refresh the html on the screen each time the question is changed
  function refreshList() {
    // clear out the main area
    $("#questions").html("");
    questionIndex = 0;
    // prepend each item in the object to the screen
    for (var i = 0; i < Object.keys(questions[questionIndex]).length; i++) {
      $("#questions").append(`<div class="card mb-3">
      <div class="card-body">
        <button class="card-text">
          ${JSON.stringify(questions[questionIndex][i])}
        </button>
      </div>
    </div>`);
    }
  }
  refreshList();
});

// add a timer
var timerEl = document.querySelector("#timerEl");
var secondsLeft = 10;

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

// // print a question and its answers to the screen
// var questionIndex = 0;
// // button elements are persistent as long as user is taking quiz
// var header = document.createElement("h1");
// var answer1 = document.createElement("button");
// answer1.setAttribute("id", questions[questionIndex].wrong1);
// answer1.setAttribute("class", "answerBtn");
// // var answer2 = document.createElement("button");
// // var answer3 = document.createElement("button");
// // var answer4 = document.createElement("button");

// // content of each button should change based on the question
// header.innerHTML = questions[0].question;
// document.getElementById("header").appendChild(header);

// answer1.innerHTML = questions[0].answer1;
// document.getElementById("questions").appendChild(answer1);

// document.querySelector(".answerBtn").addEventListener("click", function () {
//   questionIndex++;
//   var answerBtnId = document.querySelector(this).getAttribute("id");
//   if ((answerBtnId = "correct")) {
//     score++;
//   } else {
//     console.log("wrong!");
//   }
//   console.log(answerBtnId);

//   // console.log(questionIndex);
// });
