let SG = {};

SG.timer_enterFrame = null;
SG.timer_draw = null;

SG.playGame = function() {
    if (Config.useRaf) {
        SG.timer_enterFrame = requestAnimationFrame(SG.enterFrame);
        SG.timer_draw = requestAnimationFrame(SG.draw);
    } else {
        SG.timer_enterFrame = setInterval(SG.enterFrame, Config.enterFrameRate);
        SG.timer_draw = setInterval(SG.draw, Config.drawFrameRate);
    }
};

SG.pauseGame = function() {
    if (Config.useRaf) {
        cancelAnimationFrame(SG.timer_enterFrame);
        cancelAnimationFrame(SG.timer_draw);
    } else {
        clearInterval(SG.timer_enterFrame);
        clearInterval(SG.timer_draw);
    }
};

SG.enterFrame = function() {

    if (Config.useRaf && SG.timer_enterFrame) {
        cancelAnimationFrame(SG.timer_enterFrame);
    }

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

        SG.yDisp += SG.shake;
        SG.shake *= -0.5;
    }
    if (Config.useRaf) {
        requestAnimationFrame(SG.enterFrame);
    }
};

SG.draw = function() {
    if (SG.timer_draw && Config.useRaf) {
        cancelAnimationFrame(SG.timer_draw);
    }
    ctx.clearRect(0, 0, 960, 640); // Clear the canvas
    ctx.save();
    ctx.translate(100,150-SG.yDisp*SG.gScale);
    ctx.scale(SG.gScale,SG.gScale);
    terrain.draw(seal.coord.x);
    seal.draw();
    HUD.draw();
    ctx.restore();

    if (Config.useRaf) {
        requestAnimationFrame(SG.draw);
    }
};

SG.init = function() {
    SG.gScale = 1;
    SG.yDisp = -310;
    SG.shake = 0;
    SG.setSize();
    menu.init();
    HUD.init();
    seal.init();
    terrain.init();
};

SG.setSize = function() {

    let width = window.innerWidth;
    let height = window.innerHeight;

    //@TODO: deviceRatio check for changing Config.gameMaxHeight/Height

    if (width > Config.gameMaxWidth && height > Config.gameMaxHeight && width > height) { // Set game to max width and height by ratio
        Config.gameWidth = Config.gameMaxWidth;
        Config.gameHeight = Config.gameWidth / Config.aspectRatio;
    } else if (height > Config.gameMaxHeight) { // Set game to max height and width by ratio
        Config.gameHeight = Config.gameMaxHeight;
        Config.gameWidth = Config.gameHeight * Config.aspectRatio;
    } else if (width < Config.defaultGameWidth) { // Set game to user width and height by ratio
        Config.gameWidth = width;
        Config.gameHeight = Config.gameWidth / Config.aspectRatio;
    } else if (height < Config.defaultGameHeight) { // Set game to user height and width by ratio
        Config.gameHeight = height;
        Config.gameWidth = Config.gameHeight * Config.aspectRatio;
    } else if (width > height) { // Set game to user height and width by ratio
        Config.gameHeight = height;
        Config.gameWidth = Config.gameHeight * Config.aspectRatio;
    } else if (height > width) { // Set game to user width and height by ratio
        Config.gameWidth = width;
        Config.gameHeight = Config.gameWidth / Config.aspectRatio;
    }

    if (height > Config.gameHeight) {
        document.getElementById('main-container').style.marginTop = height / 2 - Config.gameHeight / 2 + 'px';
    }

    [
        'main-container',
        'game',
        'hud',
        'background',
        'screen',
        'shade',
        'container',
        'instructions',
    ].forEach(id => {
        setSize(id, Config.gameWidth, Config.gameHeight);
    });

    document.getElementById('hud_screen').style.left = Config.gameWidth + 'px';
    document.getElementById('hud_screen').style.height = Config.gameHeight + 'px';
};

SG.artAssets = 1;
SG.loadArtAssets = function() {
    seal.image.onload = SG.onAssetLoad;
    seal.image.src = "images/seal.png";
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
    if (! Config.useRaf) {
        SG.enterFrame();
        SG.draw();
    }
    SG.playGame();
    document.getElementById("screen").style.display = "none";
};
