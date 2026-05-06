import Phaser from "phaser";
import { Player } from "@/game/entities/Player";

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
    this.add.existing(new Player(this, 400, 300));
  
  }
}
