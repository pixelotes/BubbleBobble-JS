var boot = {

    preload: function () {
        game.load.image('preloaderBar', 'assets/misc/loaderbar.png');
    },

    create: function () {

        game.state.start('preloader');
    },

    update: function () {}
};

// Initialize Phaser, and start our 'main' state 
var game = new Phaser.Game(512, 352, Phaser.AUTO, 'gameDiv');

game.state.add('boot', boot);
game.state.add('preloader', preloader);
game.state.add('menu', menu);
game.state.add('maingame', maingame);
game.state.add('gameover', gameover);
game.state.add('endscene', endscene);
game.state.start('boot');