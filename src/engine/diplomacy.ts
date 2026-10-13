import type { GameState } from "./types";

export type Relation = "war" | "truce" | "neutral" | "alliance";

export interface BilateralRelation {
  a: string;
  b: string;
  relation: Relation;
  opinion: number;
  sinceYear: number;
}

export interface ForeignRealm {
  id: string;
  name: string;
  aggressiveAI: boolean;
  militaryPower: number;
}

export interface DiplomacyState {
  relations: BilateralRelation[];
  foreignRealms: ForeignRealm[];
}

export function initDiplomacy(playerRealmId: string): DiplomacyState {
  const foreignRealms: ForeignRealm[] = [
    { id: "east-francia", name: "Francie Orientale", aggressiveAI: false, militaryPower: 70 },
    { id: "lotharingia", name: "Lotharingie", aggressiveAI: false, militaryPower: 45 },
    { id: "al-andalus", name: "Al-Andalus", aggressiveAI: true, militaryPower: 80 },
    { id: "danelaw", name: "Danelaw", aggressiveAI: true, militaryPower: 60 },
    { id: "norway", name: "Norvège", aggressiveAI: true, militaryPower: 55 },
    { id: "denmark", name: "Danemark", aggressiveAI: true, militaryPower: 50 },
    { id: "byzantium", name: "Byzance", aggressiveAI: false, militaryPower: 85 },
    { id: "asturias", name: "Asturies", aggressiveAI: false, militaryPower: 35 },
    { id: "brittany", name: "Bretagne", aggressiveAI: false, militaryPower: 25 },
    { id: "papacy", name: "États pontificaux", aggressiveAI: false, militaryPower: 15 },
  ];
  const relations = foreignRealms.map((r) => ({
    a: playerRealmId,
    b: r.id,
    relation: "neutral" as Relation,
    opinion: r.aggressiveAI ? -30 : 10,
    sinceYear: 867,
  }));
  return { relations, foreignRealms };
}

export function findRelation(d: DiplomacyState, realmA: string, realmB: string): BilateralRelation | undefined {
  return d.relations.find((r) => (r.a === realmA && r.b === realmB) || (r.a === realmB && r.b === realmA));
}

export function declareWar(state: GameState, targetRealmId: string): { diplomacy: DiplomacyState; message: string } {
  const relation = findRelation(state.diplomacy, state.realm.id, targetRealmId);
  if (!relation) {
    return { diplomacy: state.diplomacy, message: "Royaume inconnu." };
  }
  if (relation.relation === "war") {
    return { diplomacy: state.diplomacy, message: "La guerre est déjà déclarée." };
  }
  const relations = state.diplomacy.relations.map((r) =>
    r === relation
      ? { ...r, relation: "war" as Relation, opinion: Math.min(r.opinion, -50), sinceYear: state.year }
      : r,
  );
  const target = state.diplomacy.foreignRealms.find((r) => r.id === targetRealmId);
  return {
    diplomacy: { ...state.diplomacy, relations },
    message: `La guerre est déclarée à ${target?.name ?? targetRealmId}.`,
  };
}

export function offerPeace(state: GameState, targetRealmId: string): { diplomacy: DiplomacyState; accepted: boolean; message: string } {
  const relation = findRelation(state.diplomacy, state.realm.id, targetRealmId);
  if (!relation || relation.relation !== "war") {
    return { diplomacy: state.diplomacy, accepted: false, message: "Aucune guerre en cours avec ce royaume." };
  }
  const target = state.diplomacy.foreignRealms.find((r) => r.id === targetRealmId);
  const playerPower = state.realm.provinces.length * 10 + state.realm.treasury * 0.2;
  const acceptChance = target ? Math.min(0.9, playerPower / (target.militaryPower * 1.5)) : 0.5;
  if (Math.random() < acceptChance) {
    const relations = state.diplomacy.relations.map((r) =>
      r === relation
        ? { ...r, relation: "truce" as Relation, opinion: Math.max(r.opinion, -20), sinceYear: state.year }
        : r,
    );
    return {
      diplomacy: { ...state.diplomacy, relations },
      accepted: true,
      message: `${target?.name ?? targetRealmId} accepte la paix.`,
    };
  }
  return {
    diplomacy: state.diplomacy,
    accepted: false,
    message: `${target?.name ?? targetRealmId} rejette votre offre de paix.`,
  };
}

export function dailyAIRaid(state: GameState): { diplomacy: DiplomacyState; message: string | null; damage: number } {
  const raiders = state.diplomacy.foreignRealms.filter(
    (r) => r.aggressiveAI && findRelation(state.diplomacy, state.realm.id, r.id)?.relation === "war",
  );
  if (raiders.length === 0) return { diplomacy: state.diplomacy, message: null, damage: 0 };

  const raider = raiders[Math.floor(Math.random() * raiders.length)];
  if (Math.random() > 0.02) return { diplomacy: state.diplomacy, message: null, damage: 0 };

  const damage = 3 + Math.floor(Math.random() * (raider.militaryPower / 8));
  const target = state.realm.provinces[Math.floor(Math.random() * state.realm.provinces.length)];
  return {
    diplomacy: state.diplomacy,
    message: `Les forces de ${raider.name} ravagent ${target.name} !`,
    damage,
  };
}
