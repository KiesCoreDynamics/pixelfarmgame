import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private direction: string = "down";
  private isMoving: boolean = false;
  private isRunning: boolean = false;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasd!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  // ? ++++++ MOVEMENT-HANDLER ++++++

  private handleMovement() {
    this.setVelocity(0, 0);
    this.isRunning = this.cursors.shift.isDown;
    const speed = this.isRunning ? 180 : 90;
    this.isMoving = false;

    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const up = this.cursors.up.isDown || this.wasd.up.isDown;
    const down = this.cursors.down.isDown || this.wasd.down.isDown;

    const velocity = new Phaser.Math.Vector2(0, 0);

    if (Phaser.Input.Keyboard.JustDown(this.wasd.left) || Phaser.Input.Keyboard.JustDown(this.cursors.left))
      this.direction = "left";
    if (Phaser.Input.Keyboard.JustDown(this.wasd.right) || Phaser.Input.Keyboard.JustDown(this.cursors.right))
      this.direction = "right";
    if (Phaser.Input.Keyboard.JustDown(this.wasd.up) || Phaser.Input.Keyboard.JustDown(this.cursors.up))
      this.direction = "up";
    if (Phaser.Input.Keyboard.JustDown(this.wasd.down) || Phaser.Input.Keyboard.JustDown(this.cursors.down))
      this.direction = "down";

    if (up && !down) {
      velocity.y = -1;
      // this.direction = "up";
      this.isMoving = true;
    } else if (down && !up) {
      velocity.y = 1;
      // this.direction = "down";
      this.isMoving = true;
    }
    if (left && !right) {
      velocity.x = -1;
      this.isMoving = true;
      // this.direction = "left";
    } else if (right && !left) {
      velocity.x = 1;
      // this.direction = "right";
      this.isMoving = true;
    }

    velocity.normalize();
    this.setVelocity(velocity.x * speed, velocity.y * speed);
  }

  // ? ++++++ ANIMATION_HANDLER ++++++

  private handleAnimation() {
    // ? == IDLE CHECK ===
    if (!this.isMoving) {
      switch (this.direction) {
        case "up":
          if (this.anims.currentAnim?.key !== "idle-up") {
            this.play("idle-up");
          }
          break;
        case "down":
          if (this.anims.currentAnim?.key !== "idle-down") {
            this.play("idle-down");
          }
          break;
        case "right":
          if (this.anims.currentAnim?.key !== "idle-right") {
            this.play("idle-right");
          }
          this.setFlipX(false);
          break;
        case "left":
          if (this.anims.currentAnim?.key !== "idle-right") {
            this.play("idle-right");
          }
          this.setFlipX(true);
          break;
      }
    }
    // ? === WALK/RUN-CHECK ===
    else {
      switch (this.direction) {
        case "up":
          if (this.isRunning) {
            if (this.anims.currentAnim?.key !== "run-up") this.play("run-up");
          } else {
            if (this.anims.currentAnim?.key !== "walk-up") {
              this.play("walk-up");
            }
          }
          break;
        case "down":
          if (this.isRunning) {
            if (this.anims.currentAnim?.key !== "run-down") this.play("run-down");
          } else if (this.anims.currentAnim?.key !== "walk-down") {
            this.play("walk-down");
          }
          break;
        case "right":
          if (this.isRunning) {
            if (this.anims.currentAnim?.key !== "run-right") this.play("run-right");
          } else if (this.anims.currentAnim?.key !== "walk-right") {
            this.play("walk-right");
          }
          this.setFlipX(false);
          break;
        case "left":
          if (this.isRunning) {
            if (this.anims.currentAnim?.key !== "run-right") this.play("run-right");
          } else if (this.anims.currentAnim?.key !== "walk-right") {
            this.play("walk-right");
          }
          this.setFlipX(true);
          break;
      }
    }
  }

  // ? ++++++ CONSTRUCTOR ++++++

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "idle");

    this.setScale(0.5);

    // ? === CREATE "IDLE" ===
    scene.anims.create({
      key: "idle-down",
      frames: scene.anims.generateFrameNumbers("idle", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "idle-up",
      frames: scene.anims.generateFrameNumbers("idle", { start: 4, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "idle-right",
      frames: scene.anims.generateFrameNumbers("idle", { start: 8, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });

    // ? === CREATE "WALK" ===

    scene.anims.create({
      key: "walk-down",
      frames: scene.anims.generateFrameNumbers("walk", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk-up",
      frames: scene.anims.generateFrameNumbers("walk", { start: 6, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk-right",
      frames: scene.anims.generateFrameNumbers("walk", { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1,
    });

    // ? === CREATE "RUN" ===

    scene.anims.create({
      key: "run-down",
      frames: scene.anims.generateFrameNumbers("run", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "run-up",
      frames: scene.anims.generateFrameNumbers("run", {
        start: 8,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "run-right",
      frames: scene.anims.generateFrameNumbers("run", {
        start: 16,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // ? === CREATE CURSOR/WASD-KEYS ===

    this.cursors = this.scene.input.keyboard!.createCursorKeys();
    this.wasd = {
      up: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }
  update() {
    this.handleMovement();
    this.handleAnimation();
  }
}
