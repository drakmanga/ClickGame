if ($("#start").click(function(){
    $("#nav").addClass("hide");
    $("#navTimer").removeClass("hide");
    $("#countDown").removeClass("hide");
    $("#divstart").addClass("hide");
    $("#divend").addClass("hide");
    counter = 0;
    startGame();
    soundOff(moreThanLast);
    soundOff(endGame);
    bool = true;
}));

if ($("#restart").click(function(){
    $("#nav").addClass("hide");
    $("#navTimer").removeClass("hide");
    $("#countDown").removeClass("hide");
    $("#divstart").addClass("hide");
    $("#divend").addClass("hide");
    counter = 0
    reStartGame();
    soundOff(moreThanLast);
    soundOff(endGame);
    bool = true;
}));

var counter = 0;
var lastGameCounter = 0;
var hexagon_s = [];
var game = new Audio("gameSound.mp3");
var innerCounter = document.getElementById("counter");

var countDownGame = new Audio("countDownGame.mp3");
var endGame = new Audio("endGame.wav");
var moreThanLast = new Audio("moreThanLast.wav");
var audioValue = 1;
var isGameOn = false;


volume.addEventListener("input", (e) => {
    audioValue = e.currentTarget.value / 100;
        $("input").on('mousedown mouseup', function mouseState(e) {
            if (e.type == "mousedown") {
                if (!isGameOn) {
                    game.play(); 
                }
            }else {
                if (!isGameOn) {
                    game.pause();
                    game.currentTime = 0;
                }
            }
        });
    countDownGame.volume = audioValue;
    game.volume = audioValue;
    moreThanLast.volume = audioValue;
});


function clickCounter() {
    
    let missCounter = 0;
    var bool = false;
    if ($(".background").click(function(){
        var click = new Audio("click.mp3");
        click.volume = audioValue;
        counter += +1;
        click.play();
        hexagon_s = [counter / 120, counter, missCounter];
        innerCounter.innerHTML = "Counter Hexagons: " + counter;
        if (counter > lastGameCounter && bool == false && lastGameCounter !=0) {
            bool = true;
            $("#niceGame").addClass("hide");
            $("#newrecord").removeClass("hide");
            document.getElementById("newrecord").innerHTML = "New Record!" + "<br>" + "🏆CONGRATULATIONS🏆";
            moreThanLast.play();
        };
        $(".hexagon").remove();
        placeElements();
    }));

    $(document).on("click","body",function() {
        if (isGameOn == true) {
            if (counter >= 1) {
                var errorClick = new Audio("errorClick.wav");
                counter--;
                missCounter++;
                hexagon_s = [counter / 120, counter, missCounter];
                errorClick.play();
                innerCounter.innerHTML = "Counter Hexagons: " + counter;
            }
        }
    }); 
};

function soundOff(sound) {
    sound.pause();
    sound.currentTime = 0;
};

function timerGame() {
    let time = 120;
    let x = setInterval(function(){
        time += -1;
        game.play();
        document.getElementById("timerGame").innerHTML = "Remaining Time: " + time;
        if (time == 0) {
            isGameOn = false;
            if (lastGameCounter < hexagon_s[1]) {
                lastGameCounter = hexagon_s[1];
            }
            var endGame = new Audio("endGame.wav");
            endGame.volume = audioValue;
            endGame.play();
            clearInterval(x);
            document.getElementById("hexagons").innerHTML = "Hexagons:  " + hexagon_s[1];
            document.getElementById("hexagonsMiss").innerHTML = "Hexagons Miss: " + hexagon_s[2];
            document.getElementById("hexagons_s").innerHTML = "Hexagon/s: " + (hexagon_s[0]).toFixed(2);
            $( ".hexagon").remove();
            $("#navTimer").addClass("hide");
            $("#nav").removeClass("hide");
            $("#divend").removeClass("hide")
            soundOff(game);
            innerCounter.innerHTML = "Counter Hexagons: " + 0;
            document.getElementById("timerGame").innerHTML = "";
        };
    }, 1000); 
};

function startGame() {
    counter = 0;
    var countDown = 4;
    countDownGame.play();
    let x = setInterval(function() {
        countDown += -1;
        document.getElementById("countDown").innerHTML = "La partita inizierà fra: " + "<br><br><br>" + countDown;
        if (countDown == 0) {
            document.getElementById("countDown").innerHTML = "";
            soundOff(countDownGame);
            clearInterval(x);
            $("#countDown").addClass("hide");
            $("#niceGame").removeClass("hide");
            $("#newrecord").addClass("hide");
            isGameOn = true; 
            timerGame();  
            clickCounter();
            placeElements();
                
        };
    }, 1000);
};

function reStartGame() {
    counter = 0;
    var countDown = 4;
    countDownGame.play();
    let x = setInterval(function() {
        countDown += -1;
        document.getElementById("countDown").innerHTML = "La partita inizierà fra: " + "<br><br><br>" + countDown;
        if (countDown == 0) {
            document.getElementById("countDown").innerHTML = "";
            soundOff(countDownGame);
            clearInterval(x);
            $("#countDown").addClass("hide");
            $("#niceGame").removeClass("hide");
            $("#newrecord").addClass("hide");
            isGameOn = true; 
            placeElements();
            timerGame();      
        };
    }, 1000);
};

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
};


const background = document.querySelector(".background");

let maxInterval = 1000;
let minInterval = 1000;

function placeElements() {

    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let randomTop = getRandomNumber(0, winHeight - 100);
    let randomLeft = getRandomNumber(0, winWidth - 100);

    let hexagon = document.createElement("div");
    hexagon.classList.add("hexagon");
    hexagon.style.left = randomLeft + "px";
    hexagon.style.top = randomTop + "px";
    background.appendChild(hexagon);
};
  
function pulse() {
    let hexagons = Array.from(background.children);
    let randomIndex = Math.floor(Math.random() * hexagons.length);
    let randomHexagon = hexagons[randomIndex];
    randomHexagon.classList.remove("pulse");

    setInterval(function(){
        randomHexagon.classList.add("pulse");
    }, 10);
};


setInterval(pulse, Math.floor(Math.random() * maxInterval + minInterval));
