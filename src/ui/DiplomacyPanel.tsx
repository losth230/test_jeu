import { declareWar, findRelation, offerPeace, type DiplomacyState } from "../engine/diplomacy";
import type { GameState } from "../engine/types";

const RELATION_LABEL: Record<string, string> = {
  war: "⚔ Guerre",
  truce: "Trêve",
  neutral: "Neutre",
  alliance: "Alliance",
};

interface DiplomacyPanelProps {
  state: GameState;
  onWar: (diplomacy: DiplomacyState, message: string) => void;
  onPeace: (diplomacy: DiplomacyState, accepted: boolean, message: string) => void;
}

export default function DiplomacyPanel({ state, onWar, onPeace }: DiplomacyPanelProps) {
  const { diplomacy } = state;

  return (
    <div style={{ border: "1px solid #b3a184", padding: "0.75rem", backgroundColor: "#e7dcc6" }}>
      <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>Diplomatie</h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: "18rem", overflowY: "auto" }}>
        {diplomacy.foreignRealms.map((fr) => {
          const rel = findRelation(diplomacy, state.realm.id, fr.id);
          if (!rel) return null;
          return (
            <li key={fr.id} style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              <strong>{fr.name}</strong> — {RELATION_LABEL[rel.relation]} (opinion {Math.round(rel.opinion)})
              {rel.relation !== "war" ? (
                <button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => {
                    const result = declareWar(state, fr.id);
                    onWar(result.diplomacy, result.message);
                  }}
                >
                  Déclarer la guerre
                </button>
              ) : (
                <button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => {
                    const result = offerPeace(state, fr.id);
                    onPeace(result.diplomacy, result.accepted, result.message);
                  }}
                >
                  Offrir la paix
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
