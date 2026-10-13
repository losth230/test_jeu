import type { GameState } from "./types";

export const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
] as const;

export function monthlyIncome(state: GameState): number {
  const { realm } = state;
  const tax = realm.provinces.reduce((sum, p) => sum + p.baseTax, 0);
  const unrestPenalty = realm.provinces.reduce(
    (sum, p) => sum + (p.unrest * 0.01 * p.baseTax),
    0,
  );
  const stabilityFactor = 0.5 + realm.stability * 0.005;
  return Math.max(0, Math.round((tax - unrestPenalty) * stabilityFactor));
}

export function advanceMonth(state: GameState): GameState {
  const month = state.month + 1;
  const year = month > 12 ? state.year + 1 : state.year;
  const normalizedMonth = month > 12 ? 1 : month;

  const realm = {
    ...state.realm,
    treasury: state.realm.treasury + monthlyIncome(state),
  };

  const characters = { ...state.characters };
  const ruler = characters[realm.rulerId];
  if (ruler) {
    const prestigeGain = realm.stability >= 60 ? 1 : 0;
    characters[ruler.id] = { ...ruler, prestige: ruler.prestige + prestigeGain };
  }

  const events = [...state.events];
  let eventSeq = state.eventSeq;
  const rand = Math.random();
  if (rand < 0.15) {
    eventSeq += 1;
    events.unshift({
      id: `evt-${eventSeq}`,
      year,
      month: normalizedMonth,
      text: "Une mauvaise récolte inquiète les paysans de vos terres.",
    });
  } else if (rand < 0.25) {
    eventSeq += 1;
    events.unshift({
      id: `evt-${eventSeq}`,
      year,
      month: normalizedMonth,
      text: "Un rassemblement de Vikings est signalé sur les côtes.",
    });
  }

  return {
    ...state,
    year,
    month: normalizedMonth,
    realm,
    characters,
    events: events.slice(0, 50),
    eventSeq,
  };
}
