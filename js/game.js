let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(".btn").click(function(event) {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour)
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

})

$(document).keydown(function(event) {
  if (!gameStarted) {
    nextSequence();
  } else {
    console.log("game is already started")
  }
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gameStarted = true;
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(250).fadeIn(250);
  level++;
  $("h1").text(`Level ${level}`)
  userClickedPattern = [];
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function() {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length)
      setTimeout(function() {
        nextSequence();
      }, 1000);
  } else {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
