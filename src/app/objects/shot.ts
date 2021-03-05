/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

import Shooter from './shooter';

const shot = require('url:../../assets/sample-shot.png');

export default class Shot extends Phaser.Physics.Arcade.Image {
  speed: integer;

  lifespan: integer;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'shoot');

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.speed = 5;
    this.lifespan = 5;

    this.setScale(2);
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('shoot', shot);
  }

  reset(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);
    this.lifespan = 900;
    this.setPosition(x, y);
  }

  update(time: number, delta: number): void {
    this.lifespan -= delta;
    this.y -= this.speed;

    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
