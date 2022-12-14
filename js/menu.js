var menu = {};

menu.init = function() {
    menu.isPaused = false;
    menu.isGameOver = false;
    document.getElementById("screen").style.display = "none";
    document.getElementById("pause").style.display = "block";
    document.getElementById("gameover").style.display = "none";
    if (isMobile()) {
        document.getElementById('bfullscreen').style.display = "block";
    }
};

menu.play = function() {
    if (!menu.isGameOver) {
        if (menu.isPaused) {
            document.getElementById("screen").style.display = "none";
            document.getElementById('instructions').style.display='block';
            SG.playGame();
        }
        menu.isPaused = false;
    }
    document.getElementById("bpause").className = "hud_button";
};

menu.pause = function() {
    if (!menu.isGameOver) {
        if (!menu.isPaused) {
            document.getElementById("screen").style.display = "block";
            document.getElementById('instructions').style.display='none';
            SG.pauseGame();
        }
        menu.isPaused = true;
    }
    document.getElementById("bpause").className = "hud_button toggle";
};

menu.togglePause = function() {
    if (menu.isGameOver) {
        SG.pauseGame();
        SG.init();
        SG.startTheGame();
    } else {
        if (menu.isPaused) {
            menu.play();
        } else {
            menu.pause();
        }
    }
};

menu.toggleFullScreen = function () {
    if (window.innerHeight > window.innerWidth) {
        return alert('Change orientation to landscape orientation!');
    }
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
};

menu.gameover = function() {
    menu.isGameOver = true;
    document.getElementById("screen").style.display = "block";
    document.getElementById("gameover").style.display = "block";
    document.getElementById("pause").style.display = "none";
    SG.pauseGame();
    HUD.printStats();
};