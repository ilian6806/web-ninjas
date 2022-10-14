(function(exports) {

    exports.Config = {

        aspectRatio: 480 / 300,
        defaultGameWidth: 480,
        defaultGameHeight: 300,
        gameMaxWidth: 720,
        gameMaxHeight: 450,

        drawFrameRate: 1000/60,
        enterFrameRate: 1000/60,

        playtime: 1,

        friction: 1, // Ground friction

        power: 2,  // How much power the seal has when you press the button

        useRaf: false,

        // The Hilly Terrain
        hill: {
            widthVariation: 150,
            widthBase: 400
        },

        // Timer
        timer: {
            constant: 1/(60*15), // Would run out in fifteen seconds (at 60FPS) if you stood still
            speedMultiplier: 0.00005 // Completely arbitrary
        }
    };

})(window);