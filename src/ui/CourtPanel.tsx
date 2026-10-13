import { applyCourtAction, type Court, type CourtAction } from "../engine/court";
import type { GameState } from "../engine/types";

const ACTIONS: { key: CourtAction; label: string; cost: number }[] = [
  { key: "grant_honor", label: "Honneurs (5)", cost: 5 },
  { key: "send_gift", label: "Cadeau (25)", cost: 25 },
  { key: "dismiss", label: "Écarter", cost: 0 },
];

interface CourtPanelProps {
  state: GameState;
  onAct: (characterId: string, action: CourtAction, cost: number, message: string, court: Court) => void;
}

export default function CourtPanel({ state, onAct }: CourtPanelProps) {
  const courtiers = state.court.courtiers;

  return (
    <div style={{ border: "1px solid #b3a184", padding: "0.75rem", backgroundColor: "#e7dcc6" }}>
      <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>La Cour</h2>
      {courtiers.length === 0 && <p style={{ fontStyle: "italic", margin: 0 }}>La cour est vide.</p>}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {courtiers.map((c) => {
          const character = state.characters[c.characterId];
          if (!character) return null;
          return (
            <li key={c.characterId} style={{ marginBottom: "0.75rem", borderBottom: "1px dotted #b3a184", paddingBottom: "0.5rem" }}>
              <strong>{character.name}</strong> ({character.dynasty}) — {c.office}
              <div style={{ fontSize: "0.85rem" }}>
                Opinion : {Math.round(c.opinion)} · Loyauté : {Math.round(c.loyalty)}
              </div>
              <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.25rem", flexWrap: "wrap" }}>
                {ACTIONS.map((a) => (
                  <button
                    key={a.key}
                    disabled={a.cost > state.realm.treasury}
                    onClick={() => {
                      const result = applyCourtAction(state, state.court, c.characterId, a.key);
                      onAct(c.characterId, a.key, result.cost, result.message, result.court);
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
