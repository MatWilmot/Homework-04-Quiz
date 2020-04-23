// create an array of items for questions and answers
var questions = [
  {
    question: "Question 1",
    answer1: "Q1 A1",
    answer2: "Q1 A2",
    answer3: "Q1 A3",
    answer4: "Q1 A4",
  },
  {
    question: "Question 2",
    answer1: "Q2 A1",
    answer2: "Q2 A2",
    answer3: "Q2 A3",
    answer4: "Q2 A4",
  },
];

// create an empty variable for the current score
var score = 0;

var plusOne = document.querySelector("#plusOne");

plusOne.addEventListener("click", function (e) {
  e.preventDefault();
  score++;
  console.log(score);
});

// add a timer
var timerEl = document.querySelector(".timerEl");
var secondsLeft = 30;

function setSpeed() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft + " seconds left!";
    console.log(secondsLeft);
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}
setSpeed();
