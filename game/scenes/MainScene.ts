import Phaser from "phaser";
import { Player } from "@/game/entities/Player";
import { CameraController } from "@/game/camera/CameraController";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private camera!: CameraController;

  constructor() {
    super({ key: "MainScene" });
  }
  preload() {
    this.load.tilemapTiledJSON("map", "/assets/map/farm.tmj");

    this.load.image("grass-spring", "/assets/map/Tileset Grass Spring.png");
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
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("grass-spring", "grass-spring");
    map.createLayer("ground", tileset!, 0, 0);
    // map.createLayer("decoration", tileset!, 0, 0);

    const decorationLayer = map.createLayer("decoration", tileset!, 0, 0);
    decorationLayer!.setCollisionByExclusion([-1]);

    this.player = new Player(this, 640, 480);
    this.add.existing(this.player);
    this.physics.add.existing(this.player);
    this.player.setBodySize(8, 4);
    this.player.setOffset(12, 20);
    this.physics.add.collider(this.player, decorationLayer);

    this.camera = new CameraController(this.cameras.main, this.player, this, map.widthInPixels, map.heightInPixels);
  }
  update() {
    // this.player.update();
    this.camera.update();
    if (this.camera.isFollowingPlayer()) {
      this.player.update();
    }
  }
}
