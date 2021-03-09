/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

const special = require('url:../../assets/special-trigger.png');

export default class SpecialTrigger extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'special');

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('special', special);
  }
}
