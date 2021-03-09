/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

import { Main } from '../scenes';

import { displayXRange } from '../config';

const special = require('url:../../assets/special-trigger.png');

export class SpecialTrigger extends Phaser.Physics.Arcade.Image {
  scene: Main;

  constructor(scene: Main) {
    const [initialX, finalX] = displayXRange;
    super(scene, Phaser.Math.Between(initialX, finalX), -100, 'special');

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('special', special);
  }

  resetPosition(): void {
    const [initialX, finalX] = displayXRange;
    this.setVelocity(0);
    this.setPosition(
      Phaser.Math.Between(initialX, finalX),
      (this.height * -1),
    );
  }

  trigger(): void {
    const velocityWithLevel = 50 * this.scene.level;
    this.setVelocityY(velocityWithLevel);
  }
}
