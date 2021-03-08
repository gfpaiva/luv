/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

import Background from '../objects/background';
import Shooter from '../objects/shooter';
import Target from '../objects/target';
import TargetGroup from '../objects/targetGroup';
import Shot from '../objects/shot';
import ShotGroup from '../objects/shotGroup';

const music = require('url:../../assets/bg.mp3');

export class Main extends Phaser.Scene {
  bg: Background | null;

  shooter: Shooter | null;

  targets: TargetGroup | null;

  shots: ShotGroup | null;

  text: Phaser.GameObjects.Text | null;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  level: integer;

  score: integer;

  constructor() {
    super('Main');

    this.bg = null;
    this.shooter = null;
    this.targets = null;
    this.shots = null;
    this.text = null;

    this.cursors = this.input?.keyboard?.createCursorKeys();

    this.level = 1;
    this.score = 0;
  }

  pointScore(
    sht: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    this.score += 1;

    if (this.score % 10 === 0) {
      this.level += 1;
    }

    this.targets?.collider(sht, tgt);
  }

  preload(): void {
    Background.loadInScene(this);
    Shooter.loadInScene(this);
    Target.loadInScene(this);
    Shot.loadInScene(this);

    this.load.audio('music', [music]);
  }

  create(): void {
    this.sound.play('music', {
      loop: true,
      volume: 0.2,
    });

    this.bg = new Background(this);

    this.text = this.add.text(100, 100, '...');

    this.shooter = new Shooter(this);

    this.targets = new TargetGroup(this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.shots = new ShotGroup(this);

    this.physics.add.overlap(
      this.shots.group,
      this.targets.group,
      this.pointScore,
      undefined,
      this,
    );
  }

  update(time: number):void {
    this.text?.setText(`Score: ${this.score}\nLevel: ${this.level}`);

    if (this.shooter) {
      this.shooter?.updateInScene(this.cursors);
      this.shots?.updateInScene(time, this.cursors, this.shooter);
    }

    this.targets?.updateInScene(time);
  }
}
