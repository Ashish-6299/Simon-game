var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var a = false;
var level = 0;

$(".btn").click(function(){
    var userColour = $(this).attr("id");
    userClickedPattern.push(userColour);

    playSound(userColour);
    animatePress(userColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomColour = buttonColours[randomNumber];

    gamePattern.push(randomColour);

    $("#" + randomColour).fadeOut(100).fadeIn(100);
    playSound(randomColour);

    level++;
    $("#level-title").text("Level "+ level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        console.log("success");
    } else {
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press any key to Restart");

        startOver();
    }
}

function startOver(){
    a = false;
    level = 0;
    gamePattern = [];
}

$(document).keypress(function(){

    if (!a){
        a = true;
        nextSequence();
        $("#level-title").text("Level " + level);
    }
});

