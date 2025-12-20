import { Timer } from "../timer/Timer.tsx";

export const App = () => (
  <div style={{ padding: "1em", position:"relative" }}>
    <Timer path="/" />
    <p
      style={{
        fontSize: "0.8em",
        opacity: 0.4,
        position: "absolute",
        bottom: "1em",
        right: "1em",
      }}
    >
      v0.6.0
    </p>
  </div>
);
