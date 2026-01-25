type ProgressIndicatorProps = {
  durationInSeconds: number;
};

export const ProgressIndicator = ({
  durationInSeconds,
}: ProgressIndicatorProps) => {
  const r = 85;
  const circumference = 2 * Math.PI * r; // ≈ 534.07
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: "none",
      }}
      className="fadein"
    >
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={r}
          strokeWidth="25"
          fill="#000"
          stroke="#282828"
        />
        {/* Animated arc using circular path */}
        <circle
          cx="100"
          cy="100"
          r={r}
          strokeWidth="25"
          fill="transparent"
          stroke="#fff"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          style={{
            animation: `fillArc ${durationInSeconds.toString()}s linear forwards`,
          }}
        />
      </svg>
      <style>
        {`
          @keyframes fillArc {
            from {
              stroke-dashoffset: ${circumference.toString()};
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
};
