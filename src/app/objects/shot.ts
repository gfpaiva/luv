/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

import { shotLifespan } from '../config';

const shot = require('url:../../assets/shot.png');

export class Shot extends Phaser.Physics.Arcade.Image {
  speed: integer;

  lifespan: integer;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'shoot');

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.speed = 3;
    this.lifespan = shotLifespan;
  }

  static loadInScene(scene: Phaser.Scene): void {
    scene.load.image('shoot', shot);
  }

  static kill(obj: Phaser.Physics.Arcade.Image): void {
    obj.destroy();
  }

  reset(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);

    this.lifespan = shotLifespan;

    this.setPosition(x, y);
  }

  update(_: number, delta: number): void {
    this.lifespan -= delta;
    this.y -= this.speed;

    if (this.lifespan <= 0) {
      Shot.kill(this);
    }
  }
}
