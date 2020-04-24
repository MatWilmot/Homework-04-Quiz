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
    [
      "Q3: Which of the following characters does NOT exist in the Mass Effect universe",
      "First Officer Reynolds",
      "Commander Shepard",
      "Tali'Zorah nar Rayya",
      "Miranda Lawson",
    ],
    [
      "Q4: What is the name of the main protagonist in the Just Cause series?",
      "Eric Lecarde",
      "Miguel Caballero Rojo",
      "Carlos Olivera",
      "Rico Rodriguez",
    ],
    [
      "Q5: What was Mario's original name?",
      "Wario",
      "Luigi",
      "Jumpman",
      "Hammer Bro",
    ],
    [
      "Q6: Sonic is a hedgehog, and Tails is a two-tailed fox. What animal is Knuckles?",
      "Squirrel",
      "Echidna",
      "Hedgehog",
      "Rabbit",
    ],
  ];
  var correctAnswers = [
    "Master Sword",
    "Sixteen",
    "First Officer Reynolds",
    "Rico Rodriguez",
    "Jumpman",
    "Echidna",
  ];
  var score = 0;
  var questionIndex;
  var secondsLeft = 60;
  var timerInterval;
  try {
    var highscoreArray = JSON.parse(window.localStorage.getItem("High Score"));
  } catch {
    var highscoreArray = [{}];
  }
  var leaderboardLength;

  // create a function to refresh the html on the screen each time the question is changed
  function refreshQuestions() {
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
      if (secondsLeft < 1) {
        clearInterval(timerInterval);
        sendMessage("You ran out of time!");
      }
    }, 1000);
  }

  function sendMessage(str) {
    // clear everything from the screen and display notification
    $("#headerRow").html(`<h1 class="text-center col-sm-12">${str}</h1>`);
    $("#body").attr("class", "col-sm-12 text-center");
    $("#body").html(
      `<h1>Your score is ${score}</h1>
        <br />
        <form>
          <input
            type="text"
            name="userName"
            id="userName"
            autofocus
            placeholder="Enter name here"
          />
          <button id="btnSubmit" class="btn btn-primary text-light">Submit</button>
        </form>
        <br />
        <form><button id="leaderboard" class="btn btn-success text-light">Contine without submitting</button>
        <button type="submit" class="btn btn-danger text-light">Try Again</button></form>`
    );
  }

  // this function will render the high scores page
  function showHighscores() {
    // make #headerRow.html only contain one element class col-sm-12 text-center
    $("#headerRow").html(
      `<div id="header" class="col-sm-10 text-center"></div>`
    );
    $("#body").attr("class", "col-sm-6 offset-3 text-left");
    $("#body").html(`<h1>Leaderboard</h1>
    <table id="scoreTable" class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody id="tbody"></tbody>
    </table>
    <a class="btn btn-success text-light" href="./index.html">
      Home
    </a>
    <button id="clearScores" class="btn btn-danger text-light">Clear Scores</button>`);
    clearInterval(timerInterval);
    highscoreArray.sort(function (a, b) {
      return b.score - a.score;
    });

    if (highscoreArray.length < 10) {
      leaderboardLength = highscoreArray.length;
    } else {
      leaderboardLength = 10;
    }

    for (var i = 0; i < leaderboardLength; i++) {
      var currentRank = i + 1;
      $("#tbody").append(`<tr id="row-${i}"></tr>`);
      $(`#row-${i}`).append(`<td>${currentRank}</td>`);
      $(`#row-${i}`).append(`<td>${highscoreArray[i].name}</td>`);
      $(`#row-${i}`).append(`<td>${highscoreArray[i].score}</td>`);
    }
  }

  function showAlert(str, type) {
    $("#alert").show();

    // instead of conditional, use this:
    $("#alert").attr("class", `alert alert-${type}`);
    $("#alert").text(str);
    // set timeout: in this amount of time, do this
    window.setTimeout(function () {
      $("#alert").hide();
    }, 1000);
  }

  // when you click the start button..
  $(document).on("click", "#startBtn", function () {
    questionIndex = 0;
    refreshQuestions();
    $("#headerRow").append(
      `<div class="col-sm-2"><p id="timerEl">60 seconds left</p></div>`
    );
    $("#bodyBottom").html(`<div id="alert" class="col-sm-12">`);
    setSpeed();
  });

  $(document).on("click", "#leaderboard", function () {
    showHighscores();
  });

  // when you click an answer in the quiz..
  $(document).on("click", ".answerBtn", function () {
    if ($(this).text() === correctAnswers[questionIndex]) {
      score += 2;
      showAlert("Correct", "success");
    } else {
      showAlert("Wrong! -10 seconds", "danger");
      secondsLeft -= 10;
    }
    // if the question index is less than the length of the question array
    if (questionIndex < questions.length - 1) {
      // add one to question index and refresh the page
      questionIndex++;
      refreshQuestions();
      // otherwise display "finished" screen
    } else {
      sendMessage("Done!");
      clearInterval(timerInterval);
    }
  });

  // When you click the submit button
  $(document).on("click", "#btnSubmit", function (e) {
    e.preventDefault();
    // create an object in localStorage with name: and score:
    name = $("#userName").val();
    console.log(name);
    if (highscoreArray === null) {
      highscoreArray = [];
    }
    highscoreArray.push({ name, score });
    window.localStorage.setItem("High Score", JSON.stringify(highscoreArray));
    showHighscores();
  });

  // when you click the clear scores button
  $(document).on("click", "#clearScores", function () {
    window.localStorage.clear();
    $("#tbody").html("");
  });
});
