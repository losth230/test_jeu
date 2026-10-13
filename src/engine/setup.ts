import type { GameState } from "./types";
import { advanceMonth } from "./simulation";

function makeInitialState(): GameState {
  return {
    year: 867,
    month: 1,
    realm: {
      id: "realm-west-francia",
      name: "Francie Occidentale",
      government: "feudal",
      rulerId: "charles",
      provinces: [
        { id: "paris", name: "Paris", population: 15000, baseTax: 12, unrest: 5 },
        { id: "orleans", name: "Orléans", population: 8000, baseTax: 7, unrest: 2 },
        { id: "reims", name: "Reims", population: 9000, baseTax: 9, unrest: 8 },
      ],
      treasury: 150,
      stability: 55,
      legitimacy: 50,
    },
    characters: {
      charles: {
        id: "charles",
        name: "Charles le Chauve",
        dynasty: "Karling",
        bornYear: 823,
        sex: "male",
        alive: true,
        gold: 50,
        prestige: 100,
        traits: ["ambitieux", "lettré"],
      },
    },
    events: [],
    eventSeq: 0,
  };
}

export function newGame(): GameState {
  return makeInitialState();
}

export function endTurn(state: GameState): GameState {
  return advanceMonth(state);
}
