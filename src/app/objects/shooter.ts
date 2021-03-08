/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

const shooter = require('url:../../assets/sample-shooter.png');

export default class Shooter extends Phaser.Physics.Arcade.Image {
  velocityAmount: integer;

  constructor(scene: Phaser.Scene) {
    super(scene, 640, 640, 'shooter');

    this.velocityAmount = 500;

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.setCollideWorldBounds(true);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('shooter', shooter);
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
