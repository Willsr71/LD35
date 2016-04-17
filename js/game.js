var game = new Phaser.Game(window.innerWidth, window.innerHeight - 1, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var background;
var paused;
var player;
var enemies;
var bullets;
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

  bullets = game.add.group();
  enemies = game.add.group();

  game.physics.startSystem(Phaser.Physics.ARCADE);

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
    game.world.bringToTop(paused);
    return;
  } else {
    paused.visible = false;
    game.paused = false;
  }

  background.tilePosition.x -= player.corners;

  createEnemies();
  updateEnemies();
  updateBullets();

    game.physics.arcade.collide(bullets, enemies, bulletHitEnemy);

  player.update();
  game.world.bringToTop(player.player);
}

function createEnemies() {
  console.log(enemies.length);
  if (enemies.length < 4 * player.corners && Math.round(Math.random() * 100) <= 10) {
    var ycoord = game._height + 1;
    while (ycoord > game._height) {
      ycoord = Math.round(Math.random() * 10000);
    }

    var size = player.corners + 1;
    while (size > player.corners) {
      size = Math.ceil(Math.random() * 10);
    }

    var enemy = game.add.sprite(game._width, ycoord, 'enemy' + size);
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.anchor.setTo(0.5, 0.5);

    enemy.body.sprite.angle = -90;
    enemy.body.velocity.x = -40 * size;

    enemies.add(enemy);
    //enemies.push(new Enemy({x:game._width, y:height}, (Math.atan2(game._width - player.pos.x, height - player.pos.y) * (180 / Math.PI)) + 90, 1));
  }
}

function updateEnemies() {
  enemies.forEach(updateEnemy, this, true);
}

function updateEnemy(enemy) {
  if (enemy.body == null) {
    return;
  }

  if (enemy.body.position.x < 0) {
    enemy.destroy();
  }
}

function updateBullets() {
  bullets.forEach(updateBullet, this, true);
}

function updateBullet(bullet) {
  if (bullet.body == null) {
    return;
  }

  if (bullet.body.position.y < 0 || bullet.body.position.y > game._height - bullet.body.height ||bullet.body.position.x < 0 || bullet.body.position.x > game._width - bullet.body.width) {
    bullet.destroy();
  }
}

function bulletHitEnemy(bullet, enemy) {
  console.log("hit");
  bullet.kill();
  enemy.kill();
}
