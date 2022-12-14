var terrain = {};

terrain.init = function() {
    terrain.nodes = [ {"x":-200,"y":-100}, {"x":0,"y":-200}, {"x":400,"y":150}, {"x":700,"y":150} ];
    terrain.lastX = 2;
    terrain.drawFarBack = 600;
    var i;
    for (i=0;i<17;i++) {
        terrain.newNode();
    }
};

terrain.newNode = function() {
    if (terrain.nodes.length<=20) {
        terrain.nodes.push({});
    } else {
        terrain.nodes.push( terrain.nodes[terrain.lastX-2] );
        terrain.nodes[terrain.lastX-2] = null;
    }
    terrain.nodes[terrain.nodes.length-1].x = terrain.nodes[terrain.nodes.length-2].x + Math.random()*Config.hill.widthVariation+Config.hill.widthBase;
    if (terrain.nodes[terrain.nodes.length-2].y<130) {
        terrain.nodes[terrain.nodes.length-1].y = 200+Math.random()*70;
    } else {
        terrain.nodes[terrain.nodes.length-1].y = 130-Math.random()*70;
    }
};

terrain.updateX = function(xx) {
    while( xx > terrain.nodes[terrain.lastX].x ){
        terrain.newNode();
        terrain.lastX++;
    }
};

terrain.funct = function(xx) {
    var i=terrain.lastX-1;
    while(terrain.nodes[i].x<xx){
        i++;
    }
    var ANode = terrain.nodes[i-1];
    var BNode = terrain.nodes[i];
    return ANode.y
            - (BNode.y-ANode.y)*0.5
            * ( Math.cos( Math.PI*( xx-ANode.x )/( BNode.x-ANode.x ) ) - 1 );
};

terrain.functDiff = function(xx) {
    var i=terrain.lastX-1;
    while(terrain.nodes[i].x<xx){
        i++;
    }
    var ANode = terrain.nodes[i-1];
    var BNode = terrain.nodes[i];
    return (BNode.y-ANode.y)*0.5
            * Math.PI/( BNode.x-ANode.x )
            * ( Math.sin( Math.PI*( xx-ANode.x )/( BNode.x-ANode.x ) ) );
};

terrain.colorIndex = 4;
terrain.colors = [225, 230, 235, 240, 245, 240, 235, 230, 225];
terrain.strokeColors = [200, 210, 220, 230, 235, 230, 220, 210, 200];
terrain.backgroundColors = [
    [10, 37, 46],
    [51, 104, 121],
    [93, 147, 165],
    [183, 210, 219],
    [200, 230, 240],
    [183, 210, 219],
    [93, 147, 165],
    [51, 104, 121],
    [10, 37, 46]
];

terrain.draw = function( starttt ) {
    if (SG.frame % Config.themeChangeRate === 0) {
        if (terrain.colorIndex >= terrain.strokeColors.length - 1) {
            terrain.colorIndex = 0;
        } else {
            terrain.colorIndex++;
        }
        document.getElementById('background').style.backgroundColor = 'rgb(' + terrain.backgroundColors[terrain.colorIndex].join(',') + ')';
    }
    ctx.lineWidth = 50;
    ctx.strokeStyle = "rgb(" + terrain.strokeColors[terrain.colorIndex] + ",255,255)"; // Top
    ctx.fillStyle = "rgb(" + terrain.colors[terrain.colorIndex] + ",255,255)"; // Middle

    terrain.drawFrom(starttt,25);
};

terrain.drawFrom = function( starttt, yOff ) {
    ctx.beginPath();
    var tmpTerrYDraw = terrain.funct(starttt-terrain.drawFarBack);
    ctx.moveTo( 0-terrain.drawFarBack, tmpTerrYDraw+yOff );
    var i;
    if (seal.startMoving) {
        if (SG.gScale<0.30) {
            for ( i=30-terrain.drawFarBack; i<=1600; i+=40 ) {
                tmpTerrYDraw = terrain.funct(starttt+i);
                ctx.lineTo( i, tmpTerrYDraw+yOff );
            }
        } else if (SG.gScale<0.35) {
            for ( i=30-terrain.drawFarBack; i<=1440; i+=30 ) {
                tmpTerrYDraw = terrain.funct(starttt+i);
                ctx.lineTo( i, tmpTerrYDraw+yOff );
            }
        } else {
            for ( i=30-terrain.drawFarBack; i<=1200; i+=20 ) {
                tmpTerrYDraw = terrain.funct(starttt+i);
                ctx.lineTo( i, tmpTerrYDraw+yOff );
            }
        }
    } else {
        for ( i=30-terrain.drawFarBack; i<=500; i+=10 ){
            tmpTerrYDraw = terrain.funct(starttt+i);
            ctx.lineTo( i, tmpTerrYDraw+yOff );
        }
    }
    ctx.lineTo(1425,1000);
    ctx.lineTo(0-terrain.drawFarBack,1000);
    ctx.fill();
    ctx.stroke();
};