// components/Game.tsx
"use client";

import { useEffect, useRef } from "react";
import type { Game as PhaserGame } from "phaser";

export default function Game() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserInstance = useRef<PhaserGame | null>(null);

  useEffect(() => {
    // Wir deklarieren eine interne Variable, um Race-Conditions zu vermeiden
    let isMounted = true;

    async function initPhaser() {
      const Phaser = (await import("phaser")).default;
      const { MainScene } = await import("@/game/scenes/MainScene");

      if (!isMounted || !gameRef.current) return;

      // Falls schon ein Spiel existiert (Double-Invoke Schutz)
      if (phaserInstance.current) {
        phaserInstance.current.destroy(true);
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current!,
        backgroundColor: "#1a1a1a",
        pixelArt: true,
        roundPixels: true,

        fps: {
          target: 60,
          forceSetTimeOut: true,
        },

        scene: MainScene,
      };

      phaserInstance.current = new Phaser.Game(config);
    }

    initPhaser();

    return () => {
      isMounted = false;
      if (phaserInstance.current) {
        phaserInstance.current.destroy(true);
        phaserInstance.current = null;
      }
    };
  }, []);

  return <div ref={gameRef} style={{ width: "800px", height: "600px" }} />;
}
