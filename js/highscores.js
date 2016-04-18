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

  this.loading = game.add.text((game._width / 2), this.image.position.y + this.image.height + 20, "Retrieving top scores...", {
    font: "20px Arial",
    fill: "#ffffff",
    align: "center"
  });
  this.loading.anchor.setTo(0.5, 0.5);

  getScores();
};

function putScores() {
  for (var x = 0; x < scores.length; x += 1) {
    var height = (x * 20) +  game.state.getCurrentState().image.position.y + game.state.getCurrentState().image.height + 20;
    var nameText = game.add.text((game._width / 2), height, scores[x].username + " ", {
      font: "20px Arial",
      fill: "#ffffff",
      align: "left"
    });

    nameText.anchor.setTo(1, 0.5);

    var scoreText = game.add.text((game._width / 2), height, " " + scores[x].score, {
      font: "20px Arial",
      fill: "#ffffff",
      align: "right"
    });

    scoreText.anchor.setTo(0, 0.5);
  }

  game.state.getCurrentState().loading.visible = false;
}
