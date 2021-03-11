import Phaser from 'phaser';

import { center } from '../config';

export class Loading {
  scene: Phaser.Scene

  barWidth: number

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.barWidth = 270;
  }

  progress(): void {
    const progressBar = this.scene.add.graphics();
    const progressBox = this.scene.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(center - (this.barWidth / 2), this.barWidth, 320, 50);

    this.scene.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(center - (this.barWidth / 2) + 10, this.barWidth + 10, 300 * value, 30);
    });

    this.scene.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });
  }
}
