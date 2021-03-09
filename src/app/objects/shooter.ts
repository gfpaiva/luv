/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

import { center } from '../config';

const shooter = require('url:../../assets/shooter.png');
const shooterSpecial = require('url:../../assets/shooter-special.png');

export class Shooter extends Phaser.Physics.Arcade.Image {
  velocityAmount: integer;

  constructor(scene: Phaser.Scene) {
    super(scene, center, center, 'shooter');

    this.velocityAmount = 500;

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setCollideWorldBounds(true);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('shooter', shooter);
    scene.load.image('shooterSpecial', shooterSpecial);
  }

  updateTexture(isSpecial: boolean): void {
    if (isSpecial) {
      this.setTexture('shooterSpecial');
    } else {
      this.setTexture('shooter');
    }
  }

  updateInScene(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    if (cursors.left.isDown) {
      this.setVelocityX(-this.velocityAmount);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.velocityAmount);
    } else {
      this.setVelocityX(0);
    }
  }
}
