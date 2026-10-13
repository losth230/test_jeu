import { useState } from "react";
import { newGame } from "./engine/setup";
import { advanceDay, dailyIncome, setSpeed } from "./engine/simulation";
import { formatGameDate, type GameState, type GameSpeed } from "./engine/types";
import { useGameClock } from "./ui/useGameClock";

const SEVERITY_COLOR: Record<string, string> = {
  info: "#5a7256",
  warning: "#a8812f",
  crisis: "#8a3b2e",
};

export default function App() {
  const [state, setState] = useState<GameState>(() => newGame());
  useGameClock(state, setState);

  const ruler = state.characters[state.realm.rulerId];
  const income = dailyIncome(state);

  const speedButton = (label: string, value: GameSpeed) => (
    <button
      key={value}
      onClick={() => setState((prev) => setSpeed(prev, value))}
      style={{ fontWeight: state.speed === value ? "bold" : "normal" }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily: "Georgia, serif", padding: "1.5rem", color: "#2b2118", backgroundColor: "#efe6d5", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ margin: 0 }}>Imperium Saeculi IX</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <strong style={{ minWidth: "10rem", textAlign: "center" }}>{formatGameDate(state)}</strong>
          {speedButton("▮▮", 0)}
          {speedButton("×1", 1)}
          {speedButton("×2", 2)}
          {speedButton("×5", 3)}
          <button onClick={() => setState((prev) => advanceDay(prev))}>+1 j</button>
        </div>
      </header>

      <p>
        {ruler?.name} de la dynastie {ruler?.dynasty} règne sur {state.realm.name} — prestige {Math.floor(ruler?.prestige ?? 0)}
      </p>

      <section style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ minWidth: "18rem" }}>
          <h2>Royaume</h2>
          <ul>
            <li>Trésorerie : {state.realm.treasury.toFixed(1)} livres (+{income.toFixed(2)}/jour)</li>
            <li>Stabilité : {state.realm.stability}</li>
            <li>Légitimité : {state.realm.legitimacy}</li>
          </ul>
          <h3>Provinces</h3>
          <ul>
            {state.realm.provinces.map((p) => (
              <li key={p.id}>
                {p.name} — {p.population} hab., impôt {p.baseTax}, agitation {p.unrest}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: "20rem" }}>
          <h2>Chronique</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {state.events.map((e) => (
              <li key={e.id} style={{ marginBottom: "0.4rem", color: SEVERITY_COLOR[e.severity] }}>
                <em>
                  {String(e.day).padStart(2, "0")}/{String(e.month).padStart(2, "0")}/{e.year} —{" "}
                </em>
                {e.text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
