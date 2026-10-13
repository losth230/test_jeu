import { describe, it, expect } from "vitest";
import { advanceDay, dailyIncome, setSpeed } from "./simulation";
import { newGame } from "./setup";
import { MONTH_LENGTHS } from "./types";

describe("dailyIncome", () => {
  it("est positif au départ", () => {
    expect(dailyIncome(newGame())).toBeGreaterThan(0);
  });

  it("est plus faible avec une forte agitation", () => {
    const base = newGame();
    const calm = { ...base, realm: { ...base.realm, provinces: base.realm.provinces.map((p) => ({ ...p, unrest: 0 })) } };
    const unrestful = { ...base, realm: { ...base.realm, provinces: base.realm.provinces.map((p) => ({ ...p, unrest: 50 })) } };
    expect(dailyIncome(calm)).toBeGreaterThan(dailyIncome(unrestful));
  });
});

describe("advanceDay", () => {
  it("avance d'un jour", () => {
    const next = advanceDay(newGame());
    expect(next.day).toBe(2);
    expect(next.month).toBe(1);
    expect(next.year).toBe(867);
  });

  it("passe au mois suivant en fin de mois", () => {
    const state = { ...newGame(), day: MONTH_LENGTHS[0] };
    const next = advanceDay(state);
    expect(next.day).toBe(1);
    expect(next.month).toBe(2);
  });

  it("passe à l'année suivante après décembre", () => {
    const state = { ...newGame(), month: 12, day: MONTH_LENGTHS[11] };
    const next = advanceDay(state);
    expect(next.day).toBe(1);
    expect(next.month).toBe(1);
    expect(next.year).toBe(868);
  });

  it("crédite le revenu quotidien dans la trésorerie", () => {
    const state = newGame();
    const before = state.realm.treasury;
    const next = advanceDay(state);
    expect(next.realm.treasury).toBeCloseTo(before + dailyIncome(state), 5);
  });

  it("préserve l'immuabilité (l'état original est inchangé)", () => {
    const state = newGame();
    advanceDay(state);
    expect(state.day).toBe(1);
    expect(state.events.length).toBe(0);
  });
});

describe("setSpeed", () => {
  it("change la vitesse sans toucher au reste", () => {
    const state = newGame();
    const paused = setSpeed(state, 0);
    expect(paused.speed).toBe(0);
    expect(paused.day).toBe(state.day);
  });
});
