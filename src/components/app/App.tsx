import { useSofter } from "@softer-components/redux-adapter";
import { NewMeditation } from "../new-meditation/NewMeditation.tsx";
import { AppContract } from "./app.component.ts";
import { MeditationSession } from "../meditation-session/MeditationSession.tsx";
export const App = ({ path } = { path: "/" }) => {
  const [v, , c] = useSofter<AppContract>(path);
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {!v.isStarted && c.newMeditation && (
        <NewMeditation path={c.newMeditation} />
      )}
      {v.isStarted && c.meditationSession && (
        <MeditationSession path={c.meditationSession} />
      )}
    </div>
  );
};
