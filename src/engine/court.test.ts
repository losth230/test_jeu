import { describe, it, expect } from "vitest";
import { applyCourtAction, dailyCourtDrift, initCourt, type Court } from "./court";
import { newGame } from "./setup";

function makeCourt(): Court {
  return {
    courtiers: [
      { characterId: "eudes", office: "Conseiller", opinion: 25, loyalty: 60 },
    ],
  };
}

describe("applyCourtAction", () => {
  it("honneur : augmente opinion et loyauté, coûte 5", () => {
    const { court, cost } = applyCourtAction(newGame(), makeCourt(), "eudes", "grant_honor");
    expect(cost).toBe(5);
    expect(court.courtiers[0].opinion).toBe(35);
    expect(court.courtiers[0].loyalty).toBe(68);
  });

  it("don : forte hausse, coûte 25", () => {
    const { court, cost } = applyCourtAction(newGame(), makeCourt(), "eudes", "send_gift");
    expect(cost).toBe(25);
    expect(court.courtiers[0].opinion).toBe(45);
    expect(court.courtiers[0].loyalty).toBe(72);
  });

  it("destitution : baisse forte sans coût", () => {
    const { court, cost } = applyCourtAction(newGame(), makeCourt(), "eudes", "dismiss");
    expect(cost).toBe(0);
    expect(court.courtiers[0].opinion).toBe(-5);
    expect(court.courtiers[0].loyalty).toBe(20);
  });

  it("personnage inconnu : message d'erreur sans changement", () => {
    const original = makeCourt();
    const { court, message } = applyCourtAction(newGame(), original, "ghost", "grant_honor");
    expect(message).toContain("introuvable");
    expect(court).toEqual(original);
  });

  it("la loyauté plafonne à 100", () => {
    const court: Court = { courtiers: [{ characterId: "eudes", office: "Conseiller", opinion: 80, loyalty: 98 }] };
    const result = applyCourtAction(newGame(), court, "eudes", "send_gift").court;
    expect(result.courtiers[0].loyalty).toBe(100);
  });
});

describe("dailyCourtDrift", () => {
  it("un courtisan mécontent se dégrade", () => {
    const court: Court = { courtiers: [{ characterId: "eudes", office: "Conseiller", opinion: 10, loyalty: 25 }] };
    const next = dailyCourtDrift(court, 100);
    expect(next.courtiers[0].opinion).toBeLessThan(10);
    expect(next.courtiers[0].loyalty).toBeLessThan(25);
  });

  it("un courtisan loyal reste stable", () => {
    const court: Court = { courtiers: [{ characterId: "eudes", office: "Conseiller", opinion: 60, loyalty: 70 }] };
    const next = dailyCourtDrift(court, 100);
    expect(next.courtiers[0].opinion).toBeGreaterThan(60);
    expect(next.courtiers[0].loyalty).toBeGreaterThan(70);
  });

  it("les valeurs restent dans les bornes", () => {
    const court: Court = { courtiers: [{ characterId: "eudes", office: "Conseiller", opinion: -100, loyalty: 0 }] };
    const next = dailyCourtDrift(court, 0);
    expect(next.courtiers[0].opinion).toBeGreaterThanOrEqual(-100);
    expect(next.courtiers[0].loyalty).toBeGreaterThanOrEqual(0);
  });
});

describe("initCourt", () => {
  it("exclut le souverain", () => {
    const state = newGame();
    const court = initCourt(state.characters, state.realm.rulerId);
    expect(court.courtiers.find((c) => c.characterId === "charles")).toBeUndefined();
  });
});
