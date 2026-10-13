import type { GameState } from "./types";

export function newGame(): GameState {
  return {
    year: 867,
    month: 1,
    day: 1,
    speed: 1,
    realm: {
      id: "realm-west-francia",
      name: "Francie Occidentale",
      government: "feudal",
      rulerId: "charles",
      provinces: [
        { id: "paris", name: "Paris", population: 15000, baseTax: 12, unrest: 5, terrain: "plaine", coastal: false },
        { id: "orleans", name: "Orléans", population: 8000, baseTax: 7, unrest: 2, terrain: "plaine", coastal: false },
        { id: "reims", name: "Reims", population: 9000, baseTax: 9, unrest: 8, terrain: "colline", coastal: false },
        { id: "rouen", name: "Rouen", population: 6000, baseTax: 6, unrest: 4, terrain: "côte", coastal: true },
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
