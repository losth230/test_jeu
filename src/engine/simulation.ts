import { dailyCourtDrift } from "./court";
import { dailyAIRaid } from "./diplomacy";
import {
  MONTH_LENGTHS,
  type GameSpeed,
  type GameState,
} from "./types";

export function dailyIncome(state: GameState): number {
  const { realm } = state;
  const monthlyTax = realm.provinces.reduce((sum, p) => sum + p.baseTax, 0);
  const unrestPenalty = realm.provinces.reduce(
    (sum, p) => sum + (p.unrest * 0.01 * p.baseTax),
    0,
  );
  const stabilityFactor = 0.5 + realm.stability * 0.005;
  const monthly = Math.max(0, (monthlyTax - unrestPenalty) * stabilityFactor);
  return monthly / MONTH_LENGTHS[state.month - 1];
}

export function advanceDay(state: GameState): GameState {
  const day = state.day + 1;
  const overflowMonth = day > MONTH_LENGTHS[state.month - 1];
  const month = overflowMonth ? state.month + 1 : state.month;
  const year = month > 12 ? state.year + 1 : state.year;
  const normalizedMonth = month > 12 ? 1 : month;
  const normalizedDay = overflowMonth ? 1 : day;

  const realm = {
    ...state.realm,
    treasury: state.realm.treasury + dailyIncome(state),
  };

  const characters = { ...state.characters };
  const ruler = characters[realm.rulerId];
  let rulerPrestige = 0;
  if (ruler) {
    const prestigeGain = realm.stability >= 60 ? 0.05 : 0;
    rulerPrestige = ruler.prestige + prestigeGain;
    characters[ruler.id] = { ...ruler, prestige: rulerPrestige };
  }
  const court = dailyCourtDrift(state.court, rulerPrestige);

  const raid = dailyAIRaid(state);
  let realmAfterRaid = realm;
  if (raid.damage > 0) {
    realmAfterRaid = {
      ...realmAfterRaid,
      treasury: Math.max(0, realmAfterRaid.treasury - raid.damage * 2),
    };
  }

  const events = [...state.events];
  let eventSeq = state.eventSeq;
  if (raid.message) {
    eventSeq += 1;
    events.unshift({
      id: `evt-${eventSeq}`,
      year,
      month: normalizedMonth,
      day: normalizedDay,
      severity: "crisis",
      text: raid.message,
    });
  }
  const rand = Math.random();
  const at = { year, month: normalizedMonth, day: normalizedDay };
  if (rand < 0.005) {
    eventSeq += 1;
    events.unshift({
      id: `evt-${eventSeq}`,
      ...at,
      severity: "warning",
      text: "Une mauvaise récolte inquiète les paysans de vos terres.",
    });
  } else if (rand < 0.008) {
    eventSeq += 1;
    events.unshift({
      id: `evt-${eventSeq}`,
      ...at,
      severity: "crisis",
      text: "Des navires nordiques sont signalés près de vos côtes.",
    });
  }

  return {
    ...state,
    year,
    month: normalizedMonth,
    day: normalizedDay,
    realm: realmAfterRaid,
    characters,
    court,
    diplomacy: raid.diplomacy,
    events: events.slice(0, 50),
    eventSeq,
  };
}

export function setSpeed(state: GameState, speed: GameSpeed): GameState {
  return { ...state, speed };
}

export const SPEED_MS_PER_DAY: Record<GameSpeed, number> = {
  0: Infinity,
  1: 2000,
  2: 1000,
  3: 400,
};
