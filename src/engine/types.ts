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

export interface Province {
  id: string;
  name: string;
  population: number;
  baseTax: number;
  unrest: number;
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

export interface GameEvent {
  id: string;
  year: number;
  month: number;
  text: string;
}

export interface GameState {
  year: number;
  month: number;
  realm: Realm;
  characters: Record<string, Character>;
  events: GameEvent[];
  eventSeq: number;
}
