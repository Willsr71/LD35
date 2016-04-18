Shift.MainMenu = function(game) {

};

Shift.MainMenu.prototype.create = function() {
  background = game.add.tileSprite(0, 0, game._width, game._height, 'background');

  logo = game.add.sprite(0, 0, 'logo');
  logo.position.x = (game._width / 2) - (logo.width / 2);
  logo.position.y = (game._height / 4) - (logo.height / 2);

  var start = game.add.sprite(0, 0, 'start');
  start.position.x = (game._width / 2) - (start.width / 2);
  start.position.y = (game._height / 4) - (logo.height / 2) + 200;
  start.inputEnabled = true;
  start.events.onInputDown.add(startlistener, this);

  var tutorial = game.add.sprite(0, 0, 'tutorial');
  tutorial.position.x = (game._width / 2) - (tutorial.width / 2);
  tutorial.position.y = (game._height / 4) - (logo.height / 2) + 300;
  tutorial.inputEnabled = true;
  tutorial.events.onInputDown.add(tutoriallistener, this);

  var highscores = game.add.sprite(0, 0, 'highscores');
  highscores.position.x = (game._width / 2) - (highscores.width / 2);
  highscores.position.y = (game._height / 4) - (logo.height / 2) + 400;
  highscores.inputEnabled = true;
  highscores.events.onInputDown.add(highscoreslistener, this);
}

Shift.MainMenu.prototype.update = function() {
  background.tilePosition.x -= 1;
}

function startlistener() {
  game.state.start('Game');
}

function tutoriallistener() {
  game.state.start('Tutorial');
}

function highscoreslistener() {
  game.state.start('Highscores');
}
