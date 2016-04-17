function Enemy(position, angle, size) {
  var e = game.add.sprite(position.x, position.y, 'enemy' + size);
  game.physics.enable(e, Phaser.Physics.ARCADE);

  this.enemy = e;

  // set the anchor to the middle of the body
  this.enemy.anchor.setTo(0.5, 0.5);

  this.enemy.body.sprite.angle = angle - 90;
  this.enemy.body.velocity.x = Math.cos(angle * (Math.PI / 180)) * 400;
  this.enemy.body.velocity.y = Math.sin(angle * (Math.PI / 180)) * 400;
  //this.enemy.body.sprite.angle = Math.atan(this.enemy.body.velocity.y / this.enemy.body.velocity.x);
}

Enemy.prototype.update = function() {
  if (this.enemy.body == null) {
    enemies.pop(this);
    return;
  }

  if (this.enemy.body.position.y < 0 || this.enemy.body.position.y > game._height - this.enemy.body.height || this.enemy.body.position.x < 0 || this.enemy.body.position.x > game._width - this.enemy.body.width) {
    this.enemy.destroy();
  }

  //this.enemy.body.position.x -= 1;
}
