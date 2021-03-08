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

  hp: integer;

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
    this.hp = 3;
  }

  pointScore(
    sht: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    this.score += 1;

    if (this.score % 10 === 0) {
      this.level += 1;

      this.targets?.updateDelay(this.level);
      this.targets?.updateVelocity(this.level);
    }

    TargetGroup.collider(sht, tgt);
  }

  loseScore(
    platform: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    this.hp -= 1;

    if (this.hp <= 0) {
      this.scene.stop('Main');
      this.sound.stopAll();
    }

    TargetGroup.collider(undefined, tgt);
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

    const end = this.physics.add.staticImage(0, 920, '').setOrigin(0, 0);
    end.setSize(1280 * 2, 100);

    this.physics.add.collider(
      this.targets.group,
      end,
      this.loseScore,
      undefined,
      this,
    );
  }

  update(time: number):void {
    this.text?.setText(`Score: ${this.score}\nLevel: ${this.level}\nHealth: ${this.hp}`);

    if (this.shooter) {
      this.shooter?.updateInScene(this.cursors);
      this.shots?.updateInScene(time, this.cursors, this.shooter);
    }

    this.targets?.updateInScene(time);
  }
}
