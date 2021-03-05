import Phaser from 'phaser';

import { config } from './config';
import { Main } from './scenes';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add('Main', Main);

    this.scene.start('Main');
  }
}

declare global {
  interface Window {
    game: Game,
  }
}

const onLoad = () => {
  window.game = new Game();
};

window.onload = onLoad;
