var SG = {};

SG.timer_enterFrame = null;
SG.timer_draw = null;

SG.playGame = function() {
    SG.timer_enterFrame = setInterval(SG.enterFrame,enterFrameRate);
    SG.timer_draw = setInterval(SG.draw,drawFrameRate);
};

SG.pauseGame = function() {
    clearInterval(SG.timer_enterFrame);
    clearInterval(SG.timer_draw);
};

SG.enterFrame = function() {
    seal.enterFrame();
    HUD.enterFrame();

    if (seal.startMoving) {
        SG.gScale*=9;
        SG.yDisp*=9;
        if (seal.coord.y<-100) {
            SG.yDisp += (seal.coord.y+100)*0.5;
        } else {
            SG.yDisp += 0;
        }
        if (seal.touchGround3) {
            SG.gScale += 0.7;
            SG.yDisp += 100;
        } else {
            if (seal.coord.y<-100) {
                SG.gScale += 0.30;
            } else {
                SG.gScale += 0.40;
            }
        }
        SG.gScale*=0.1;
        SG.yDisp*=0.1;
        if (SG.yDisp<-300) {
            SG.yDisp*=3;
            SG.yDisp += -300;
            SG.yDisp*=0.25;
        }
        // SPLAT
        SG.yDisp += SG.shake;
        SG.shake *= -0.5;
    }
};

SG.draw = function() {

    ctx.clearRect(0, 0, 960, 640); // Clear the canvas
    ctx.save();
    ctx.translate(100,150-SG.yDisp*SG.gScale);
    ctx.scale(SG.gScale,SG.gScale);
    terrain.draw(seal.coord.x);
    seal.draw();
    HUD.draw();
    ctx.restore();
};

SG.init = function() {
    SG.gScale = 1;
    SG.yDisp = -310;
    SG.shake = 0;
    menu.init();
    HUD.init();
    seal.init();
    terrain.init();
};

SG.artAssets = 2;
SG.loadArtAssets = function() {
    seal.image.onload = SG.onAssetLoad;
    seal.image.src = "images/seal.png";
    SG.onAssetLoad();
};

SG.onAssetLoad = function() {
    SG.artAssets--;
    if (SG.artAssets === 0) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("game_container").style.display = "block";
        gameIsLoaded = true;
        SG.startTheGame();
    }
};

SG.startTheGame = function() {
    SG.enterFrame();
    SG.draw();
    SG.playGame();
    document.getElementById("screen").style.display = "none";
};
