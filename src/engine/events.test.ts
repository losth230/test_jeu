import { describe, it, expect } from "vitest";
import { applyDecision, rollDecision, type Decision } from "./events";
import { newGame } from "./setup";

describe("rollDecision", () => {
  it("retourne une décision cohérente", () => {
    for (let i = 0; i < 100; i++) {
      const d = rollDecision();
      if (d) {
        expect(d.options.length).toBeGreaterThanOrEqual(2);
        expect(d.title.length).toBeGreaterThan(0);
        expect(d.description.length).toBeGreaterThan(0);
      }
    }
  });

  it("produit différentes décisions sur de nombreux tirages", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 500; i++) {
      const d = rollDecision();
      if (d) ids.add(d.id);
    }
    expect(ids.size).toBeGreaterThanOrEqual(3);
  });
});

describe("applyDecision", () => {
  const decision: Decision = {
    id: "test",
    title: "Événement de test",
    description: "desc",
    options: [
      { label: "Coûteux", treasuryDelta: -30, stabilityDelta: 5, unrestDelta: -8, outcome: "effet complet" },
      { label: "Gratuit", outcome: "rien" },
    ],
  };

  it("applique tous les effets du choix", () => {
    const state = newGame();
    const { state: next, outcome } = applyDecision(state, decision, 0);
    expect(outcome).toBe("effet complet");
    expect(next.realm.treasury).toBe(state.realm.treasury - 30);
    expect(next.realm.stability).toBe(state.realm.stability + 5);
    const maxUnrestBefore = Math.max(...state.realm.provinces.map((p) => p.unrest));
    const sameProvinceAfter = next.realm.provinces.find(
      (p) => p.unrest === maxUnrestBefore - 8,
    );
    expect(sameProvinceAfter).toBeDefined();
  });

  it("un choix sans effet ne change pas le royaume", () => {
    const state = newGame();
    const { state: next } = applyDecision(state, decision, 1);
    expect(next.realm.treasury).toBe(state.realm.treasury);
    expect(next.realm.stability).toBe(state.realm.stability);
  });

  it("ajoute l'issue à la chronique", () => {
    const state = newGame();
    const { state: next } = applyDecision(state, decision, 0);
    expect(next.events[0].text).toContain("Événement de test");
    expect(next.events[0].text).toContain("effet complet");
    expect(next.eventSeq).toBe(state.eventSeq + 1);
  });

  it("la trésorerie ne descend pas sous zéro", () => {
    const state = { ...newGame(), realm: { ...newGame().realm, treasury: 5 } };
    const { state: next } = applyDecision(state, decision, 0);
    expect(next.realm.treasury).toBe(0);
  });

  it("index invalide : aucun changement", () => {
    const state = newGame();
    const { state: next, outcome } = applyDecision(state, decision, 99);
    expect(outcome).toBe("Choix invalide.");
    expect(next).toBe(state);
  });
});
