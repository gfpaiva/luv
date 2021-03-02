import Phaser from 'phaser';

export class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  create():void {
    this.add.circle(200, 200, 80, 0x6666ff);
  }
}
