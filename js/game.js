var game = new Phaser.Game(window.innerWidth, window.innerHeight - 1, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var background;
var paused;
var player;
var enemies = [];
var bullets = [];
var sounds = {};
var isPaused = false;

function preload() {
  game.load.image('background', 'assets/image/background.png');
  game.load.image('bulletplayer', 'assets/image/bulletplayer.png');
  game.load.image('bulletenemy', 'assets/image/bulletenemy.png');
  game.load.image('enemy1', 'assets/image/enemy1.png');
  game.load.image('enemy2', 'assets/image/enemy2.png');
  game.load.image('enemy3', 'assets/image/enemy3.png');
  game.load.image('enemy4', 'assets/image/enemy4.png');
  game.load.image('enemy5', 'assets/image/enemy5.png');
  game.load.image('enemy6', 'assets/image/enemy6.png');
  game.load.image('enemy7', 'assets/image/enemy7.png');
  game.load.image('enemy8', 'assets/image/enemy8.png');
  game.load.image('enemy9', 'assets/image/enemy9.png');
  game.load.image('paused', 'assets/image/paused.png');
  game.load.image('player1', 'assets/image/player1.png');
  game.load.image('player2', 'assets/image/player2.png');
  game.load.image('player3', 'assets/image/player3.png');
  game.load.image('player4', 'assets/image/player4.png');
  game.load.image('player5', 'assets/image/player5.png');
  game.load.image('player6', 'assets/image/player6.png');
  game.load.image('player7', 'assets/image/player7.png');
  game.load.image('player8', 'assets/image/player8.png');
  game.load.image('player9', 'assets/image/player9.png');
  game.load.audio('fire1', 'assets/sound/fire1.wav');
  game.load.audio('fire2', 'assets/sound/fire2.wav');
}

function create() {
  sounds.fire1 = game.add.audio('fire1');
  sounds.fire2 = game.add.audio('fire2');

  background = game.add.tileSprite(0, 0, game._width, game._height, 'background');
  //game.world.setBounds(0, 0, game._width, game._height);

  paused = game.add.sprite(0, 0, 'paused');
  paused.position.x = (game._width / 2) - (paused.width / 2);
  paused.position.y = (game._height / 2) - (paused.height / 2);
  paused.visible = false;

  player = new Player();

  // register keys
  game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(function(key) {
    isPaused = !isPaused;

    if (!isPaused) {
      update();
    }
  });

  console.log(game);
}

function update() {
  if (isPaused) {
    game.paused = true;
    paused.visible = true;
    return;
  } else {
    paused.visible = false;
    game.paused = false;
  }

  background.tilePosition.x -= player.corners;

  createEnemies();

  for (var x = 0; x < bullets.length; x += 1) {
    bullets[x].update();
  }

  for (var x = 0; x < enemies.length; x += 1) {
    enemies[x].update();
  }

  player.update();
}

function createEnemies() {
  if (enemies.length < 0) {
    var height = game._height + 1;
    while (height > game._height) {
      height = Math.round(Math.random() * 10000);
    }

    enemies.push(new Enemy({x:game._width, y:height}, (Math.atan2(game._width - player.pos.x, height - player.pos.y) * (180 / Math.PI)) + 90, 1));
  }
}
