import type { GameState } from "./types";

export function newGame(): GameState {
  return {
    year: 867,
    month: 1,
    day: 1,
    speed: 1,
    realm: {
      id: "west-francia",
      name: "Francie Occidentale",
      government: "feudal",
      rulerId: "charles",
      provinces: [
        { id: "ile-de-france", name: "Île-de-France", population: 15000, baseTax: 12, unrest: 5, terrain: "plaine", coastal: false },
        { id: "orleans", name: "Orléanais", population: 8000, baseTax: 7, unrest: 2, terrain: "plaine", coastal: false },
        { id: "champagne", name: "Champagne", population: 9000, baseTax: 9, unrest: 8, terrain: "colline", coastal: false },
        { id: "normandie", name: "Normandie", population: 6000, baseTax: 6, unrest: 4, terrain: "côte", coastal: true },
        { id: "aquitaine", name: "Aquitaine", population: 12000, baseTax: 10, unrest: 3, terrain: "plaine", coastal: false },
        { id: "toulouse", name: "Toulousain", population: 7000, baseTax: 6, unrest: 6, terrain: "colline", coastal: false },
        { id: "bourgogne", name: "Bourgogne", population: 8500, baseTax: 8, unrest: 2, terrain: "forêt", coastal: false },
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
