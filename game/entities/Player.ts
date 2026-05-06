import Phaser from "phaser";

export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    this.setScale(4);

    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 0,
        end: 11,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.play("idle");
  }
}
