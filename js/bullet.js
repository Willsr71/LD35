function Bullet(angle, position) {
  var b = game.add.sprite(position.x, position.y, 'bulletplayer');
  game.physics.enable(b, Phaser.Physics.ARCADE);

  this.bullet = b;

    game.world.bringToTop(player.getPlayer());

  // set the anchor to the middle of the body
  this.bullet.anchor.setTo(0.5, 0.5);

  this.bullet.body.sprite.angle = angle - 90;
  this.bullet.body.velocity.x = Math.cos(angle * (Math.PI / 180)) * 400;
  this.bullet.body.velocity.y = Math.sin(angle * (Math.PI / 180)) * 400;
  //this.bullet.body.sprite.angle = Math.atan(this.bullet.body.velocity.y / this.bullet.body.velocity.x);
}

Bullet.prototype.update = function() {
  if (this.bullet.body == null) {
    bullets.pop(this);
    return;
  }

  if (this.bullet.body.position.y < 0 || this.bullet.body.position.y > game._height - this.bullet.body.height || this.bullet.body.position.x < 0 || this.bullet.body.position.x > game._width - this.bullet.body.width) {
    this.bullet.destroy();
  }
}
