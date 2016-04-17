var game = new Phaser.Game(window.innerWidth, window.innerHeight - 1, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var background;
var backgroundSpeed = 0;
var paused;
var player;
var enemies;
var bullets;
var upgrades;
var explosions = [];
var sounds = {};
var isPaused = false;
var score = 0;
var scoreText;
var diedImage;

function preload() {
  // images
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
  game.load.image('explosion1', 'assets/image/explosion1.png');
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
  game.load.image('upgradebullet', 'assets/image/upgradebullet.png');
  game.load.image('upgradeplayer', 'assets/image/upgradeplayer.png');
  game.load.image('youdied', 'assets/image/youdied.png');

  // audio
  game.load.audio('explode1', 'assets/sound/explode1.wav');
  game.load.audio('fire1', 'assets/sound/fire1.wav');
  game.load.audio('fire2', 'assets/sound/fire2.wav');
}

function create() {
  sounds.fire1 = game.add.audio('fire1');
  sounds.fire2 = game.add.audio('fire2');
  sounds.explode1 = game.add.audio('explode1');

  scoreText = game.add.text(10, 10, "Score: 0 (x1 multiplier)", {
    font: "20px Arial",
    fill: "#ff0044",
    textshadow: "2px 2px #000000"
  });
  scoreText.anchor.setTo(0, 0);

  background = game.add.tileSprite(0, 0, game._width, game._height, 'background');
  //game.world.setBounds(0, 0, game._width, game._height);

  paused = game.add.sprite(0, 0, 'paused');
  paused.position.x = (game._width / 2) - (paused.width / 2);
  paused.position.y = (game._height / 2) - (paused.height / 2);
  paused.visible = false;

  diedImage = game.add.sprite(0, 0, 'youdied');
  diedImage.position.x = (game._width / 2) - (diedImage.width / 2);
  diedImage.position.y = (game._height / 2) - (diedImage.height / 2);
  diedImage.visible = false;

  player = new Player();

  bullets = game.add.group();
  enemies = game.add.group();
  upgrades = game.add.group();

  game.physics.startSystem(Phaser.Physics.ARCADE);

  // register keys
  game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(function(key) {
    if (player.corners == 0) {
      return;
    }

    isPaused = !isPaused;

    if (isPaused) {
      game.paused = true;
      paused.visible = true;
      game.world.bringToTop(paused);
    } else {
      paused.visible = false;
      game.paused = false;
    }
  });

  //game.paused = true;
}

function update() {
  background.tilePosition.x -= backgroundSpeed;

  player.update();

  createEnemies();
  enemies.forEach(updateEnemy, this, true);
  bullets.forEach(updateBullet, this, true);
  upgrades.forEach(updateUpgrade, this, true);

  game.world.bringToTop(player.player);
  game.world.bringToTop(scoreText);
}

function updateEnemy(enemy) {
  for (var x = 0; bullets.length > x; x += 1) {
    if (checkCollision(bullets.getAt(x), enemy)) {
      bulletHitEnemy(bullets.getAt(x), enemy);
      return;
    }
  }

  if (checkCollision(player.player, enemy)) {
    playerHitEnemy(enemy);
    return;
  }

  if (enemy.body == null) {
    enemies.remove(enemy, true);
  }

  if (!enemy.visible) {
    enemies.remove(enemy, true);
    console.log("removed", enemies.length);
  }

  if (enemy.body.position.x < 0) {
    createExplosion(enemy.body.position.x, enemy.body.position.y);
    enemies.remove(enemy, true);
    player.removeCorner();
  }
}

function updateBullet(bullet) {
  if (bullet.body == null) {
    return;
  }

  if (bullet.body.position.y < 0 || bullet.body.position.y > game._height - bullet.body.height ||bullet.body.position.x < 0 || bullet.body.position.x > game._width - bullet.body.width) {
    bullet.destroy();
  }
}

function updateUpgrade(upgrade) {
  if (checkCollision(player.player, upgrade)) {
    playerHitUpgrade(upgrade);
    return;
  }

  if (upgrade.body == null) {
    return;
  }

  if (upgrade.body.position.y < 0 || upgrade.body.position.y > game._height - upgrade.body.height ||upgrade.body.position.x < 0 || upgrade.body.position.x > game._width - upgrade.body.width) {
    upgrade.destroy();
  }
}

function updateScoreboard() {
  scoreText.setText("Score: " + score + " (x" + player.corners + " multiplier)");
}

function createEnemies() {
  //console.log(enemies.length);
  var maxenemies = 0;
  maxenemies += 50 - player.fireRate;
  maxenemies += 2 * player.corners;
  maxenemies += Math.floor(score / 16);

  backgroundSpeed = Math.ceil(maxenemies / 16);

  console.log(maxenemies, score);

  if (enemies.length < maxenemies && Math.round(Math.random() * 100) <= 10) {
    var ycoord = game._height + 1;
    while (ycoord > game._height - 20) {
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

    enemy.size = size;

    enemies.add(enemy);
  }
}

function createUpgrade(x, y, chance) {
  if (Math.round(Math.random() * 100) <= chance) {
    var upgrade;

    if (Math.round(Math.random() * 100) <= 50) {
      // 50% chance for size upgrade
      upgrade = game.add.sprite(x, y, 'upgradeplayer');
      upgrade.upgradeType = "player";
    } else {
      // 50% chance for fire rate upgrade
      upgrade = game.add.sprite(x, y, 'upgradebullet');
      upgrade.upgradeType = "bullet";
    }

    game.physics.enable(upgrade, Phaser.Physics.ARCADE);
    upgrade.anchor.setTo(0.5, 0.5);
    upgrade.body.velocity.x = Math.round(Math.random() * 10);
    upgrade.body.velocity.y = Math.round(Math.random() * 10);

    upgrades.add(upgrade);
  }
}

function createExplosion(x, y) {
  var random = 1;
  var explosion = game.add.sprite(x, y, 'explosion' + random);
  explosion.anchor.setTo(0.5, 0.5);

  sounds.explode1.play();

  setTimeout(function() {
    explosion.visible = false;
    explosion.destroy();
  }, 400);
}

function damageEnemy(enemy) {
  enemy.size -= 1;

  if (enemy.size <= 0) {
    createUpgrade(enemy.body.position.x, enemy.body.position.y, 10);
    enemy.destroy();
    return;
  }

  enemy.body.sprite.loadTexture('enemy' + enemy.size);
  enemy.body.velocity.x = -40 * enemy.size;
}

function checkCollision(object1, object2) {
  if (!object1._exists || !object2._exists) {
    return false;
  }

  return Phaser.Rectangle.intersects(object1, object2) || Phaser.Rectangle.intersects(object2, object1);
}

function bulletHitEnemy(bullet, enemy) {
  score += enemy.size * player.corners;
  updateScoreboard();

  createExplosion(enemy.body.position.x, enemy.body.position.y);
  bullet.kill();
  damageEnemy(enemy);
}

function playerHitEnemy(enemy) {
  createExplosion(player.player.body.position.x, player.player.body.position.y);
  createExplosion(enemy.body.position.x, enemy.body.position.y);
  damageEnemy(enemy);
  player.removeCorner();
}

function playerHitUpgrade(upgrade) {
  if (upgrade.upgradeType == "player") {
    player.addCorner();
  } else if (upgrade.upgradeType == "bullet") {
    player.fireRate -= 2;
  }

  upgrade.kill();
}
