import type { Decision } from "../engine/events";

interface DecisionModalProps {
  decision: Decision;
  onChoose: (optionIndex: number) => void;
}

export default function DecisionModal({ decision, onChoose }: DecisionModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(43,33,24,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "#efe6d5",
          border: "2px solid #2b2118",
          padding: "1.5rem",
          maxWidth: "30rem",
          fontFamily: "Georgia, serif",
          color: "#2b2118",
        }}
      >
        <h2 style={{ margin: "0 0 0.75rem" }}>{decision.title}</h2>
        <p style={{ marginBottom: "1rem" }}>{decision.description}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {decision.options.map((option, index) => (
            <button
              key={option.label}
              onClick={() => onChoose(index)}
              style={{
                padding: "0.5rem",
                fontFamily: "Georgia, serif",
                cursor: "pointer",
                backgroundColor: "#e7dcc6",
                border: "1px solid #2b2118",
                textAlign: "left",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
