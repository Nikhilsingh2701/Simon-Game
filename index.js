var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level=0;


$("body").keypress(function(){
    if(!started){
     NextSequence();
     $("h1").text("Level "+level);
     started=true;
    }
     
    
 })

$(".btn").click(function(evnt){
    var userChoosenColour=$(this).attr("id");
    userClickedPattern.push(userChoosenColour);

    PlaySound(userChoosenColour);
    AnimatePress(userChoosenColour);

    CheckAnswer(userClickedPattern.length-1);
});



function CheckAnswer(CurrentLevel){
    if(gamePattern[CurrentLevel]===userClickedPattern[CurrentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                NextSequence();
            },1000);
        }
    }else{
        PlaySound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Please restart by Pressing any Key");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        StartOVer();

    }
}

function NextSequence() {
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber=Math.random()*4;
randomNumber=Math.floor(randomNumber);
var randomColour=buttonColours[randomNumber];
gamePattern.push(randomColour);
$("#"+randomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
PlaySound(randomColour);
AnimatePress(randomColour);
}

function AnimatePress(CurrentColour) {
    $("#"+CurrentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+CurrentColour).removeClass("pressed")
    },200);
}
function PlaySound (name) {
var audio=new Audio("sounds/"+name+".mp3");
audio.play();
}
function StartOVer(){
    level=0;
    gamePattern=[];
    started=false;

}

