/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';

import {
  displayHiddenBottom,
  displayPadding,
  levelUpScore,
  specialDelay,
  specialShotDuration,
  width,
} from '../config';

import {
  Background,
  Shooter,
  Target,
  TargetGroup,
  Shot,
  ShotGroup,
  SpecialTrigger,
} from '../objects';

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

  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;

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

    this.cursors = null;

    this.level = 1;
    this.score = 0;
    this.hp = 1;

    this.special = false;
    this.specialTrigger = null;
  }

  pointScore(
    sht: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    this.sound.play('scoreSound');

    this.score += 1;

    if (this.score % levelUpScore === 0) {
      this.level += 1;

      this.targets?.updateDelay(this.level);
      this.targets?.updateVelocity(this.level);
    }

    TargetGroup.collider(sht, tgt);
  }

  gameover(): void {
    this.cursors = null;
    this.input.keyboard.clearCaptures();
    this.scene.stop('Main');
    this.sound.stopAll();

    const gameContainer = document.getElementById('game-container');
    const gameover = document.getElementById('gameover');
    const score = document.getElementById('score');

    if (score) {
      score.textContent = `${this.score}`;
    }

    gameContainer?.classList.add('hide');
    gameover?.classList.remove('hide');
  }

  loseScore(
    _: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    tgt: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    this.sound.play('loseSound');

    this.hp -= 1;

    if (this.hp <= 0) {
      this.gameover();
    }

    TargetGroup.collider(undefined, tgt);
  }

  setSpecial(): void {
    this.specialTrigger?.resetPosition();

    this.special = true;
    this.shooter?.updateTexture(this.special);

    setTimeout(() => {
      this.special = false;
      this.shooter?.updateTexture(this.special);
    }, specialShotDuration);
  }

  preload(): void {
    Background.loadInScene(this);
    Shooter.loadInScene(this);
    Target.loadInScene(this);
    Shot.loadInScene(this);
    SpecialTrigger.loadInScene(this);

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

    // Display texts
    this.text = this.add.text(displayPadding, displayPadding, '...');

    // Keyboard inputs
    this.cursors = this.input.keyboard.createCursorKeys();

    // Game Objects
    this.shooter = new Shooter(this);
    this.targets = new TargetGroup(this);
    this.shots = new ShotGroup(this);

    // Inputs
    this.cursors = this.input.keyboard.createCursorKeys();

    // Physics and colliders
    const end = this.physics.add.staticImage(0, displayHiddenBottom, '').setOrigin(0, 0);
    end.setSize(width * 2, 100);

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
    const [initialDelay, finalDelay] = specialDelay;
    this.specialTrigger = new SpecialTrigger(this);
    this.time.addEvent({
      delay: Phaser.Math.Between(initialDelay, finalDelay),
      loop: true,
      callback: () => {
        if (!this.special) {
          this.specialTrigger?.trigger();
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
      () => {
        this.specialTrigger?.resetPosition();
      },
      undefined,
      this,
    );
  }

  update(time: number):void {
    this.text?.setText(`
    💘: ${this.score}

    ⭐: ${this.level}

    💔: ${this.hp}
    `);

    if (this.shooter && this.cursors) {
      this.shooter?.updateInScene(this.cursors);
      this.shots?.updateInScene(time, this.cursors, this.shooter);
    }

    this.targets?.updateInScene(time);
  }
}
