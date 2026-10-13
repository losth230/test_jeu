import { describe, it, expect } from "vitest";
import { advanceMonth, monthlyIncome } from "./simulation";
import { newGame } from "./setup";

describe("simulation", () => {
  it("calcule un revenu mensuel positif", () => {
    const state = newGame();
    expect(monthlyIncome(state)).toBeGreaterThan(0);
  });

  it("avance la date d'un mois", () => {
    const state = newGame();
    const next = advanceMonth(state);
    expect(next.month).toBe(2);
    expect(next.year).toBe(867);
  });

  it("passe à l'année suivante après décembre", () => {
    const state = { ...newGame(), month: 12, year: 867 };
    const next = advanceMonth(state);
    expect(next.month).toBe(1);
    expect(next.year).toBe(868);
  });

  it("crédite le revenu dans la trésorerie", () => {
    const state = newGame();
    const before = state.realm.treasury;
    const next = advanceMonth(state);
    expect(next.realm.treasury).toBe(before + monthlyIncome(state));
  });
});
