import Phaser from 'phaser';

import Shot from './shot';
import Shooter from './shooter';

export default class ShotGroup {
  scene: Phaser.Scene

  group: Phaser.Physics.Arcade.Group

  fireDelay: number;

  lastFired: number;

  constructor(scene: Phaser.Scene, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      classType: Shot,
      runChildUpdate: true,
      ...config,
    });

    this.fireDelay = 100;
    this.lastFired = 0;
  }

  updateInScene(
    time: number,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    shooter: Shooter,
  ): void {
    if (cursors.space.isDown && time > this.lastFired) {
      let shot: Shot = this.group.getFirstDead();

      if (!shot) {
        shot = new Shot(this.scene, shooter.x, shooter.y);

        this.group.add(shot);
      }

      shot.reset(shooter.x, shooter.y);

      this.lastFired = time + this.fireDelay;
    }
  }
}
