import { useId } from "react";

/** Lightweight hero artwork available before the optional WebGL chunk loads. */
export default function DynamoFallback() {
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <div className="dynamo-visual dynamo-static" aria-hidden="true">
      <svg className="dynamo-fallback" viewBox="0 0 560 560" fill="none">
        <defs>
          <linearGradient
            id={`${gradientId}-blue`}
            x1="96"
            y1="105"
            x2="425"
            y2="452"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#81CFFF" />
            <stop offset=".23" stopColor="#007AFF" />
            <stop offset=".54" stopColor="#034AAB" />
            <stop offset=".8" stopColor="#168DFF" />
            <stop offset="1" stopColor="#B8E8FF" />
          </linearGradient>
          <linearGradient
            id={`${gradientId}-silver`}
            x1="112"
            y1="193"
            x2="462"
            y2="370"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset=".25" stopColor="#56809F" />
            <stop offset=".61" stopColor="#E2F2FF" />
            <stop offset="1" stopColor="#29577F" />
          </linearGradient>
          <radialGradient id={`${gradientId}-core`} cx=".35" cy=".2" r=".85">
            <stop stopColor="#1D3953" />
            <stop offset=".5" stopColor="#081423" />
            <stop offset="1" stopColor="#01050D" />
          </radialGradient>
        </defs>
        <ellipse
          cx="280"
          cy="280"
          rx="225"
          ry="160"
          transform="rotate(-25 280 280)"
          stroke="#3C96E7"
          strokeOpacity=".25"
        />
        <ellipse
          cx="280"
          cy="280"
          rx="179"
          ry="163"
          transform="rotate(-30 280 280)"
          stroke={`url(#${gradientId}-blue)`}
          strokeWidth="35"
        />
        <circle
          cx="280"
          cy="280"
          r="70"
          fill={`url(#${gradientId}-core)`}
          stroke="#1A85DC"
          strokeOpacity=".65"
        />
        <ellipse
          cx="280"
          cy="280"
          rx="192"
          ry="78"
          transform="rotate(30 280 280)"
          stroke={`url(#${gradientId}-silver)`}
          strokeWidth="13"
        />
        <circle cx="108" cy="162" r="3" fill="#80CBFF" />
        <circle cx="435" cy="394" r="2" fill="#80CBFF" />
        <circle cx="403" cy="104" r="2" fill="#80CBFF" />
        <circle cx="83" cy="342" r="2" fill="#80CBFF" />
      </svg>
      <div className="dynamo-label dynamo-label-top">
        IDEIA → CÓDIGO → IMPACTO
      </div>
      <img className="dynamo-core-mark" src="/brand-mark.svg" alt="" />
      <div className="dynamo-label dynamo-label-bottom">
        <span />
        Em constante movimento
      </div>
    </div>
  );
}
