import { useState } from "react";
import { MAP_PROVINCES, MAP_SEAS, realmColor, realmName } from "./mapData";
import type { MapProvinceData } from "./mapData";

const TERRAIN_SHADE: Record<string, number> = {
  plaine: 0.0,
  colline: 0.12,
  montagne: 0.25,
  forêt: 0.1,
  côte: 0.05,
};

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 255) - Math.round(255 * amount));
  const g = Math.max(0, ((n >> 8) & 255) - Math.round(255 * amount));
  const b = Math.max(0, (n & 255) - Math.round(255 * amount));
  return `rgb(${r},${g},${b})`;
}

interface MapViewProps {
  selectedProvinceId: string | null;
  onSelect: (province: MapProvinceData) => void;
}

export default function MapView({ selectedProvinceId, onSelect }: MapViewProps) {
  const [hovered, setHovered] = useState<MapProvinceData | null>(null);

  return (
    <svg viewBox="0 0 900 620" style={{ width: "100%", height: "auto", display: "block", border: "1px solid #b3a184", backgroundColor: "#dfe4e0" }}>
      {MAP_SEAS.map((sea) => (
        <g key={sea.id}>
          <polygon points={sea.points} fill="#aebfc4" opacity={0.55} />
        </g>
      ))}
      {MAP_SEAS.map((sea) => (
        <text
          key={`${sea.id}-label`}
          x={sea.labelX}
          y={sea.labelY}
          textAnchor="middle"
          fontSize={14}
          fill="#5a7078"
          fontStyle="italic"
          fontFamily="Georgia, serif"
        >
          {sea.name}
        </text>
      ))}

      {MAP_PROVINCES.map((prov) => {
        const isHovered = hovered?.id === prov.id;
        const isSelected = selectedProvinceId === prov.id;
        return (
          <g
            key={prov.id}
            onClick={() => onSelect(prov)}
            onMouseEnter={() => setHovered(prov)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            <polygon
              points={prov.points}
              fill={shade(realmColor(prov.realmId), TERRAIN_SHADE[prov.terrain])}
              stroke={isSelected || isHovered ? "#2b2118" : "#efe6d5"}
              strokeWidth={isSelected ? 2.5 : isHovered ? 1.8 : 0.8}
            />
            <text
              x={prov.labelX}
              y={prov.labelY}
              textAnchor="middle"
              fontSize={9}
              fill="#efe6d5"
              pointerEvents="none"
              fontFamily="Georgia, serif"
            >
              {prov.name}
            </text>
          </g>
        );
      })}
      {hovered && (
        <text
          x={hovered.labelX}
          y={hovered.labelY - 14}
          textAnchor="middle"
          fontSize={11}
          fill="#2b2118"
          pointerEvents="none"
          fontFamily="Georgia, serif"
          fontWeight="bold"
        >
          {realmName(hovered.realmId)}
        </text>
      )}
    </svg>
  );
}
