import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  scene: [],
  pixelArt: true,
  roundPixels: true,
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
};

export default config;
