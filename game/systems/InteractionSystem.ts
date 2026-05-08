import Phaser from "phaser";
import { Player } from "@/game/entities/Player";
import { Tree } from "@/game/entities/Tree";

export class InteractionSystem {
  private scene: Phaser.Scene;
  private player: Player;
  private trees: Tree[];
  private interactionZone: Phaser.GameObjects.Rectangle;
  private nearbyTree: Tree | null = null;
  private eKey: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, player: Player, trees: Tree[]) {
    this.scene = scene;
    this.player = player;
    this.trees = trees;
    this.interactionZone = this.scene.add.rectangle(this.player.x, this.player.y, 16, 16);
    this.scene.physics.add.existing(this.interactionZone);
    this.interactionZone.setAlpha(0);
    this.scene.physics.add.overlap(this.interactionZone, this.trees, (_zone, tree) => {
    //   console.log("tree gesetzt:", tree);
      this.nearbyTree = tree as unknown as Tree;
    });
    this.eKey = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }
  update() {

      this.interactionZone.setPosition(this.player.x, this.player.y);
      
      if (Phaser.Input.Keyboard.JustDown(this.eKey) && this.nearbyTree) {
          (this.nearbyTree as Tree).interact();
        }
        this.nearbyTree = null;
  }
}
