/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

import Background from '../objects/background';
import Shooter from '../objects/shooter';
import Target from '../objects/target';
import TargetGroup from '../objects/targetGroup';
import Shot from '../objects/shot';
import ShotGroup from '../objects/shotGroup';
import SpecialTrigger from '../objects/specialTrigger';

const music = require('url:../../assets/bg.mp3');
const scoreSound = require('url:../../assets/score.mp3');
const shotSound = require('url:../../assets/shot.mp3');
const loseSound = require('url:../../assets/lose.mp3');

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

  specialTrigger: SpecialTrigger | null;

  special: boolean;

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

    this.special = false;
    this.specialTrigger = null;
  }

  pointScore(
    sht: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    this.sound.play('scoreSound');

    this.score += 1;

    if (this.score % 10 === 0) {
      this.level += 1;

      this.targets?.updateDelay(this.level);
      this.targets?.updateVelocity(this.level);
    }

    TargetGroup.collider(sht, tgt);
  }

  loseScore(
    _: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    this.sound.play('loseSound');

    this.hp -= 1;

    if (this.hp <= 0) {
      this.scene.stop('Main');
      this.sound.stopAll();
    }

    TargetGroup.collider(undefined, tgt);
  }

  setSpecial(
    _: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    specialTrigger: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    // @ts-ignore
    specialTrigger.setVelocityY(0);
    // @ts-ignore
    specialTrigger.setPosition(Phaser.Math.Between(50, 1230), -100);

    this.special = true;
    this.shooter?.setTint(0x0000ff);

    setTimeout(() => {
      this.special = false;
      this.shooter?.clearTint();
    }, 5000);
  }

  preload(): void {
    Background.loadInScene(this);
    Shooter.loadInScene(this);
    Target.loadInScene(this);
    Shot.loadInScene(this);

    this.load.audio('music', [music]);
    this.load.audio('scoreSound', [scoreSound]);
    this.load.audio('shotSound', [shotSound]);
    this.load.audio('loseSound', [loseSound]);
  }

  create(): void {
    // Sound
    this.sound.play('music', {
      loop: true,
      volume: 0.5,
    });

    // Background
    this.bg = new Background(this);

    this.text = this.add.text(100, 100, '...');

    // Game Objects
    this.shooter = new Shooter(this);
    this.targets = new TargetGroup(this);
    this.shots = new ShotGroup(this);

    // Inputs
    this.cursors = this.input.keyboard.createCursorKeys();

    // Physics and colliders
    const end = this.physics.add.staticImage(0, 780, '').setOrigin(0, 0);
    end.setSize(1280 * 2, 100);

    this.physics.add.overlap(
      this.shots.group,
      this.targets.group,
      this.pointScore,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.targets.group,
      end,
      this.loseScore,
      undefined,
      this,
    );

    // Spcecial event
    this.specialTrigger = new SpecialTrigger(this, Phaser.Math.Between(50, 1230), -100);
    this.time.addEvent({
      delay: Phaser.Math.Between(8000, 35000),
      loop: true,
      callback: () => {
        if (!this.special) {
          this.specialTrigger?.setVelocityY(300);
        }
      },
      callbackScope: this,
    });
    this.physics.add.overlap(
      this.shooter,
      this.specialTrigger,
      this.setSpecial,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.specialTrigger,
      end,
      (specialTrigger) => {
        // @ts-ignore
        specialTrigger.setVelocityY(0);
        // @ts-ignore
        specialTrigger.setPosition(Phaser.Math.Between(50, 1230), -100);
      },
      undefined,
      this,
    );
  }

  update(time: number):void {
    this.text?.setText(`\n\n💘: ${this.score}\n\n\n⭐: ${this.level}\n\n\n💔: ${this.hp}`);

    if (this.shooter) {
      this.shooter?.updateInScene(this.cursors);
      this.shots?.updateInScene(time, this.cursors, this.shooter);
    }

    this.targets?.updateInScene(time);
  }
}
