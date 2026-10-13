import { useEffect } from "react";
import { advanceDay, SPEED_MS_PER_DAY } from "../engine/simulation";
import type { GameState } from "../engine/types";

export function useGameClock(
  state: GameState,
  setState: (updater: (prev: GameState) => GameState) => void,
) {
  const speed = state.speed;
  useEffect(() => {
    if (speed === 0) return;
    const interval = SPEED_MS_PER_DAY[speed];
    const id = window.setInterval(() => {
      setState((prev) => advanceDay(prev));
    }, interval);
    return () => window.clearInterval(id);
  }, [speed, setState]);
}
