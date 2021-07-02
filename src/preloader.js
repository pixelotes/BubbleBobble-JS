var preloader = {

    preload: function () {
        //adds a preload bar
        this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');

        this.load.setPreloadSprite(this.preloadBar);
        
        game.load.text('level1', 'assets/levels/level1.json');
        game.load.text('level2', 'assets/levels/level2.json');
        game.load.text('level3', 'assets/levels/level3.json');
        game.load.text('level4', 'assets/levels/level4.json');
        game.load.text('level5', 'assets/levels/level5.json');
        game.load.spritesheet('tileset', 'assets/tilesets/bubbob.bmp', 16, 16);
        game.load.image('tsDefault', 'assets/default.png', 32, 32);

    },

    create: function () {
        this.preloadBar.kill();
        game.state.start('menu');
    },

    update: function () {}
};