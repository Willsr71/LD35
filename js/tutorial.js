Shift.Tutorial = function(game) {

};

Shift.Tutorial.prototype.create = function() {
  this.stage = 1;
  this.maxStages = 10;

  this.image = game.add.sprite(0, 0, 'tutorial' + this.stage);
  this.image.inputEnabled = true;
  this.image.events.onInputDown.add(tutorialclicklistener, this);
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

function tutorialclicklistener() {
  game.state.getCurrentState().nextImage()
}
