/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

import { Main } from '../scenes';

const special = require('url:../../assets/special-trigger.png');

export default class SpecialTrigger extends Phaser.Physics.Arcade.Image {
  scene: Main;

  constructor(scene: Main, x: number, y: number) {
    super(scene, x, y, 'special');

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('special', special);
  }

  resetPosition(): void {
    this.setVelocity(0);
    this.setPosition(Phaser.Math.Between(50, 1230), -100);
  }

  trigger(): void {
    const velocityWithLevel = 50 * this.scene.level;
    this.setVelocityY(velocityWithLevel);
  }
}
