function Player() {
  var p = game.add.sprite(0, game.height / 2);
  game.physics.enable(p, Phaser.Physics.ARCADE);
  //game.camera.follow(p);

  this.player = p;

  // set the anchor to the middle of the body
  this.player.anchor.setTo(0.5, 0.5);

  this.pos = this.player.body.position;
  this.vel = this.player.body.velocity;

  this.fireRate = 50;
  this.ticksSinceLastFire = 0;
  this.corners = 1;

  this.updateTexture();
}

Player.prototype.getPlayer = function() {
  return this.player;
}

Player.prototype.updateTexture = function() {
  this.player.body.sprite.loadTexture('player' + this.corners);
}

Player.prototype.addCorner = function() {
  this.corners += 1;

  if (this.corners >= 9) {
    this.corners = 9;
  }

  this.updateTexture();
}

Player.prototype.removeCorner = function() {
  this.corners -= 1;

  if (this.corners <= 0) {
    this.corners = 1;
  }

  this.updateTexture();
}

Player.prototype.getFiringAngles = function() {
  firingangles = [];
  anglelength = 360 / this.corners;
  position = 0;
  while (position < 360) {
    firingangles.push(position + this.player.body.sprite.angle + 90);
    position += anglelength;
  }

  return firingangles;
}

Player.prototype.fire = function() {
  this.fireRate += 0.01;

  angles = this.getFiringAngles();
  //this.lastCornerFired += 1;

  /*if (this.lastCornerFired > angles.length - 1) {
    this.lastCornerFired = 0;
  }
  this.lastAngleFired = angles[this.lastCornerFired];*/

  for (var x = 0; x < angles.length; x += 1) {
    var bullet = game.add.sprite(this.pos.x + this.player.body.halfWidth, this.pos.y + this.player.body.halfHeight, 'bulletplayer');
    game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.anchor.setTo(0.5, 0.5);
    bullet.body.sprite.angle = angles[x] - 90;
    bullet.body.velocity.x = Math.cos(angles[x] * (Math.PI / 180)) * 400;
    bullet.body.velocity.y = Math.sin(angles[x] * (Math.PI / 180)) * 400;

    bullets.add(bullet);
    //bullets.push(new Bullet(angles[x]));
  }

  sounds.fire2.play();
}

Player.prototype.update = function() {
  // ceiling/floor check
  if (this.pos.y < 0) {
    this.pos.y = 0;
    this.vel.y = 0;
  } else if (this.pos.y > game._height - this.player.body.height) {
    this.pos.y = game._height - this.player.body.height;
    this.vel.y = 0;
  }

  // left/right check
  if (this.pos.x < 0) {
    this.pos.x = 0;
    this.vel.x = 0;
  } else if (this.pos.x > game._width - this.player.body.width) {
    this.pos.x = game._width - this.player.body.width;
    this.vel.x = 0;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    this.vel.y -= 20;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    this.vel.y += 20;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    this.vel.x += 20;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    this.vel.x -= 20;
  }

  this.player.body.sprite.angle = -Math.atan2(game.input.mousePointer.x - this.pos.x, game.input.mousePointer.y - this.pos.y) * (180 / Math.PI);

  // slow down horizontally
  this.vel.x -= (this.vel.x / 16);
  this.vel.y -= (this.vel.y / 16);

  // I am 105% sure there is a better way to do this
  /*if (game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
    this.corners = 1;
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
    this.corners = 2;
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
    this.corners = 3;
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.FOUR)) {
    this.corners = 4;
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.FIVE)) {
    this.corners = 5;
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.SIX)) {
    this.corners = 6;
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.SEVEN)) {
    this.corners = 7;
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.EIGHT)) {
    this.corners = 8;
  } else if(game.input.keyboard.isDown(Phaser.Keyboard.NINE)) {
    this.corners = 9;
  }*/

  this.updateTexture();

  this.ticksSinceLastFire += 1;
  if (game.input.mousePointer.isDown && this.ticksSinceLastFire >= this.fireRate) {
    this.fire();
    this.ticksSinceLastFire = 0;
  }
};
