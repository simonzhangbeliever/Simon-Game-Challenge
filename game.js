
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var index = 0;

function nextSequence() {

    level++;
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    $("h1").text("Level " + level);
    userClickedPattern = [];
    index = 0;

}
 
$(".btn").on("click", function(event) {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level, userChosenColour);

});


function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

$(document).on("keydown", function() {
    if (gamePattern.length === 0) {
        nextSequence();
    }
}); 


function checkAnswer(currentLevel, currentColour) {

    if (gamePattern[index] != currentColour) {
        startOver();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");

    }
    else {
        index++;
        if (index === currentLevel) {
            setTimeout(nextSequence(), 1000);
        }
    }
    }

function startOver() {

    level = 0;
    gamePattern = [];

}