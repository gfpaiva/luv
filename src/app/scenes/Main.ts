import Phaser from 'phaser';

import Background from '../objects/background';
import Shooter from '../objects/shooter';
import Shot from '../objects/shot';
import ShotGroup from '../objects/shotGroup';

export class Main extends Phaser.Scene {
  bg: Background | null;

  shooter: Shooter | null;

  shots: ShotGroup | null;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('Main');

    this.bg = null;
    this.shooter = null;
    this.shots = null;
    this.cursors = this.input?.keyboard?.createCursorKeys();
  }

  preload(): void {
    Background.loadInScene(this);
    Shooter.loadInScene(this);
    Shot.loadInScene(this);
  }

  create(): void {
    this.bg = new Background(this);
    this.shooter = new Shooter(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shots = new ShotGroup(this, {
      classType: Shot,
      runChildUpdate: true,
      allowGravity: false,
      maxSize: 40,
    });
  }

  update(time: number):void {
    if (this.shooter) {
      this.shooter?.updateInScene(this.cursors);
      this.shots?.updateInScene(time, this.cursors, this.shooter);
    }
  }
}
