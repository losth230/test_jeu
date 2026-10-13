import { describe, it, expect } from "vitest";
import { declareWar, dailyAIRaid, findRelation, initDiplomacy, offerPeace } from "./diplomacy";
import { newGame } from "./setup";

function stateWithDiplomacy() {
  const state = newGame();
  return { ...state, diplomacy: initDiplomacy(state.realm.id) };
}

describe("initDiplomacy", () => {
  it("crée une relation pour chaque royaume étranger", () => {
    const d = initDiplomacy("west-francia");
    expect(d.relations.length).toBe(d.foreignRealms.length);
    expect(d.relations.every((r) => r.a === "west-francia")).toBe(true);
  });

  it("les royaumes agressifs commencent avec une opinion négative", () => {
    const d = initDiplomacy("west-francia");
    const norway = d.relations.find((r) => r.b === "norway");
    expect(norway?.opinion).toBeLessThan(0);
  });
});

describe("findRelation", () => {
  it("trouve la relation dans les deux sens", () => {
    const d = initDiplomacy("west-francia");
    expect(findRelation(d, "west-francia", "denmark")).toBeDefined();
    expect(findRelation(d, "denmark", "west-francia")).toBeDefined();
    expect(findRelation(d, "west-francia", "atlantis")).toBeUndefined();
  });
});

describe("declareWar", () => {
  it("passe la relation en guerre et plombe l'opinion", () => {
    const state = stateWithDiplomacy();
    const { diplomacy, message } = declareWar(state, "denmark");
    expect(message).toContain("guerre");
    const rel = findRelation(diplomacy, "west-francia", "denmark");
    expect(rel?.relation).toBe("war");
    expect(rel?.opinion).toBeLessThanOrEqual(-50);
  });

  it("refuse une double déclaration", () => {
    let state = stateWithDiplomacy();
    state = { ...state, diplomacy: declareWar(state, "denmark").diplomacy };
    const { message, diplomacy } = declareWar(state, "denmark");
    expect(message).toContain("déjà");
    expect(findRelation(diplomacy, "west-francia", "denmark")?.relation).toBe("war");
  });

  it("royaume inconnu", () => {
    const state = stateWithDiplomacy();
    expect(declareWar(state, "atlantis").message).toContain("inconnu");
  });
});

describe("offerPeace", () => {
  it("refuse la paix sans guerre en cours", () => {
    const state = stateWithDiplomacy();
    const result = offerPeace(state, "denmark");
    expect(result.accepted).toBe(false);
    expect(result.message).toContain("Aucune guerre");
  });

  it("aboutit à une trêve quand acceptée", () => {
    let state = stateWithDiplomacy();
    state = { ...state, diplomacy: declareWar(state, "asturias").diplomacy };
    const result = offerPeace(state, "asturias");
    if (result.accepted) {
      const rel = findRelation(result.diplomacy, "west-francia", "asturias");
      expect(rel?.relation).toBe("truce");
      expect(rel?.opinion).toBeGreaterThanOrEqual(-20);
    } else {
      expect(result.message).toContain("rejette");
    }
  });
});

describe("dailyAIRaid", () => {
  it("aucun raid sans guerre", () => {
    const state = stateWithDiplomacy();
    const result = dailyAIRaid(state);
    expect(result.message).toBeNull();
    expect(result.damage).toBe(0);
  });

  it("en guerre, un raid éventuel endommage une province", () => {
    let state = stateWithDiplomacy();
    state = { ...state, diplomacy: declareWar(state, "norway").diplomacy };
    let sawRaid = false;
    for (let i = 0; i < 2000 && !sawRaid; i++) {
      const result = dailyAIRaid(state);
      if (result.message) {
        sawRaid = true;
        expect(result.damage).toBeGreaterThan(0);
        expect(result.message).toContain("Norvège");
      }
    }
    expect(sawRaid).toBe(true);
  });
});
