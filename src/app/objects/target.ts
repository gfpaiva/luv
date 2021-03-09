/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

const target = require('url:../../assets/target.png');

export class Target extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'target');

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('target', target);
  }
}
