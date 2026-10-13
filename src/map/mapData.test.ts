import { describe, it, expect } from "vitest";
import { MAP_PROVINCES, MAP_REALMS, MAP_SEAS, realmColor, realmName } from "./mapData";

describe("mapData", () => {
  it("chaque province référence un royaume existant", () => {
    const realmIds = new Set(MAP_REALMS.map((r) => r.id));
    for (const prov of MAP_PROVINCES) {
      expect(realmIds.has(prov.realmId), `province ${prov.id}`).toBe(true);
    }
  });

  it("chaque royaume a au moins une province", () => {
    const used = new Set(MAP_PROVINCES.map((p) => p.realmId));
    for (const realm of MAP_REALMS) {
      expect(used.has(realm.id), `royaume ${realm.id}`).toBe(true);
    }
  });

  it("les ids de provinces sont uniques", () => {
    const ids = MAP_PROVINCES.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("les couleurs sont des hex valides et distinctes par royaume", () => {
    const colors = new Set<string>();
    for (const realm of MAP_REALMS) {
      expect(realm.color).toMatch(/^#[0-9a-f]{6}$/);
      expect(colors.has(realm.color), `doublon ${realm.color}`).toBe(false);
      colors.add(realm.color);
    }
  });

  it("chaque polygone a au moins 3 points dans le cadre", () => {
    for (const prov of MAP_PROVINCES) {
      const pts = prov.points.split(" ").map((p) => p.split(",").map(Number));
      expect(pts.length).toBeGreaterThanOrEqual(3);
      for (const [x, y] of pts) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(900);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(620);
      }
    }
  });

  it("realmColor/realmName gèrent les ids inconnus", () => {
    expect(realmColor("inconnu")).toBe("#999");
    expect(realmName("inconnu")).toBe("Inconnu");
  });

  it("les mers sont nommées de façon unique", () => {
    const ids = MAP_SEAS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
