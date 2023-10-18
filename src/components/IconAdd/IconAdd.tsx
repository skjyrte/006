import React from "react";

export default function IconAdd(props: any) {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="1000"
      viewBox="0 0 1000 1000"
    >
      <rect x="0" y="0" width="100%" height="100%" fill="rgba(255,255,255,0)" />
      <g
        transform="matrix(25.0276 25.2275 -25.2275 25.0276 500.0001 499.9994)"
        id="926890"
      >
        <path
          style={{
            strokeWidth: 1,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: color,
            fillRule: "evenodd",
            opacity: 1,
          }}
          vector-effect="non-scaling-stroke"
          transform=" translate(-8.839, -8.8395)"
          d="M 16.97 0 l 0.708 0.707 L 9.546 8.84 l 8.132 8.132 l -0.707 0.707 l -8.132 -8.132 l -8.132 8.132 L 0 16.97 l 8.132 -8.132 L 0 0.707 L 0.707 0 L 8.84 8.132 L 16.971 0 z"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
}
