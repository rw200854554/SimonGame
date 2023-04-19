var buttonColors = ["red","blue","green","yellow"];
var randomPattern = []
var userClickedPattern = []
var level = 0;
var start = false;
function nextSequence(){
    userClickedPattern = [];
    var next = Math.floor(Math.random()*4);
    console.log("next");
    var randomChosenColor = buttonColors[next];
    randomPattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level "+level);
}


function checkAnswer(currLevel){
if (userClickedPattern[currLevel] == randomPattern[currLevel]){
    if (currLevel == randomPattern.length-1){
        setTimeout(function(){
            nextSequence();
        }
            ,1000);
    }
    else return;
}
else {
    playSound("wrong");
    start = false;
    GO();
    setTimeout(function(){
        startOver();
       
    },1500);
}

}

function startOver(){
    randomPattern = [];
        userClickedPattern = [];
        $("#level-title").text("You reached level "+level+" Press A Key to Restart");
        level = 0;
}

function GO(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }
    ,200);
}
$(".btn").click(function() {
    if(start == true){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    }
})

$(document).keypress(function(){
    if (start == false){
    nextSequence();
    $("#level-title").text("Level "+level);
    start = true;
    }
})


function playSound(id){
    var audio = new Audio("sounds/"+id+".mp3");
    audio.play();


}


function animatePress(id){
    $('#'+id).addClass('pressed');
    setTimeout(function() {
        $('#'+id).removeClass('pressed');
    }, 100);

}