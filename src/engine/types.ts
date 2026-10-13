export type Sex = "male" | "female";

export interface Character {
  id: string;
  name: string;
  dynasty: string;
  bornYear: number;
  sex: Sex;
  alive: boolean;
  gold: number;
  prestige: number;
  traits: string[];
}

export type ProvinceTerrain = "plaine" | "colline" | "montagne" | "côte" | "forêt";

export interface Province {
  id: string;
  name: string;
  population: number;
  baseTax: number;
  unrest: number;
  terrain: ProvinceTerrain;
  coastal: boolean;
}

export type GovernmentType = "tribal" | "feudal" | "imperial" | "theocratic";

export interface Realm {
  id: string;
  name: string;
  government: GovernmentType;
  rulerId: string;
  provinces: Province[];
  treasury: number;
  stability: number;
  legitimacy: number;
}

export type EventSeverity = "info" | "warning" | "crisis";

export interface GameEvent {
  id: string;
  year: number;
  month: number;
  day: number;
  severity: EventSeverity;
  text: string;
}

export type GameSpeed = 0 | 1 | 2 | 3;

export interface GameState {
  year: number;
  month: number;
  day: number;
  speed: GameSpeed;
  realm: Realm;
  characters: Record<string, Character>;
  events: GameEvent[];
  eventSeq: number;
}

export const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
] as const;

export const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;

export function formatGameDate(state: Pick<GameState, "year" | "month" | "day">): string {
  return `${String(state.day).padStart(2, "0")} ${MONTHS[state.month - 1]} ${state.year}`;
}
