/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

const bg = require('url:../../assets/bg.jpg');

export default class Background extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene) {
    super(scene, 640, 640, 'bg');

    this.scene = scene;
    this.scene.add.image(0, 0, 'bg')
      .setScale(0.38)
      .setOrigin(0, 0);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('bg', bg);
  }
}
