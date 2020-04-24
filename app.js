$(document).ready(function () {
  // create an array of objects for questions and answers
  var questions = [
    [
      "Q1: What is the name of Link's sword in the Legend of Zelda series?",
      "Keyblade",
      "Buster Sword",
      "Masamune",
      "Master Sword",
    ],
    [
      "Q2: How many games, across all platforms, are there in the Grand Theft Auto series?",
      "Five",
      "Eight",
      "Sixteen",
      "Twenty One",
    ],
  ];
  var correctAnswers = ["Master Sword", "Sixteen"];
  var score = 0;
  var questionIndex;
  var secondsLeft = 60;
  var timerInterval;

  // create a function to refresh the html on the screen each time the question is changed
  function refreshList() {
    // clear out the header area
    $("#header").html("");
    $("#body").html("");
    // prepend each item in the object to the screen
    for (var i = 0; i < Object.keys(questions[questionIndex]).length; i++) {
      if (i === 0) {
        $("#header").append(`
          <h1 data-id=${i}>
            ${questions[questionIndex][i]}
          </h1>`);
      } else {
        $("#body").attr("class", "col-sm-10 text-center");
        $("#body").append(`
          <h4 class="answerBtn">${questions[questionIndex][i]}</h4><br>
        `);
      }
    }
  }
  // add a timer (totally stole this from another of my projects)

  // call this function after clicking the start button
  function setSpeed() {
    var timerEl = document.querySelector("#timerEl");
    timerInterval = setInterval(function () {
      secondsLeft--;
      timerEl.textContent = secondsLeft + " seconds left!";
      // console.log(secondsLeft);
      if (secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
    }, 1000);
  }

  function sendMessage() {
    // clear everything from the screen and display notification
    $("#headerRow").html(`<h1 class="text-center col-sm-12">Time's Up!</h1>`);
    $("#body").attr("class", "col-sm-12 text-center");
    $("#body").html(
      `<button class="btn btn-success text-light">View Score</button>`
    );
  }

  // when you click the start button..
  $("#startBtn").on("click", function (e) {
    e.preventDefault();
    questionIndex = 0;
    refreshList();
    $("#headerRow").append(
      `<div class="col-sm-2"><p id="timerEl">60 seconds left!</p></div>`
    );
    setSpeed();
  });

  // when you click an answer in the quiz..
  $(document).on("click", ".answerBtn", function () {
    if ($(this).text() === correctAnswers[questionIndex]) {
      console.log("correct!");
    } else {
      console.log("incorrect");
    }
  });
});
