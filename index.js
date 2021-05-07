var buttonColours = ["pink", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var level = 0;

function anime(){
  $("#"+gamePattern[gamePattern.length-1]).fadeOut().fadeIn();
  playSound(gamePattern[gamePattern.length-1]);
}

function playSound(color){
  var audio = new Audio("./sounds/"+color+".mp3");
  audio.play();
}

function nextSequence(){
  randomChosenColour = buttonColours[Math.floor((Math.random() * 4))];
  gamePattern.push(randomChosenColour);
  level++;
}

function checkAnswer(color){
  if (color == gamePattern[(userClickedPattern.length)-1]){
    if (userClickedPattern.length == gamePattern.length){
      $("p").css("visibility","visible");
      userClickedPattern = [];
      setTimeout(function(){
        nextSequence();
        anime();
        $("p").css("visibility","hidden");
        $("h1").text("Level " + level);
      }, 1000);
    }

  } else {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").css("background-color", "gray");
    $("body").css("background-image", "none");
    $("h1").text("You loose!");

    setTimeout(function(){
      location.reload();
    }, 1000);
  }
}

$(document).keydown(function(){
  if (level == 0){
    nextSequence();
    anime();
  }
    $("h1").text("Level "+level);

    $(".btn").click(function() {
      $("#"+this.id).fadeOut(100).fadeIn(100);
      playSound(this.id);
      userClickedPattern.push(this.id);

      checkAnswer(this.id);
    });
});
