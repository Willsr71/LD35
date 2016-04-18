var Shift = {

};

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
var logo;

Shift.Boot = function(game) {};

Shift.Boot.prototype.preload = function() {
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
  game.load.image('highscores', 'assets/image/highscores.png');
  game.load.image('logo', 'assets/image/logo.png');
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
  game.load.image('start', 'assets/image/start.png');
  game.load.image('tutorial', 'assets/image/tutorial.png');
  game.load.image('upgradebullet', 'assets/image/upgradebullet.png');
  game.load.image('upgradeinsanity', 'assets/image/upgradeinsanity.png');
  game.load.image('upgradeplayer', 'assets/image/upgradeplayer.png');
  game.load.image('youdied', 'assets/image/youdied.png');

  game.load.image('tutorial1', 'assets/image/tutorial/tutorial1.png');
  game.load.image('tutorial2', 'assets/image/tutorial/tutorial2.png');
  game.load.image('tutorial3', 'assets/image/tutorial/tutorial3.png');
  game.load.image('tutorial4', 'assets/image/tutorial/tutorial4.png');
  game.load.image('tutorial5', 'assets/image/tutorial/tutorial5.png');
  game.load.image('tutorial6', 'assets/image/tutorial/tutorial6.png');
  game.load.image('tutorial7', 'assets/image/tutorial/tutorial7.png');
  game.load.image('tutorial8', 'assets/image/tutorial/tutorial8.png');
  game.load.image('tutorial9', 'assets/image/tutorial/tutorial9.png');
  game.load.image('tutorial10', 'assets/image/tutorial/tutorial10.png');

  // audio
  game.load.audio('explode1', 'assets/sound/explode1.wav');
  game.load.audio('fire1', 'assets/sound/fire1.wav');
  game.load.audio('fire2', 'assets/sound/fire2.wav');
}

Shift.Boot.prototype.create = function() {
  game.state.start('MainMenu');
}
