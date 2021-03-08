import Phaser from 'phaser';

import { Main } from '../scenes';
import Target from './target';

export default class TargetGroup {
  scene: Main;

  group: Phaser.Physics.Arcade.Group;

  targetsDelay: number;

  lastTarget: number;

  constructor(scene: Main, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      classType: Target,
      runChildUpdate: true,
      ...config,
    });

    this.targetsDelay = 1000;
    this.lastTarget = 0;
  }

  collider(
    shot: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    console.log('🚀 ~ file: targetGroup.ts ~ line 38 ~ TargetGroup ~ this.scene', this.scene);
    shot.destroy();
    tgt.destroy();
  }

  updateInScene(time: number): void {
    if (time > this.lastTarget) {
      const target = this.group.create(Phaser.Math.Between(50, 1870), 0);

      target.setVelocityY(Phaser.Math.Between(0, 500), 20);
      target.allowGravity = false;

      this.lastTarget = time + this.targetsDelay;
    }
  }
}
