import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#2d5a27",
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
