var game = new Phaser.Game(window.innerWidth, window.innerHeight - 1, Phaser.AUTO, 'game');
game.state.add('Boot', Shift.Boot);
game.state.add('MainMenu', Shift.MainMenu);
game.state.add('Game', Shift.Game);

game.state.start('Boot');
