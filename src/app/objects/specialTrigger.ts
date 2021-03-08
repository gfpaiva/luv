/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

const shooter = require('url:../../assets/sample-shooter.png');

export default class SpecialTrigger extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'shooter');

    this.setTint(0x00ff00);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setScale(0.5);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('shooter', shooter);
  }
}
