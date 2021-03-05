import Phaser from 'phaser';

export const config = {
  type: Phaser.AUTO,
  render: {
    pixelArt: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
};
