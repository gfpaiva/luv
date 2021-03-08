import Phaser from 'phaser';

import { Main } from '../scenes';

import Shot from './shot';
import Shooter from './shooter';

export default class ShotGroup {
  scene: Main

  group: Phaser.Physics.Arcade.Group

  fireDelay: number;

  lastFired: number;

  constructor(scene: Main, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig) {
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
      this.scene.sound.play('shotSound');

      if (this.scene.special) {
        const paddingX = (x: number, multiple: number) => x + (10 * multiple);
        const shots: Shot[] = new Array(5).fill(null).map((value, idx) => (
          new Shot(this.scene, paddingX(shooter.x, idx), shooter.y)
        ));

        this.group.addMultiple(shots);

        shots.forEach((shot, idx) => {
          shot.reset(paddingX(shooter.x, idx), shooter.y);
        });
      } else {
        let shot: Shot = this.group.getFirstDead();

        if (!shot) {
          shot = new Shot(this.scene, shooter.x, shooter.y);

          this.group.add(shot);
        }

        shot.reset(shooter.x, shooter.y);
      }

      this.lastFired = time + this.fireDelay;
    }
  }
}
