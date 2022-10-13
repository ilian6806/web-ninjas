var seal = {};
seal.image = new Image(800,600);

seal.init = function() {
    seal.coord = new Object();
    seal.vel = new Object();
    seal.coord.x = -10;
    seal.coord.y = -201;
    seal.vel.x = 1.9;
    seal.vel.y = -0.9;
    seal.rotation = 0;
    seal.width = seal.height = 200;
    seal.frame = 0;

    seal.touchGround = true;
    seal.touchGround2 = true;
    seal.touchGround3 = false;
    seal.keyDown = false;
};

seal.startMoving = false;

seal.draw = function() {
    // TRANSFORM
    ctx.save();
    ctx.translate(0,seal.coord.y);
    ctx.rotate(seal.rotation);
    ctx.drawImage( seal.image, -120, -120, 150, 150);
    // RESTORE
    ctx.restore();
};

seal.enterFrame = function() {
    // KEY
    seal.keyDown = kCont.down;
    if (!seal.startMoving) {
        seal.startMoving = seal.keyDown;
    }

    // FRAME
    seal.frame += (2+seal.vel.x)/60;
    if (seal.keyDown) {
        seal.frame += 0.2;
    }
    seal.frame %= 3;

    if (seal.startMoving) {

        // Velocity Addition
        if (HUD.timer<=0) {
            seal.vel.x*=0.98;
        }
        if (HUD.timer>0 && seal.keyDown) {
            if (seal.touchGround2) {
                if (seal.vel.y>0) {
                    seal.vel.y += 0.3 * Config.power;
                    //seal.vel.x += 0.05;
                } else {
                    //seal.vel.y -= 0.05;
                    seal.vel.x += 0.2 * Config.power;
                    //seal.vel.x += 0.1; //Should just be pushing fwd
                }
            } else {
                seal.vel.y += 0.25 * Config.power;
            }
        } else {
            if (HUD.timer>0 && seal.touchGround2) {
                if (seal.vel.y<0 && seal.vel.x<3) {
                    seal.vel.x += 0.05;
                }
            }
            if (HUD.timer<=0 && !seal.touchGround2) {
                seal.vel.y+=0.2;
            }
            seal.vel.y += 0.08;
        }

        // Move coords
        seal.coord.x += seal.vel.x;
        var terrY = terrain.funct(seal.coord.x);
        if (seal.touchGround3) {
            seal.coord.y += terrY;
        } else {
            seal.coord.y += seal.vel.y;
        }
        // Terrain Update

        terrain.updateX(seal.coord.x);

        // Correct coords
        /*seal.touchGround = (   ( seal.vel.y>0 && seal.coord.y>terrY-2 )
                           || ( seal.vel.y<0 && seal.coord.y>terrY-0.5 )
                           );*/
         //seal.touchGround3 = seal.coord.y>terrY-100;
         seal.touchGround2 = seal.coord.y>terrY-5;
         seal.touchGround = seal.coord.y>terrY;
        if (seal.touchGround) {
            seal.coord.y = terrY;
            // Slope & Projection
            var terrSlope = terrain.functDiff(seal.coord.x);
            var terrLength = Math.sqrt(1*1+terrSlope*terrSlope);
            var dotProduct = seal.vel.x*1 + seal.vel.y*terrSlope;
            dotProduct = dotProduct/terrLength;
            seal.vel.x = dotProduct/Math.sqrt(1+terrSlope*terrSlope);
            if(seal.vel.x<0.1){
                seal.vel.x=0.1;
            }
            seal.vel.y = seal.vel.x*terrSlope;
            seal.vel.x *= Config.friction;
            seal.vel.y *= Config.friction;
        } else {
            //seal.coord.y += seal.vel.y;
        }

        seal.rotation = Math.atan2(seal.vel.y,seal.vel.x);
        if (seal.rotation>Math.PI*0.3) {
            seal.rotation*=3;
            seal.rotation+=Math.PI*0.3;
            seal.rotation*=0.25;
        }
    }
};