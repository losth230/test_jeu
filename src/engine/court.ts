import type { Character, GameState } from "./types";

export type CourtAction = "grant_honor" | "send_gift" | "dismiss";

export interface CourtierView {
  character: Character;
  office: string;
  opinion: number;
  loyalty: number;
}

export interface CourtierState {
  characterId: string;
  office: string;
  opinion: number;
  loyalty: number;
}

export interface Court {
  courtiers: CourtierState[];
}

export function initCourt(characters: Record<string, Character>, rulerId: string): Court {
  const courtiers: CourtierState[] = Object.values(characters)
    .filter((c) => c.id !== rulerId && c.alive)
    .map((c) => ({
      characterId: c.id,
      office: "Conseiller",
      opinion: 25,
      loyalty: 60,
    }));
  return { courtiers };
}

export function applyCourtAction(state: GameState, court: Court, characterId: string, action: CourtAction): { court: Court; cost: number; message: string } {
  const courtiers = court.courtiers.map((c) => ({ ...c }));
  const target = courtiers.find((c) => c.characterId === characterId);
  if (!target) return { court, cost: 0, message: "Personnage introuvable à la cour." };

  switch (action) {
    case "grant_honor":
      target.opinion += 10;
      target.loyalty = Math.min(100, target.loyalty + 8);
      return { court: { courtiers }, cost: 5, message: `Vous honorez ${name(state, characterId)}.` };
    case "send_gift":
      target.opinion += 20;
      target.loyalty = Math.min(100, target.loyalty + 12);
      return { court: { courtiers }, cost: 25, message: `Un présent est remis à ${name(state, characterId)}.` };
    case "dismiss":
      target.opinion -= 30;
      target.loyalty = Math.max(0, target.loyalty - 40);
      return { court: { courtiers }, cost: 0, message: `${name(state, characterId)} est écarté de la cour.` };
  }
}

export function dailyCourtDrift(court: Court, rulerPrestige: number): Court {
  const courtiers = court.courtiers.map((c) => {
    let opinion = c.opinion;
    let loyalty = c.loyalty;
    opinion += loyalty < 30 ? -0.1 : 0.02;
    if (rulerPrestige > 150) opinion += 0.02;
    loyalty += opinion < 20 ? -0.08 : 0.03;
    return {
      ...c,
      opinion: clamp(opinion, -100, 100),
      loyalty: clamp(loyalty, 0, 100),
    };
  });
  return { courtiers };
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function name(state: GameState, id: string): string {
  return state.characters[id]?.name ?? "inconnu";
}
