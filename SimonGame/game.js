var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level=0;
let start=0;
function nextSequence(){
    var n = Math.random();
    var randomNumber = Math.floor(n*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    start=0;
    $("h1").text("Level "+level);
}
$(document).on("keypress",function(){
    if(level==0)nextSequence();
});
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userChosenColour);
});
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(userChosenColour){
    if (gamePattern[start++] != userChosenColour) {
        setTimeout(gameOver,400);
    }
    else if (start == level) {
      setTimeout(nextSequence, 1000);
    }
}
function gameOver(){
    $("h1").text("Game Over,Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    playSound("wrong");
    startOver();
}
function startOver(){
    start = 0;
    level = 0;
    gamePattern = [];
}