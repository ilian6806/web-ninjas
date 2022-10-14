var kCont = {};

kCont.down = false;

kCont.S_FUNCTION = function() {
    if(! kCont.down && menu.isGameOver) {
        SG.init();
        SG.startTheGame();
    }
    kCont.down = true;
    if (menu.isPaused){
        menu.play();
    }
};

kCont.keyDownHandler = function(event) {
    if (event.keyCode == 83){ //}|| event.keyCode==32){
        kCont.S_FUNCTION();
    }
    // Pause
    if (event.keyCode == 80 || event.keyCode == 27) {
        menu.togglePause();
    }

    // Reset
    if (event.keyCode==82) {
        if (!kCont.down && seal.startMoving) {
            SG.pauseGame();
            SG.init();
            SG.startTheGame();
        }
        kCont.down = true;
    }
};

kCont.keyUpHandler = function(event){
    kCont.down = false;
};