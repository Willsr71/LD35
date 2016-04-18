Shift.Highscores = function(game) {

};

Shift.Highscores.prototype.create = function() {
  this.image = game.add.sprite(0, 0, 'highscores');
  this.image.position.x = (game._width / 2) - (this.image.width / 2);
  this.image.position.y = 20;

  var back = game.add.sprite(0, 0, 'mainmenu');
  back.position.x = 10;
  back.position.y = game._height - back.height - 10;
  back.inputEnabled = true;
  back.events.onInputDown.add(backlistener, this);
};
