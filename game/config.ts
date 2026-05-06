import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  parent: "game-container",
  scene: [],
  pixelArt: true,
  roundPixels: true,
  zoom: 1,
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
};

export default config;
