import Phaser from 'phaser';

import { Target } from './target';

import {
  displayXRange,
  displayHiddenTop,
} from '../config';

export class TargetGroup {
  scene: Phaser.Scene;

  group: Phaser.Physics.Arcade.Group;

  targetsDelay: integer;

  lastTarget: number;

  velocity: number[];

  constructor(scene: Phaser.Scene, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      classType: Target,
      runChildUpdate: true,
      ...config,
    });

    this.targetsDelay = 1800;
    this.lastTarget = 0;

    this.velocity = [50, 60];
  }

  static collider(
    shot?: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt?: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    shot?.destroy();
    tgt?.destroy();
  }

  updateDelay(level: integer): void {
    if (level <= 10) {
      this.targetsDelay = 1800 - (145 * level);
    }
  }

  updateVelocity(level: integer): void {
    let [initial, final] = this.velocity;

    initial = 50 + (level * 25);
    final = 60 + (level * 35);

    this.velocity = [initial, final];
  }

  updateInScene(time: number): void {
    let target: any;
    const [initialX, finalX] = displayXRange;

    if (time > this.lastTarget) {
      if (!target) {
        target = this.group.create(
          Phaser.Math.Between(initialX, finalX),
          displayHiddenTop,
        );
      }

      target.setVelocityY(Phaser.Math.Between(this.velocity[0], this.velocity[1]));
      target.allowGravity = false;

      this.lastTarget = time + this.targetsDelay;
    }
  }
}
