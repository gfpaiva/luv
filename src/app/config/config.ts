import Phaser from 'phaser';

import {
  width,
  height,
} from './constants';

export const config = {
  type: Phaser.AUTO,
  render: {
    pixelArt: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width,
    height,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
};
