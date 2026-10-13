import { useState } from "react";
import { newGame, endTurn } from "./engine/setup";
import { MONTHS, monthlyIncome } from "./engine/simulation";
import type { GameState } from "./engine/types";

export default function App() {
  const [state, setState] = useState<GameState>(() => newGame());
  const ruler = state.characters[state.realm.rulerId];

  return (
    <div style={{ fontFamily: "Georgia, serif", padding: "2rem", color: "#2b2118" }}>
      <h1>Imperium Saeculi IX</h1>
      <p>
        Date : {MONTHS[state.month - 1]} {state.year} — Régnant :{" "}
        {ruler?.name} de la dynastie {ruler?.dynasty} (prestige {ruler?.prestige})
      </p>
      <h2>{state.realm.name}</h2>
      <ul>
        <li>Trésorerie : {state.realm.treasury} livres (+{monthlyIncome(state)}/mois)</li>
        <li>Stabilité : {state.realm.stability}</li>
        <li>Légitimité : {state.realm.legitimacy}</li>
      </ul>
      <h3>Provinces</h3>
      <ul>
        {state.realm.provinces.map((p) => (
          <li key={p.id}>
            {p.name} — {p.population} habitants, impôt {p.baseTax}, agitation {p.unrest}
          </li>
        ))}
      </ul>
      <button onClick={() => setState(endTurn(state))}>Passer le mois</button>
      <h3>Chronique</h3>
      <ul>
        {state.events.map((e) => (
          <li key={e.id}>
            <em>
              {MONTHS[e.month - 1]} {e.year} :
            </em>{" "}
            {e.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
