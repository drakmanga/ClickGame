if ($("#start").click(function(){
    $("#nav").addClass("hide")
    $("#item").removeClass("hide");
    $("#navTimer").removeClass("hide");
    $("#countDown").removeClass("hide");
    $("#start").addClass("hide")
    startGame();
    bool = true;
}));

var lastGameCounter = 0;
var hexagon_s = [];
var game = new Audio("gameSound.mp3");

var countDownGame = new Audio("countDownGame.mp3");
var endGame = new Audio("endGame.wav");
var moreThanLast = new Audio("moreThanLast.wav");
var audioValue = 1;


volume.addEventListener("input", (e) => {
    audioValue = e.currentTarget.value / 100;
        $("input").on('mousedown mouseup', function mouseState(e) {
            if (e.type == "mousedown") {
                game.play(); 
            }else {
                game.pause();
                game.currentTime = 0;
            }
        });
    countDownGame.volume = audioValue;
    game.volume = audioValue;
    moreThanLast.volume = audioValue;
});

function clickCounter() {
    let counter = 0;
    var bool = false;
    let innerCounter = document.getElementById("counter");
    if ($(".background").click(function(){
        var click = new Audio("click.mp3");
        click.volume = audioValue;
        counter++;
        click.play();
        hexagon_s = [counter / 120, counter];
        innerCounter.innerHTML = "Counter Click: " + counter;

        if ((hexagon_s[1] > lastGameCounter) && (bool == false) && (lastGameCounter !=0)) {
            bool = true;
            moreThanLast.play();
        };

        $(".hexagon").remove();
        placeElements();
    }));

    $(document).on("click","body",function() {
        if (counter >= 1) {
            var errorClick = new Audio("errorClick.wav");
            counter--;
            errorClick.play();
            innerCounter.innerHTML = "Counter Click: " + counter;
        };
    });
};

function timerGame() {
    let time = 120;
    let x = setInterval(function(){
        time += -1;
        game.play();
        document.getElementById("timerGame").innerHTML = "Remaining Time: " + time;
        if (time == 0) {
            lastGameCounter = hexagon_s[1];
            let endGame = new Audio("endGame.wav");
            endGame.volume = audioValue;
            endGame.play();
            clearInterval(x);
            let innerCounter = document.getElementById("counter");
            let lowerCasecounter = innerCounter.innerHTML.toLowerCase();
            document.getElementById("lastGame").innerHTML = "Last game " + lowerCasecounter + "<br>" + "Hexagon/s: " + (hexagon_s[0]).toFixed(2);
            $( ".hexagon").remove();
            $("#item").addClass("hide");
            $("#navTimer").addClass("hide");
            $("#nav").removeClass("hide");
            $("#start").removeClass("hide")
            game.pause();
            game.currentTime = 0;

            
        };
    }, 1000); 
};

function startGame() {
    let countDown = 4;
    countDownGame.play();
    let x = setInterval(function() {
        countDown += -1;
        document.getElementById("countDown").innerHTML = "La partita inizierà fra: " + "<br><br><br>" + countDown;
        if (countDown == 0) {
            countDownGame.pause();
            countDownGame.currentTime = 0;
            clearInterval(x);
            $("#countDown").addClass("hide");
            clickCounter();
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
