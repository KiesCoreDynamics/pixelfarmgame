import Phaser from "phaser";
import { Player } from "@/game/entities/Player";
import { CameraController } from "@/game/camera/CameraController";
import { Tree } from "../entities/Tree";
import { InteractionSystem } from "../systems/InteractionSystem";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private camera!: CameraController;
  private trees: Tree[] = [];
  private interactionSystem!: InteractionSystem

  constructor() {
    super({ key: "MainScene" });
  }
  preload() {
    this.load.tilemapTiledJSON("map", "/assets/map/farm.tmj");

    this.load.image("grass-spring", "/assets/map/TilesetGrassSpring.png");
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
    this.load.spritesheet("birch-tree", "/assets/objects/BirchTree.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("grass-spring", "grass-spring");
    map.createLayer("ground", tileset!, 0, 0);
    map.createLayer("decoration", tileset!, 0, 0);

    // ? ~~ COLLISION ~~
    const collisionObjects = map.getObjectLayer("collision");
    const collisionGroup = this.physics.add.staticGroup();
    collisionObjects?.objects.forEach((obj) => {
      const rect = this.add.rectangle(obj.x! + obj.width! / 2, obj.y! + obj.height! / 2, obj.width!, obj.height!);
      this.physics.add.existing(rect, true);
      collisionGroup.add(rect);
    });

    // ? ~~ TREES ~~
    const treeObjects = map.getObjectLayer("trees");
    treeObjects?.objects.forEach((treeData) => {
      const tree = new Tree(this, treeData.x!, treeData.y!, treeData.name!);
      this.add.existing(tree);
      this.physics.add.existing(tree);
      (tree.body as Phaser.Physics.Arcade.Body).setSize(9, 14).setOffset(4,26);
      this.trees.push(tree);
      const body = this.add.rectangle(treeData.x! + 8, treeData.y! + 33, 7, 12);
      this.physics.add.existing(body, true);
      collisionGroup.add(body);
    });

    this.player = new Player(this, 640, 480);
    this.add.existing(this.player);
    
    this.physics.add.existing(this.player);
    this.player.setBodySize(8, 4);
    this.player.setOffset(12.25, 22);
    this.physics.add.collider(this.player, collisionGroup);

    this.camera = new CameraController(this.cameras.main, this.player, this, map.widthInPixels, map.heightInPixels);

    this.interactionSystem = new InteractionSystem(this, this.player, this.trees)
  }
  update() {
    this.camera.update();
    if (this.camera.isFollowingPlayer()) {
      this.player.update();
    }
    this.trees.forEach((tree) => {
      tree.depth = tree.y + 32;
    });
    this.player.depth = this.player.y
    this.interactionSystem.update()
  }
}
