var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var play=false;
var level=0;
$(document).keypress(function(){
    if(!play){
        $("#level-title").text("Level " + level);
        nextSequence();
        play=true;
    }
});
$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
  level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.random()*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
        $("#"+randomChosenColour).fadeOut(10).fadeIn(10).fadeOut(10).fadeIn(10);
        playSound(randomChosenColour);   
}
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play(); 
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        } 
      } else {
        var audio = new Audio("./sounds/wrong.mp3");
    audio.play(); 
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Refresh to Restart");
        startOver();
      }
}
function startOver(){
    level = 0;
  gamePattern = [];
  started = false;
}