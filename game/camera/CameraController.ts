import Phaser from "phaser";
import { Player } from "@/game/entities/Player";

export class CameraController {
  private camera: Phaser.Cameras.Scene2D.Camera;
  private player!: Player;
  private scene: Phaser.Scene;
  private isFollowing: boolean = true;
  private toggleKey!: Phaser.Input.Keyboard.Key;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys 

  constructor(camera: Phaser.Cameras.Scene2D.Camera, player: Player, scene: Phaser.Scene, mapWidth: number, mapHeight: number) {
    this.camera = camera;
    this.player = player;
    this.scene = scene;
    this.toggleKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.cursors = this.scene.input.keyboard!.createCursorKeys()
    this.camera.setBounds(0,0, mapWidth, mapHeight)
    this.camera.setZoom(3)
    this.camera.startFollow(this.player)
  }
  startFollow() {
    this.camera.startFollow(this.player);
  }
  stopFollow() {
    this.camera.stopFollow();
  }
  toggle() {
    if (!this.isFollowing) {
      this.isFollowing = true;
      this.startFollow();
    } else {
      this.isFollowing = false;
      this.stopFollow();
    }
  }

  isFollowingPlayer(): boolean {
    return this.isFollowing
  }
  
  update() {
    if (Phaser.Input.Keyboard.JustDown(this.toggleKey)) {
      this.toggle();
    }
    if (!this.isFollowing) {
      const speed = 5;

      if (this.cursors.left.isDown) {
        this.camera.scrollX -= speed;
      }
      if (this.cursors.right.isDown) {
        this.camera.scrollX += speed;
      }
      if (this.cursors.up.isDown) {
        this.camera.scrollY -= speed;
      }
      if (this.cursors.down.isDown) {
        this.camera.scrollY += speed;
      }
    }
  }
}
