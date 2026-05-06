import Phaser from "phaser";
import { Player } from "@/game/entities/Player";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  constructor() {
    super({ key: "MainScene" });
  }
  preload() {
    this.load.spritesheet("idle", "/assets/player/Idle.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("walk", "/assets/player/Walk.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("run", "/assets/player/Run.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    this.player = new Player(this, 400, 300);
    this.add.existing(this.player);
    // this.sys.updateList.add(this.player)
  }
  update() {
    this.player.update();
  }
}
