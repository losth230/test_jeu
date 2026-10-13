import { useState } from "react";
import { newGame } from "./engine/setup";
import { advanceDay, dailyIncome, setSpeed } from "./engine/simulation";
import { formatGameDate, type GameState, type GameSpeed } from "./engine/types";
import { useGameClock } from "./ui/useGameClock";
import MapView from "./map/MapView";
import type { MapProvinceData } from "./map/mapData";
import { realmName } from "./map/mapData";

const SEVERITY_COLOR: Record<string, string> = {
  info: "#5a7256",
  warning: "#a8812f",
  crisis: "#8a3b2e",
};

export default function App() {
  const [state, setState] = useState<GameState>(() => newGame());
  const [selected, setSelected] = useState<MapProvinceData | null>(null);
  useGameClock(state, setState);

  const ruler = state.characters[state.realm.rulerId];
  const income = dailyIncome(state);
  const ownedProvince = selected
    ? state.realm.provinces.find((p) => p.id === selected.id) ?? null
    : null;

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
    <div style={{ fontFamily: "Georgia, serif", padding: "1rem", color: "#2b2118", backgroundColor: "#efe6d5", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
        <h1 style={{ margin: 0 }}>Imperium Saeculi IX</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <strong style={{ minWidth: "10rem", textAlign: "center" }}>{formatGameDate(state)}</strong>
          {speedButton("▮▮", 0)}
          {speedButton("×1", 1)}
          {speedButton("×2", 2)}
          {speedButton("×5", 3)}
          <button onClick={() => setState((prev) => advanceDay(prev))}>+1 j</button>
        </div>
      </header>

      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ flex: 2, minWidth: "24rem" }}>
          <MapView
            selectedProvinceId={selected?.id ?? null}
            onSelect={(prov) => setSelected(prov)}
          />
        </div>
        <aside style={{ flex: 1, minWidth: "18rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ border: "1px solid #b3a184", padding: "0.75rem", backgroundColor: "#e7dcc6" }}>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>Royaume</h2>
            <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
              <li>Souverain : {ruler?.name} ({ruler?.dynasty})</li>
              <li>Trésorerie : {state.realm.treasury.toFixed(1)} livres (+{income.toFixed(2)}/jour)</li>
              <li>Stabilité : {state.realm.stability}</li>
              <li>Légitimité : {state.realm.legitimacy}</li>
            </ul>
          </div>
          {selected && (
            <div style={{ border: "1px solid #b3a184", padding: "0.75rem", backgroundColor: "#e7dcc6" }}>
              <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>{selected.name}</h2>
              <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                <li>Royaume : {realmName(selected.realmId)}</li>
                <li>Terrain : {selected.terrain}</li>
                {ownedProvince ? (
                  <>
                    <li>Population : {ownedProvince.population.toLocaleString("fr-FR")} hab.</li>
                    <li>Impôt : {ownedProvince.baseTax} — Agitation : {ownedProvince.unrest}</li>
                  </>
                ) : (
                  <li style={{ fontStyle: "italic" }}>Province étrangère</li>
                )}
              </ul>
            </div>
          )}
          <div style={{ border: "1px solid #b3a184", padding: "0.75rem", backgroundColor: "#e7dcc6", flex: 1 }}>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>Chronique</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: "16rem", overflowY: "auto" }}>
              {state.events.map((e) => (
                <li key={e.id} style={{ marginBottom: "0.35rem", color: SEVERITY_COLOR[e.severity], fontSize: "0.85rem" }}>
                  <em>
                    {String(e.day).padStart(2, "0")}/{String(e.month).padStart(2, "0")}/{e.year} —{" "}
                  </em>
                  {e.text}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
