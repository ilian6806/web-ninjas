var HUD = {};

HUD.init = function() {
    HUD.awesome = 0;
    HUD.timer = 1;
    HUD.points = 0;
    HUD.parasprites = 0;
    HUD.groundvel = 0;
    HUD.maxalt = 0;
    HUD.endTimer = 0;
};

HUD.draw = function() {

    hudCTX.clearRect(0, 0, 960, 640); // Clear the canvas

    // Draw Night
    if (HUD.timer < 0.2) {
        hudCTX.save();
        hudCTX.fillStyle = "#003";
        if (HUD.timer > 0) {
            hudCTX.globalAlpha = 0.8*(0.2-HUD.timer)/0.2;
        } else {
            hudCTX.globalAlpha = 0.8;
        }
        hudCTX.fillRect(0,0,480,300);
        hudCTX.restore();
    }
}

HUD.enterFrame = function() {

    if (seal.startMoving){

        HUD.awesome *= 3;
        HUD.awesome += 0.02*(-0.04*seal.coord.y+seal.vel.x*1.2); // Originally 0.04 not 0.02. Halved for better judge of awesome.
        HUD.awesome *= 0.25;

        var timerDecrease = Config.timer.constant;
        var timerIncrease = seal.vel.x * Config.timer.speedMultiplier;
        HUD.timer -= timerDecrease;
        HUD.timer += timerIncrease;

        if (HUD.groundvel<seal.vel.x) {
            HUD.groundvel = seal.vel.x;
        }
        if (HUD.maxalt < -seal.coord.y) {
            HUD.maxalt = -seal.coord.y;
        }

        if (HUD.timer<0) {
            HUD.timer = 0;
            if (HUD.endTimer == 0) {
                if (seal.vel.x<2 && seal.touchGround2) {
                    HUD.endTimer=60;
                }
            } else {
                HUD.endTimer--;
                if (HUD.endTimer == 1) {
                    menu.gameover();
                }
            }
        } else if (HUD.timer>1) {
            HUD.timer = 1;
        }

        if (document.getElementById('instructions').style.display!='none') {
            document.getElementById('instructions').style.opacity -= 0.06;
            if (document.getElementById('instructions').style.opacity<=0.061) {
                document.getElementById('instructions').style.display='none';
            }
        }
    }

    document.getElementById('points').innerHTML = HUD.points+"m";
    HUD.points = Math.floor(seal.coord.x/100);
    if (HUD.points<0) {
        HUD.points=0;
    }
};

HUD.printStats = function() {
    document.getElementById('stats_points').innerHTML = document.getElementById('points').innerHTML;
};
