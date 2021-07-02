var level = 1;
var level = 1;
var lives = 3;
var score = 0;
var tilepixels = 16;

var maingame = {

    preload: function () {

    },

    create: function () {
        
        this.nodeGroup = game.add.group();
        this.backgroudGroup = game.add.group();
        this.wallGroup = game.add.group();
        this.uiGroup = game.add.group();
        this.foeGroup = game.add.group();
        
        this.levelData = JSON.parse(game.cache.getText('level' + level));
        this.tileset = this.levelData.tileset;
        

        
        this.makeLevel();
        this.makePaths();
        this.makeFoes();
        //this.makePhysics();
    },

    update: function () {
        

    },

    gameover: function () {
        level = 1;
        lives = 3;
        score = 0;
        game.state.load('menu');
    },

    goFullScreen: function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize(true);
    },

    makeLevel: function () {
        matriz = this.levelData.platformLayer;
        for (i = 0; i < matriz.length; i++) {
            var linea = matriz[i];
            var linea2 = linea.split("");
            for (j = 0; j < linea2.length; j++) {
                //tiles fondo
                if (linea2[j] == 0) {
                    //obj = game.add.sprite(0 + (j * 16), 16 + ((i) * 16), 'tileset', 0, this.wallGroup);
                    //obj.frame=2;
                }
                //tiles muro
                else if (linea2[j] == 1) {
                    obj = game.add.sprite(0 + (j * tilepixels), tilepixels + ((i) * tilepixels), this.tileset, 0, this.wallGroup);
                    obj.frame=1;
                }
                //tiles pinchos der
                else if (linea2[j] == 9) {
                    obj = game.add.sprite(0 + (j * tilepixels), tilepixels + ((i) * tilepixels), this.tileset, 0, this.wallGroup);
                    obj.frame=0;
                }
            }
        }
    },
    
    makePhysics: function () {
                //activa colisiones para los muros
        game.physics.arcade.enable(wallGroup);
        wallGroup.setAll('body.immovable', true);
        wallGroup.setAll('body.mass', 100);

        //activa colisiones para los pinchos
        game.physics.arcade.enable(spikeGroup);
        spikeGroup.setAll('body.immovable', true);
    },
    
    makePaths: function () {
        matriz = this.levelData.platformLayer;
        for (i = 0; i < matriz.length; i++) {
            var linea = matriz[i];
            var linea2 = linea.split("");
            for (j = 0; j < linea2.length; j++) {
                //left jumpnode
                if (linea2[j] == 'L') {
                    obj = game.add.sprite(0 + (j * tilepixels), tilepixels + ((i) * tilepixels), this.tileset, 0, this.nodeGroup);
                    obj.body.alpha=0;
                    obj.nodeType='L';
                }
                //right jumpnode
                else if (linea2[j] == 'R') {
                    obj = game.add.sprite(0 + (j * tilepixels), tilepixels + ((i) * tilepixels), this.tileset, 0, this.nodeGroup);
                    obj.body.alpha=0;
                    obj.nodeType='R';
                }
                //up jumpnode
                else if (linea2[j] == 'U') {
                    obj = game.add.sprite(0 + (j * tilepixels), tilepixels + ((i) * tilepixels), this.tileset, 0, this.nodeGroup);
                    obj.body.alpha=0;
                    obj.nodeType='U';
                }
            }
        }
    },
    
    makeFoes: function () {
        matriz = this.levelData.platformLayer;
        for (i = 0; i < matriz.length; i++) {
            var linea = matriz[i];
            var linea2 = linea.split("");
            for (j = 0; j < linea2.length; j++) {
                //left jumpnode
                if (linea2[j] == 'A') {
                    obj = game.add.sprite(0 + (j * tilepixels), tilepixels + ((i) * tilepixels), this.tileset, 0, this.foeGroup);
                    obj.enemyType="Test";
                }
            }
        }
    },
    
    ai_huntplayer: function (actor) {
        // *** PSEUDOCODE ***
        //
        //  if player over actor {
        //      if collide with U {
        //          jump up
        //          exit function
        //      }
        //  }
        //
        //  if player is same height {
        //      if collide with L or R {
        //          jump l or r
        //          exit function
        //      } else {
        //          don't jump, just fall
        //          exit function
        //      }
        //  }
    },
    
    ai_wallbounce: function (actor, wall) {
        actor.body.velocity.x = -actor.body.velocity.x;
        this.ai_huntplayer(actor);
    },
    
    ai_jump_up: function (actor, node) {
        actor.body.velocity.y = 50;
        this.ai_huntplayer(actor);
    },
    
    ai_jump_left: function (actor, node) {
        actor.body.velocity.y = 50;
        actor.body.velocity.x = 50;
        this.ai_huntplayer(actor);
    },
    
    ai_jump_right: function (actor, node) {
        actor.body.velocity.y = 50;
        actor.body.velocity.x = -50;
        this.ai_huntplayer(actor);
    },
    
    ai_shoot: function (actor) {
    }
};