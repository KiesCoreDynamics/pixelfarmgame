import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }
  preload() {
    this.load.spritesheet("player", "/assets/player/Idle.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 11,
      }),
      frameRate: 8,
      repeat: -1,
      skipMissedFrames: false,
    });
    const player = this.add.sprite(400, 300, "player").setScale(2);
    player.play("idle", true);
  }
}
