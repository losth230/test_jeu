import type { GameState } from "./types";

export interface DecisionOption {
  label: string;
  treasuryDelta?: number;
  stabilityDelta?: number;
  unrestDelta?: number;
  outcome: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  options: DecisionOption[];
}

interface DecisionTemplate {
  id: string;
  title: string;
  description: string;
  weight: number;
  options: DecisionOption[];
}

const TEMPLATES: DecisionTemplate[] = [
  {
    id: "viking-raid",
    title: "Raid viking sur les côtes",
    description: "Des drakkars ont été aperçus à l'embouchure de la Seine. Les abbayes demandent protection, les paysans fuient vers les villes.",
    weight: 3,
    options: [
      { label: "Payer le danegeld (30 livres)", treasuryDelta: -30, stabilityDelta: -5, outcome: "Vous payez les Vikings. Ils repartent… cette fois." },
      { label: "Lever les hommes d'armes", stabilityDelta: 5, unrestDelta: 4, outcome: "Les nobles répondent à l'appel, mais les campagnes pâtissent de la mobilisation." },
      { label: "Ignorer", treasuryDelta: -10, stabilityDelta: -10, outcome: "Les raiders pillent librement. Votre popularité en souffre." },
    ],
  },
  {
    id: "bad-harvest",
    title: "Mauvaise récolte",
    description: "Les greniers sont à moitié vides. Les prix du blé montent, les rumeurs de famine grandissent dans les bourgs.",
    weight: 2,
    options: [
      { label: "Ouvrir les greniers royaux (20 livres)", treasuryDelta: -20, unrestDelta: -5, outcome: "Le peuple bénit votre nom, les caisses saignent." },
      { label: "Laisser le marché agir", unrestDelta: 6, outcome: "Les marchands s'enrichissent, les paysans grognent." },
    ],
  },
  {
    id: "bishop-request",
    title: "Requête de l'évêque",
    description: "L'archevêque de Reims sollicite une dotation pour restaurer sa cathédrale — et rappelle son soutien à votre couronne.",
    weight: 2,
    options: [
      { label: "Accorder la dotation (15 livres)", treasuryDelta: -15, stabilityDelta: 4, outcome: "L'Église chante vos louanges." },
      { label: "Refuser poliment", stabilityDelta: -3, outcome: "Le prélat note votre avarice dans ses registres." },
    ],
  },
  {
    id: "peasant-revolt",
    title: "Révolte paysanne",
    description: "Dans l'Orléanais, les paysans refusent la corvée et brûlent une grange seigneuriale.",
    weight: 2,
    options: [
      { label: "Envoyer les hommes d'armes (10 livres)", treasuryDelta: -10, unrestDelta: -8, outcome: "La révolte est écrasée dans le sang." },
      { label: "Négocier une remise d'impôts", treasuryDelta: -5, unrestDelta: -4, outcome: "Un compromis calme la province." },
    ],
  },
];

export function rollDecision(): Decision | null {
  const total = TEMPLATES.reduce((s, t) => s + t.weight, 0);
  let pick = Math.random() * total;
  for (const t of TEMPLATES) {
    pick -= t.weight;
    if (pick <= 0) return { id: t.id, title: t.title, description: t.description, options: t.options };
  }
  return null;
}

export function applyDecision(state: GameState, decision: Decision, optionIndex: number): { state: GameState; outcome: string } {
  const option = decision.options[optionIndex];
  if (!option) return { state, outcome: "Choix invalide." };

  const realm = { ...state.realm, provinces: state.realm.provinces.map((p) => ({ ...p })) };
  if (option.treasuryDelta) realm.treasury = Math.max(0, realm.treasury + option.treasuryDelta);
  if (option.stabilityDelta) realm.stability = clamp(realm.stability + option.stabilityDelta, 0, 100);
  if (option.unrestDelta) {
    const worst = realm.provinces.reduce((a, b) => (a.unrest > b.unrest ? a : b));
    worst.unrest = clamp(worst.unrest + option.unrestDelta, 0, 100);
  }

  const nextState: GameState = {
    ...state,
    realm,
    events: [
      {
        id: `evt-${state.eventSeq + 1}`,
        year: state.year,
        month: state.month,
        day: state.day,
        severity: "info" as const,
        text: `${decision.title} : ${option.outcome}`,
      },
      ...state.events,
    ].slice(0, 50),
    eventSeq: state.eventSeq + 1,
  };
  return { state: nextState, outcome: option.outcome };
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
