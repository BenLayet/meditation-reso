import { useSofter } from "@softer-components/redux-adapter";
import { NewMeditation } from "../new-meditation/NewMeditation.tsx";
import type { AppContract } from "./app.component.ts";
import { MeditationSession } from "../meditation-session/MeditationSession.tsx";
import { VERSION } from "../../util/version.ts";

export const App = ({ path }: { path: string }) => {
  const [v, , c] = useSofter<AppContract>(path);
  return (
    <div>
      {!v.isStarted && c.newMeditation && (
        <>
          <NewMeditation path={c.newMeditation} />
          <span className="nearly-invisible">{VERSION}</span>
        </>
      )}
      {v.isStarted && c.meditationSession && (
        <MeditationSession path={c.meditationSession} />
      )}
    </div>
  );
};
