"use client";

import { useEffect, useRef } from "react";

export default function GameCanvas() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const startGame = async () => {
      const Phaser = (await import("phaser")).default;
      const { default: config } = await import("@/game/config");
      const { MainScene } = await import("@/game/scenes/MainScene");
      
      gameRef.current = new Phaser.Game({
          ...config,
          scene: [MainScene],
        });
    };
        
    startGame();

    return () => {
      gameRef.current?.destroy(true); // Phaser sauber beenden
      gameRef.current = null; // Referenz laden
    };
  }, []);

  return (
    <>
      <div id="game-container"></div>
    </>
  );
}
