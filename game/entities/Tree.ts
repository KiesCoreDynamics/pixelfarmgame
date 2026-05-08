import Phaser from "phaser";

export class Tree extends Phaser.GameObjects.Container {
  hitpoints: number;
  isDestroyed: boolean;
  treeName: string;

  constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
    super(scene, x, y);
    this.treeName = name;
    this.hitpoints = 3;
    this.isDestroyed = false;

    const frames = [
      { frame: 6, x: 0, y: 0 },
      { frame: 7, x: 16, y: 0 },
      { frame: 22, x: 0, y: 16 },
      { frame: 23, x: 16, y: 16 },
      { frame: 38, x: 0, y: 32 },
      { frame: 39, x: 16, y: 32 },
    ];
    frames.forEach(({ frame, x, y }) => {
      const sprite = new Phaser.GameObjects.Sprite(scene, x, y, "birch-tree", frame);
      this.add(sprite);
    });
  }
  interact() {
    this.hitpoints -= 1;
    console.log(`${this.treeName} getroffen! HP: ${this.hitpoints}`);
    if (this.hitpoints <= 0) {
      this.isDestroyed = true;
      this.destroy();
    }
  }
}
