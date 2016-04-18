Shift.Tutorial = function(game) {

};

Shift.Tutorial.prototype.create = function() {
  this.stage = 1;
  this.maxStages = 10;

  this.image = game.add.sprite(0, 0, 'tutorial' + this.stage);
  this.image.inputEnabled = true;
  this.image.events.onInputDown.add(tutorialclicklistener, this);

  var back = game.add.sprite(0, 0, 'mainmenu');
  back.position.x = 10;
  back.position.y = game._height - back.height - 10;
  back.inputEnabled = true;
  back.events.onInputDown.add(backlistener, this);
};

Shift.Tutorial.prototype.nextImage = function() {
  this.stage += 1;

  if (this.stage > this.maxStages) {
    game.state.start('MainMenu', true, false);
    return;
  }

  this.image.loadTexture('tutorial' + this.stage);
}

Shift.Tutorial.prototype.update = function() {

}
