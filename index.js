
var randomNumberString = "";
var btnClickString = "";
const btnColor = {
    blue: 1,
    red: 2,
    green: 3,
    yellow: 4

}
var lvlCount = 0;
var soundFile = '';

//This is to start the game
$(document).on("keypress",function(){
  if(lvlCount == 0){
    playNextbutton(); 
  }
});


$("div[type='button']").on("click",function(){
   if(lvlCount!=0)
   {
   console.log($(this).attr("id"));
   triggerButton($(this).attr("id"));
   recordClicks($(this).attr("id"));
   playGame();
   }
   
    
});

function triggerButton(div){
    playSound(div);
    $("div[id="+div+"]").addClass("pressed");
    console.log ($("div[id="+div+"]").attr("id"));
    setTimeout(function(){
        $("div[id="+div+"]").removeClass("pressed");
        console.log("delay!");
    },50);
}

function playSound(btnColor){

    soundFile = "sounds/" + btnColor + ".mp3";
    var audio = new Audio(soundFile);
    audio.play();

}

function recordClicks(btnClick){
    
    btnClickString =   btnClickString + btnColor[btnClick];
    $("#clicknumber").html("<em>"+ btnClickString +"</em>").css("color","white");
    return btnClick;
}


function playNextbutton(){
    
            lvlCount = lvlCount + 1;  
            $("#level-title").html("<em>Level "+ lvlCount +"</em>").css("color","white");   
            setTimeout(function(){
                                triggerButton(generateRandomNumbers());
                            },1000);
}


function generateRandomNumbers(){
    var generatedNumber = (Math.floor(Math.random()*4) + 1)
    randomNumberString = randomNumberString + generatedNumber;
    $("#number").html("<em>"+ randomNumberString +"</em>").css("color","white");
    return numberToColor(generatedNumber)
   
}

function numberToColor(colorNumber){
    switch(colorNumber)
    {
        case 1: return("blue");
                break;

        case 2: return("red");
                break;
                        
        case 3: return("green");
        break;
                
        case 4: return("yellow");
                break;
            
        default: return("red");
                break;
    }
}

function gameOver()
{
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
        //console.log("delay!");
    },1000);
    lvlCount = 0
    randomNumberString = "";
    btnClickString = ""
    $("#level-title").html("<em>Game Over,Press Any Key to Restart</em>").css("color","white");

}

function playGame(){
    // console.log(btnClickString.length);
    // console.log(btnClickString + " - " + randomNumberString.substring(0,btnClickString.length));
    if(randomNumberString.substring(0,btnClickString.length) == btnClickString){
        if(btnClickString.length == lvlCount){
            playNextbutton();
            btnClickString="";
            $("#clicknumber").html("<em>"+ btnClickString +"</em>").css("color","white");
        }
        else{
            return;
        }
    }
    else{
         
        console.log("call game over");
        gameOver();
        
    }
    
}